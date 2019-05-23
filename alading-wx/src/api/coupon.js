/**
 * Created by xiejun on 2019/03/28.
 * 优惠券相关
 */
import core from './core'

// let baseURL = 'http://172.20.24.60:4444'
const post = core.postMicroService('/h5Shopping/wechat')
// 接口
let api = {}

// 收银台下单接口
api.getAgencyCouponList = post('/agencyBuy/getAgencyCouponList')
// 取得商品的可用优惠券列表
api.getDetailCouponList = post('/coupon/getDetailCouponList')
export default api
