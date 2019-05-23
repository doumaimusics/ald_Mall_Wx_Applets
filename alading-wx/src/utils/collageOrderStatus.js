import { status } from './orderStatus'

const addShareInfoDesc = info => {
  if (info.isAttend) {
    if (info.isFail) {
      info.title = '拼团失败，款项会原路退还'
      info.menu = ['重新开团', '前往拼团首页']
      info.menuAction = ['buy', 'home']
    } else if (info.isDeailing) {
      info.title = '订单正在支付中，请稍后…'
      info.menu = ['查看订单', '更多拼团']
      info.menuAction = ['detail', 'home']
    } else if (info.isShare) {
      info.title = ['仅剩', '个名额']
      info.menu = ['邀请好友拼团']
      info.menuAction = ['share']
      info.hasCountdown = true
      info.isAutoShowShareToast = true
    } else if (info.isSuccsss) {
      info.hasSign = true // 有图标
      info.title = '拼团成功'
      info.menu = ['查看订单', '前往拼团首页']
      info.menuAction = ['detail', 'home']
    }
  } else {
    if (info.isFail) {
      info.title = '该团已结束'
      info.menu = ['我也要开团', '前往拼团首页']
      info.menuAction = ['buy', 'home']
    } else if (info.isDeailing) {
      info.title = '订单正在支付中，请稍后…'
      info.menu = ['查看订单', '更多拼团']
      info.menuAction = ['detail', 'home']
    } else if (info.isShare) {
      info.title = ['仅剩', '个名额']
      info.menu = ['参与拼团']
      info.menuAction = ['toBuy']
      info.hasCountdown = true
    } else if (info.isSuccsss) {
      info.title = '来晚了！该团已满'
      info.menu = ['我也要开团', '前往拼团首页']
      info.menuAction = ['buy', 'home']
    }
  }
}
/**
 * 取得
 * @param {Object} param0 { pinOrderStatus, isAttend }
 * pinOrderStatus 拼团状态，失败0 处理中1、2 成功3 关闭4
 * isAttend 是否参与 参与true
 */
const shareInfo = ({ pinOrderStatus, isAttend }) => {
  let result = { isAttend }
  switch (pinOrderStatus) {
    case 0:
    case 4:
      // 拼团失败/失效
      result.isFail = true
      break
    case 1:
      // 拼团处理中，倒计时
      result.isDeailing = true
      break
    case 2:
      // 拼团中，倒计时
      result.isShare = true
      break
    case 3:
      // 拼团成功
      result.isSuccsss = true
      break
  }
  // 添加对应的描述
  addShareInfoDesc(result)
  return result
}

/**
 * 返回状态对应小程序的显示情况
 * @param {Object}
 * {status, pinOrderStatus, payStatus}
 * status 状态
 * pinOrderStatus 拼团状态，失败0 处理中1、2 成功3 关闭4
 */
const info = data => {
  let result = {}
  let s = data.status
  let ps = data.pinOrderStatus
  let payStatus = data.payStatus
  if (s === status.CLOSED && payStatus === 'N') {
    // 订单已取消
    result.isCancel = true
    result.desc = 'closed'
    result.statusMsg = '订单已取消'
    result.statusRemark = '超时未支付'
  } else if (ps === 0) {
    if (s === status.DEAL_REFUNDING) {
      // 退款中
      result.isRefunding = true
      result.desc = 'finished'
      result.statusMsg = '退款中'
      result.nodeStatusMsg = '拼团失败'
      result.statusRemark = '订单已通过审核，正在退款中'
      result.noDetailMenu = true
    } else if (payStatus === 'N') {
      // 订单已取消
      result.isCancel = true
      result.desc = 'closed'
      result.statusMsg = '订单已取消'
      result.statusRemark = '超时未支付'
    } else {
      // 拼团失败
      result.isFail = true
      result.desc = 'closed'
      result.statusMsg = '订单关闭'
      result.nodeStatusMsg = '拼团失败'
      result.statusRemark = '支付款项将原路返回，请注意查收'
    }
  } else if (ps === 3) {
    // 拼团成功
    if (payStatus === 'N') {
      result.isCancel = true
      result.desc = 'closed'
      result.statusMsg = '订单已取消'
      result.statusRemark = '超时未支付'
    } else if (s === status.PAID) {
      // 待发货
      result.isPaid = true
      result.desc = 'paid'
      result.statusMsg = '待发货'
      result.nodeStatusMsg = '拼团成功'
      result.statusRemark = '您的宝贝已经迫不及待要和您见面了'
    } else if (s === status.DELIVERED) {
      // 待收货
      result.isDelivered = true
      result.desc = 'delivered'
      result.statusMsg = '待收货'
      result.nodeStatusMsg = '拼团成功'
      result.statusRemark = '请确认已签收商品/服务'
    } else if (s === status.FINISHED || s === status.REBATED) {
      // 订单完成
      result.isFinished = true
      result.desc = 'finished'
      result.statusMsg = '订单完成'
      result.nodeStatusMsg = '拼团成功'
      result.statusRemark = '感谢您对爱上街的支持'
    } else if (s === status.WAIT_REFUND) {
      // 售后处理中
      result.isRefund = true
      result.desc = 'finished'
      result.statusMsg = '售后处理中'
      result.nodeStatusMsg = '拼团成功'
      result.statusRemark = '正在处理你的售后申请，请至APP查看进度'
    } else if (s === status.DEAL_REFUNDING) {
      // 退款中
      result.isRefunding = true
      result.desc = 'finished'
      result.statusMsg = '退款中'
      result.nodeStatusMsg = '拼团成功'
      result.statusRemark = '订单已通过审核，正在退款中'
      result.noDetailMenu = true
    } else {
      // 订单关闭
      result.isOrderClosed = true
      result.desc = 'finished'
      result.statusMsg = '订单关闭'
      result.nodeStatusMsg = '拼团成功'
      result.statusRemark = '支付款项将原路返回，请注意查收'
    }
  } else if (ps === 4) {
    // 拼团关闭
    result.isClosed = true
    result.desc = 'closed'
    result.statusMsg = '拼团取消'
    result.statusRemark = '支付款项将原路返回，请注意查收'
  } else {
    if (s === status.NEW || s === status.PAYFAIL) {
      // 待支付
      result.isNew = true
      result.desc = 'new'
      result.statusMsg = '待支付'
    } else if (s === status.DEALING) {
      // 处理中
      result.isDealing = true
      result.desc = 'dealing'
      result.statusMsg = '处理中'
      result.noMenu = true
    } else if (s === status.PAID && ps === 2) {
      // 待分享
      result.isToShare = true
      result.desc = 'to-share'
      result.statusMsg = '拼团还未完成'
    }
  }
  return result
}

export default {
  shareInfo,
  info
}
