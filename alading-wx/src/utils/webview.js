import navigate from './navigate'
import conf from '@/conf'
import { Base64 } from 'js-base64'
import _ from 'lodash'

// 打开webview
const open = (to, isNeedLogin = false, isNeedFresh = false) => {
  let url = '/pages/webview/index'
  // if (to) url += '?url=' + Base64.encode(to)
  if (isNeedFresh && to) url += '?isNeedFresh=1&url=' + Base64.encode(to)
  else if (to) url += '?url=' + Base64.encode(to)
  navigate.push({ url, isNeedLogin })
}
// 打开搜索h5页
const openSearch = key => {
  let url = `${conf.H5_SEARCH}?searchGoodName=${key}&spread=wechat`
  // 打开web-view
  open(url)
}

// 打开添加银行卡h5页
const openAddBankCard = () => {
  let url = `${conf.H5_ADD_BANK_CARD}?spread=wechat`
  // 打开web-view
  open(url)
}

// 打开购物车页
const openShoppingCart = () => {
  let url = `${conf.H5_SHOPPING_CART}?spread=wechat`
  // 打开web-view
  open(url, true)
}

// 首页 运营位 判断跳转小程序内页面 还是webview
const openOpeNav = url => {
  if (_.startsWith(url, 'http')) {
    open(url)
  } else {
    navigate.push({ url })
  }
}

export default {
  // 打开Web-view
  open,
  // 打开搜索h5页
  openSearch,
  // 打开添加银行卡h5页
  openAddBankCard,
  // 打开购物车
  openShoppingCart,
  // 首页 运营位 判断跳转小程序内页面 还是webview
  openOpeNav
}
