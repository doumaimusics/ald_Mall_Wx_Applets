import curry from 'lodash/fp/curry'
import compose from 'lodash/fp/compose'
import _padStart from 'lodash/padStart'

const oneSecond = 1000
const oneMinute = 60
const oneHour = 60 * oneMinute
const oneDay = 24 * oneHour

// 在头部补全
const padStart = curry((fill, len, str) => {
  return _padStart(str, len, fill)
})
const pad0Start = padStart('0', 2)

// 将ms转换为s
const toSecond = ms => ms / oneSecond

// 将s转换为{ d, h, m, s }
const parse = second => {
  let d = Math.floor(second / oneDay)
  let last = second % oneDay
  let h = Math.floor(last / oneHour)
  last = last % oneHour
  let m = Math.floor(last / oneMinute)
  let s = Math.floor(last % oneMinute)
  return { d, h, m, s }
}

/**
 * 简单显示时间
 */
const parseSimple = date => {
  let { d, h, m, s } = date
  if (d >= 1) {
    // 大于一天
    let pd = d + '天'
    let ph = pad0Start(h) + '小时'
    return pd + ph
  } else if (h >= 1) {
    // 大于1小时
    let ph = h + '小时'
    let pm = pad0Start(m) + '分'
    return ph + pm
  } else if (m >= 1) {
    // 大于1分钟
    let pm = m + '分'
    let ps = pad0Start(s) + '秒'
    return pm + ps
  } else {
    // 小于1分钟
    return pad0Start(s) + '秒'
  }
}

const parsePad = date => {
  let { d, h: hour, m: minute, s: second } = date
  let [h, m, s] = [hour, minute, second].map(value => pad0Start(value))
  return { d, h, m, s }
}

const showSimple = compose(parseSimple, parse)
const showSimpleMS = compose(showSimple, parse, toSecond)
const showPad = compose(parsePad, parse)
export default { parse, showSimple, showSimpleMS, showPad }
