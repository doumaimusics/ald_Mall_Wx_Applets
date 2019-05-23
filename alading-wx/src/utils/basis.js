import curry from 'lodash/fp/curry'
import _padStart from 'lodash/padStart'
import compose from 'lodash/fp/compose'
import navigate from './navigate'
import util from './index'

const map = curry((f, ary) => ary.map(f))

const join = curry((sep, ary) => ary.join(sep))

const toProp = curry((obj, key) => key + '=' + obj[key])

// 检测对象是否为空
const isObjNotNull = obj => Object.keys(obj).length

const setObjProp = (obj, data) => {
  let keys = Object.keys(data)
  keys.forEach(key => {
    if (data[key] !== undefined) {
      obj[key] = data[key]
    }
  })
}

// url编码
const urlencoded = obj => {
  let joinat = join('&')
  let code = compose(
    joinat,
    map(toProp(obj)),
    Object.keys
  )
  return code(obj)
}

// url解码
const urldecoded = url => {
  let query = url.split('?')[1]
  let spiltQuery = query.split('&')
  let queryData = {}
  spiltQuery.forEach(value => {
    let splitValue = value.split('=')
    queryData[splitValue[0]] = splitValue[1]
  })
  return queryData
}

// 跳转进登录页
const toLogin = () => navigate.push({ url: '/pages/common/login' })

const toGoodsDetail = () => navigate.push({ url: '/pages/common/goodsDetail' })

// 跳转确认订单页
const toOrderConfirm = () => navigate.push({ url: '/pages/common/orderConfirm?source=goodsDetail' })

const prefix = curry((x, str) => {
  return x + str
})

const moneyPrefix = prefix('¥')

// 在头部补全
const padStart = curry((fill, len, str) => {
  return _padStart(str, len, fill)
})

const pad0Start = padStart('0', 2)

const getClickCurrent = event => {
  let target = event.currentTarget
  return target.dataset.current
}

const formatTimestampToDays = timestampx => {
  let todaystamp = new Date()
  let year = todaystamp.getFullYear()
  let month = todaystamp.getMonth() + 1
  let day = todaystamp.getDate()
  let today = new Date(`${year}/${month}/${day} 00:00:00`).getTime()
  let ex = timestampx - today
  let oneday = 24 * 60 * 60 * 1000

  if (ex > 4 * oneday) {
    return {
      will: false,
      day: util.formatDate(timestampx)
    }
  } else if (ex > 3 * oneday) {
    return {
      will: true,
      day: '还有3天'
    }
  } else if (ex > 2 * oneday) {
    return {
      will: true,
      day: '还有2天'
    }
  } else if (ex > 1 * oneday) {
    return {
      will: true,
      day: '明天'
    }
  } else if (ex > 0) {
    return {
      will: true,
      day: '今天'
    }
  }
}

const getInputValue = event => {
  let target = event.target
  return target.value
}

const trimAll = str => str.replace(/ /g, '')

const isBlank = str => trimAll(str) === ''

const isPhone = str => /^1\d{10}$/.test(trimAll(str))

const prettyPhone = str => str.substr(0, 11)

const phoneEncrypt = str => str.substr(0, 3) + '****' + str.substr(7)

const phone344Code = str => {
  str = trimAll(str)
  let len = str.length
  if (len > 3) {
    let list = []
    list.push(str.substr(0, 3))
    if (len > 7) {
      list.push(str.substr(3, 4))
      list.push(str.substr(7))
    } else {
      list.push(str.substr(3))
    }
    str = list.join(' ')
  }
  return str
}

const throttle = curry((duration, callback) => {
  if (callback.throttleTimer) return
  callback.throttleTimer = setTimeout(() => {
    delete callback.throttleTimer
  }, duration)
  callback()
})

const clickThrottle = throttle(200)

// 延迟执行,非一般的延迟
const delay = curry((duration, callback, params = null) => {
  if (callback.delayTimer) clearTimeout(callback.delayTimer)
  callback.delayTimer = setTimeout(() => {
    delete callback.delayTimer
    callback(params)
  }, duration)
})

// 取得从 1970/01/01 至今的毫秒数
const getTimer = () => new Date().getTime()

// 判断是否超时 unit时间单位 timeout有效时间 historyTime需要判断的时长，以ms为单位
const checkTimeout = curry((unit, timeout, historyTime) => {
  if (!historyTime) return true
  let limit = timeout
  // 天d 时h 分m 秒s
  if (unit === 'd') {
    limit *= 1000 * 60 * 60 * 24
  } else if (unit === 'h') {
    limit *= 1000 * 60 * 60
  } else if (unit === 'm') {
    limit *= 1000 * 60
  } else if (unit === 's') {
    limit *= 1000
  }
  let ct = getTimer()
  return ct - historyTime >= limit
})

