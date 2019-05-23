/**
 * Created by xiejun on 2018/12/05.
 * 通用的方法
 */
import basis from 'utils/basis'

const calcTime = duration => {
  let ms = duration % 1000
  ms = Math.floor(ms / 10)
  duration = Math.floor(duration / 1000)

  let h = Math.floor(duration / 3600)
  let m = Math.floor((duration % 3600) / 60)
  let s = duration % 60

  let list = [h, m, s, ms].map(value => basis.pad0Start(value + ''))
  return list
}

// 将时间格式化为hh:mm:ss
const timeFormat = duration => {
  let r = calcTime(duration * 1000).slice(0, 3)
  return r.join(':')
}

// 计算过期时间，支付倒计时
const calcExpirePayDuration = ({ gmtPayEnd, gmtCurrent }) => {
  let duration = Math.floor((gmtPayEnd - gmtCurrent) / 1000)
  if (duration < 0) duration = 60
  return duration
}

// 计算过期时间
const calcExpireDuration = ({ expireHour, gmtStart, gmtCurrent }, unit = 's') => {
  let gmtExpire = expireHour * 3600 * 1000
  if (!gmtStart) gmtStart = gmtCurrent
  gmtStart = gmtStart + gmtExpire
  let duration = gmtStart - gmtCurrent
  if (duration < 0) duration = 10000
  if (unit === 's') {
    duration = Math.floor(duration / 1000)
  }
  return duration
}

// 计算拼团还差多少人
const calcNeedCollageCount = ({ completedOrderCount, times }) => {
  if (completedOrderCount !== undefined) {
    return times - completedOrderCount
  } else {
    return times - 1
  }
}

// 转换为商品显示项需要的数据
const transGoodsData = orderData => {
  let goodsIcon = orderData.goodsIcon
  let goodsName = orderData.goodsName
  let saleAmount = orderData.actualAmount
  let goodsPriceName = orderData.propertyValueNames
  let count = orderData.count
  return { goodsIcon, goodsName, saleAmount, goodsPriceName, count }
}

const transUserInfoList = ({ times, orderUserInfoList, isSystem, avatars }) => {
  let list = [].concat(orderUserInfoList)
  if (isSystem === 1) {
    // 系统拼单成功
    if (avatars) {
      let splitAvatars = avatars.split(';')
      splitAvatars.forEach(headimgUrl => headimgUrl && list.push({ headimgUrl }))
    }
  } else {
    while (list.length < times) {
      list.push(null)
    }
  }

  return list
}

// 取得去购买失败信息
const getToBuyFailInfo = (info, data) => {
  let title = ''
  let btnTitle = ''
  let duration = ''
  if (info.isNew) {
    // 待支付
    title = '您已有一笔待支付订单'
    btnTitle = '查看拼团详情'
    duration = calcExpirePayDuration(data)
  } else if (info.isDealing) {
    // 处理中
    title = '您已有一笔处理中订单'
    btnTitle = '查看拼团详情'
    duration = calcExpireDuration(data)
  } else if (info.isToShare) {
    // 待分享
    title = '您已有一笔待分享订单'
    btnTitle = '邀请好友'
    duration = calcExpireDuration(data)
  } else {
    return null
  }
  return { title, btnTitle, duration }
}

// 是否为秒杀团
const isSecKill = data => {
  return data.marketingActivityId && data.marketingActivityId > 0
}
// 是否为狂欢
const isCarnival = data => {
  return isSecKill(data) && data.airUrl
}

export default {
  calcTime,
  timeFormat,
  calcExpirePayDuration,
  calcExpireDuration,
  calcNeedCollageCount,
  transGoodsData,
  transUserInfoList,
  getToBuyFailInfo,
  isSecKill,
  isCarnival
}
