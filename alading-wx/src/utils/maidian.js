import api from '@/api/common'
import basis from 'utils/basis'
import curry from 'lodash/fp/curry'
import systemInfo from './systemInfo'
import storage from 'utils/storage'
import utils from 'utils/index'

// 埋点
const maidian = curry((path, otherData, data, type) => {
  let spread = 'wechart'
  let num = basis.getTimer()
  let params = {
    maidianInfo: path + '?' + type + '=' + data,
    maidianInfo1: otherData,
    maidianInfo2: spread,
    maidianInfo3: num
  }
  api.postMaidianInfo(params)
})

const index = maidian('page/index', '', '')
const index2 = maidian('page/index', '')
const classify = maidian('page/classify', '', '')
const my = maidian('page/my', '', '')
const shop = maidian('page/shop', '', '')

const spm = {
  button_home: 'miniprogram_button_home',
  button_classify: 'miniprogram_button_classify',
  button_shopping_cart: 'miniprogram_button_shopping_cart',
  button_my: 'miniprogram_button_my',
  button_activity: 'miniprogram_button_activity',
  home_search: 'miniprogram_home_search',
  pindao_id: 'miniprogram_pindao_id',
  banner_n: 'miniprogram_banner_n',
  icon_n: 'miniprogram_icon_n',
  position: 'miniprogram_position',
  home_product: 'miniprogram_home_product',
  pindao_id_product: 'miniprogram_pindao_id_product',
  classify_search: 'miniprogram_classify_search',
  classify_1: 'miniprogram_classify_1',
  classify_3: 'miniprogram_classify_3',
  classify_product: 'miniprogram_classify_product',
  my_login: 'miniprogram_my_login',
  my_cash: 'miniprogram_my_cash',
  my_coupon: 'miniprogram_my_coupon',
  my_coin: 'miniprogram_my_coin',
  my_allorder: 'miniprogram_my_allorder',
  my_unpay: 'miniprogram_my_unpay',
  my_undeliver: 'miniprogram_my_undeliver',
  my_unget: 'miniprogram_my_unget',
  my_service: 'miniprogram_my_service',
  my_address: 'miniprogram_my_address',
  my_changgelogin: 'miniprogram_my_changgelogin',
  my_product: 'miniprogram_my_product',
  shop_detail: 'miniprogram_shop_detail',
  detail_commend: 'miniprogram_detail_commend',
  detail_similar: 'miniprogram_detail_similar',
  shop_buy: 'miniprogram_shop_buy',
  shop_pay: 'miniprogram_shop_pay',
  shop_payment: 'miniprogram_shop_payment'
}

// 新埋点
/**
 * *** userId必填 ***
 * 新埋点 详见 http://doc.51fb.com/pages/viewpage.action?pageId=28442914
 * @param {*相关系统信息} systemInfo
 * @param {*操作类型（view,click）} typeKind
 * @param {*埋点数据对应的版本信息} dataVersion
 * @param {*方法名称 *** 必填 *** } reqMethod
 * @param {*名称（如商品名）} name
 * @param {*关联ID（如商品ID）} refId
 */

const newMaidian = curry(async (typeKind, dataVersion, reqMethod, name = '', refId = '') => {
  let systemInfo = getSystemInfo()
  let reqTime = utils.formatDate(new Date().getTime(), 'YYYY-MM-DD hh:ss:mm')
  let userId = storage.props.tokenData.rid
  let reqClient = 'miniprogram'
  let channelName = 'miniprogram'
  let params = {
    ...systemInfo,
    reqTime,
    reqClient,
    channelName,
    userId,
    typeKind,
    reqMethod,
    name: name,
    refId: refId
  }
  api.postNewMaidianInfo({
    dataVersion,
    dataInfo: JSON.stringify(params)
  })
})

const getSystemInfo = () => {
  let netType = systemInfo.getNetworkType._v ? systemInfo.getNetworkType._v : systemInfo.getNetworkType
  let phoneType = systemInfo.getPhoneType
  return {
    ...phoneType,
    netType
  }
}

const view = newMaidian('view', '1')
const click = newMaidian('click', '1')

export default {
  index,
  index2,
  classify,
  my,
  shop,
  spm,
  view,
  click
}