// 倒计时timers
let countDownTimers = {}
/**
 * 倒计时处理
 * @param {Number} duration 时间,以s为单位且为整数
 * @param {Object} param {timer, complete}
 */
const countdown = curry((duration, { timer, complete }) => {
  function recursion() {
    let last = duration - count
    if (last < 0) last = 0
    if (timer) timer({ duration, count, last })
    countDownTimers[key] = setTimeout(() => {
      count++
      if (count >= duration) {
        delete countDownTimers[key]
        let last = duration - count
        if (last < 0) last = 0
        if (timer) timer({ duration, count, last })
        if (complete) complete()
      } else {
        recursion()
      }
    }, 1000)
  }

  let count = 0
  let random = (Math.random() * 100000 + '').split('.')[0]
  let key = getTimer() + '_' + random
  recursion()

  return key
})

const clearCountdown = key => {
  if (key) {
    let timerId = countDownTimers[key]
    if (timerId) {
      delete countDownTimers[key]
      clearTimeout(timerId)
    }
  }
}

const clearCountdownAll = () => {
  let keys = Object.keys(countDownTimers)
  keys.forEach(value => {
    clearTimeout(countDownTimers[value])
  })
  countDownTimers = {}
}

const oneMinute = countdown(60)

const parseCount = count => {
  let sCount = count + ''
  let len = sCount.length
  if (len > 4) {
    let w = sCount.substr(0, len - 4)
    let q = sCount.charAt(len - 4)
    return `${w}.${q}万`
  }
  return sCount
}

// 倒计时 格式转换
const formatCountTime = count => {
  let oneday = 24 * 60 * 60
  let d = Math.floor(count / (60 * 60 * 24)) + '天'
  let modulo = count % (60 * 60 * 24)
  let h = Math.floor(modulo / (60 * 60))
  modulo = modulo % (60 * 60)
  let m = Math.floor(modulo / 60)
  let s = modulo % 60
  h = pad0Start(h + '')
  m = pad0Start(m + '')
  s = pad0Start(s + '')
  if (count > oneday) {
    return { d, h, m, s }
  } else {
    return { h, m, s }
  }
}

const fixMoney = amount => {
  let s = (amount + '').split('.')
  if (s.length > 1) {
    return amount
  } else {
    return amount + '.00'
  }
}

// 保留指定位数的
const toFix = (amount, len = 2, isGreedy = false) => {
  let str = amount + ''
  let index = str.indexOf('.')
  if (index < 0) {
    if (isGreedy) {
      str += '.'
      while (len) {
        str += '0'
        len--
      }
    }
  } else {
    str = amount.toFixed(len)
  }
  return str
}

export default {
  // 返回对象是否为空
  isObjNotNull,
  // 设置对象的数据
  setObjProp,
  // 将对象转化为url编程
  urlencoded,
  // url数据解码
  urldecoded,
  // 跳转到登录页
  toLogin,
  // 跳转到商品详情页
  toGoodsDetail,
  // 跳转到确认订单页
  toOrderConfirm,

  // 添加前缀
  prefix,
  // 添加人民币前缀
  moneyPrefix,

  // 在头部补全
  padStart,
  // 在头部补全0，长度为2
  pad0Start,
  // 时间戳 转 年/月/日 且 剩余3天时显示 剩余天数
  formatTimestampToDays,

  // 获得click的current
  getClickCurrent,
  // 获取文本input的值
  getInputValue,

  // 清空所有空格
  trimAll,
  // 判断字符串是否为空
  isBlank,
  // 判断是否为电话号码
  isPhone,
  // 截取11位的手机号
  prettyPhone,
  // 返回xxx****xxxx形式的号码
  phoneEncrypt,
  // 以344方式返回号码
  phone344Code,

  // 节流
  throttle,
  // 单击节流, 单击响应之后200ms内无响应
  clickThrottle,

  // 真正的节流处理
  delay,

  // 取得time
  getTimer,
  // 检测是否超时
  checkTimeout,
  checkTimeoutD: checkTimeout('d'),
  checkTimeoutH: checkTimeout('h'),
  checkTimeoutM: checkTimeout('m'),

  // 倒计时处理
  countdown,
  // 清空指定key值的倒计时
  clearCountdown,
  // 清空所有的倒计时
  clearCountdownAll,
  // 一分钟倒计时
  oneMinute,
  // 若数字大于1万，将数字转换为x.x万的格式
  parseCount,

  // 倒计时 格式转换
  formatCountTime,

  // 补足钱的后两位数值
  fixMoney,

  // 保留指定位数的
  toFix
}
