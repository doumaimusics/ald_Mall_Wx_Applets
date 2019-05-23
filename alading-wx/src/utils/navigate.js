/**
 * Created by xiejun on 2018/10/12.
 * 跳转
 */

import curry from 'lodash/fp/curry'

import basis from 'utils/basis'
import store from '@/store'
import wx from 'wx'

const nav = curry((f, data) => {
  // 是否需要判断用户登录了
  let isNeedLogin = data.isNeedLogin
  if (isNeedLogin) {
    if (store.state.isLogin) {
      // 登录了，直接跳转
      f(data)
    } else {
      // 未登录
      basis.toLogin()
    }
  } else {
    f(data)
  }
})

// 微信的navigateTo跳转
const push = nav(wx.navigateTo)
// 微信的redirectTo跳转 关闭当前页面，跳转到应用内的某个页面
const replace = nav(wx.redirectTo)
// 微信的navigateBack返回
const back = nav(wx.navigateBack)
// 微信的reLaunch跳转 关闭所有页面，打开到应用内的某个页面
const reLaunch = nav(wx.reLaunch)

export default {
  push,
  replace,
  back,
  reLaunch
}
