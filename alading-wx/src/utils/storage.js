/**
 * 缓存
 */
import wx from 'wx'

const getProp = wx.getStorageSync
const setProp = wx.setStorageSync
const clear = wx.clearStorageSync
const removeProp = wx.removeStorageSync

// 关键字
const keys = {
  tokenData: 'ala-token-data',
  loginMobile: 'ala-login-mobile',
  launchStatus: 'ala-launch-status',
  launchOptions: 'ala-launch-options',
  dotHide: 'ala-dot-hide',
  baseURL: 'ala-base-url',
  guideStatus: 'guideStatus'
}

const props = {}
Object.keys(keys).forEach(value => {
  Object.defineProperty(props, value, {
    get: () => getProp(keys[value]),
    set: d => setProp(keys[value], d)
  })
})

export default {
  getProp,
  setProp,
  clear,
  removeProp,
  keys,
  props
}
