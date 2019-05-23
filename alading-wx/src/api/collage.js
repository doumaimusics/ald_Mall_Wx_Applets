/**
 * Created by xiejun on 2018/11/23.
 * 拼团接口
 */
import core from './core'

// const testPostApi = (prefix, contentType = 'application/json;charset=utf-8', baseURL = '') => {
//   return core.postForm({ contentType, baseURL, prefix })
// }

// const post = testPostApi
const post = core.postMicro

// goods 微服务
const postMicroGoods = post('/goods/outer/v1')
// order 微服务
const postMicroOrder = post('/order/outer/v1')

// 接口
let api = {}

// 主页列表
api.getIndex = postMicroGoods('/pintuan/index')
// 商品详情
api.getGoodsDetail = postMicroGoods('/pintuan/goodsDetail')
// api.getGoodsDetail = postMicroGoodsTest('/pintuan/goodsDetail')
// 拼团分享页数据
api.sharePage = postMicroGoods('/pintuan/sharePage')

// 拼团实时数据
// api.getPintuanData = postMicroOrder('/fackData/pintuan')
// 订单详情
api.orderDetail = postMicroOrder('/pintuan/orderDetail')
// 订单列表
api.myOrderList = postMicroOrder('/pintuan/myOrderList')
// 确认订单---去支付
api.attendGroup = postMicroOrder('/pintuan/attendGroup')
// api.attendGroup = postMicroGoodsTest('/pintuan/attendGroup')

// 删除取消订单
api.deleteOrder = postMicroOrder('/deleteOrder')
api.cancelOrder = postMicroOrder('/cancelOrder')

// 差一个拼团成功的拼团列表
api.getOrderListWithOneLess = postMicroOrder('/pintuan/getOrderListWithOneLess')

export default api
