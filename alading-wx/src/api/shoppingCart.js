/**
 * Created by xiejun on 2019/03/25.
 * shoppoing cart
 */
import core from './core'

// let baseURL = 'http://172.20.24.60:4444'

const cartPost = core.postMicroService('/h5Shopping/wechat/shoppingCart')
const cashierPost = core.postMicroService('/h5Shopping/wechat/cashier')
const common = core.postMicroService('/h5Shopping/wechat')
// 接口
let api = {}
// 用户购物车商品数量
api.userGoodsNumber = cartPost('/userGoodsNumber')
// 添加到商品购物车
api.addGoods = cartPost('/addGoods')
// 购物车商品列表
api.goodsList = cartPost('/goodsList')
// 获取商品的运费V2
api.getExpressFeeV2 = cartPost('/getExpressFeeV2')

// 下单前的检测
api.checkCountBeforeBuy = cashierPost('/checkCountBeforeBuy')
// 收银台下单接口
api.pre = cashierPost('/pre')
// 获取商品规格
api.getGoodsSpec = common('/goods/getGoodsSpec')

export default api
