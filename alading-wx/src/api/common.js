import { defaultPost, maidianPost, apiPost, postMicro } from './core'

// order 微服务
// const postMicroOrder = postMicro('/order/outer')

// const postApiTest = postApi('', 'http://172.20.17.165:80')

// 微服务 json方式传参
const postJson = postMicro()

// 接口
let api = {}

// 判断支付结果页
api.judgePayResultPage = postJson('/order/outer/v1/pintuan/judgePayResultPage')

// 取得底部tabbar
api.getTabbarInfo = postJson('/activity/outer/v1/wechat/getTabbarInfo')

// 埋点 老接口
api.postMaidianInfo = maidianPost('/proxy/fanbei-web/postMaidianInfo')
// 埋点 新接口
api.postNewMaidianInfo = maidianPost('/proxy/fanbei/web-maidian')

/**
 * 登录 相关接口
 */
// 获取短信验证码
api.getSms = postJson('/activity/outer/v1/sms/verifySms')
// 取得token
api.getToken = postJson('/third/outer/v1/wechat/getOpenId')
// 取得老的token
api.getOldToken = postJson('/third/outer/v1/wechat/getOldToken')
// 通过api取得token
api.getTokenApi = apiPost('/vdian/wechat/getOpenId')
// 绑定手机 ?
api.boundMobile = defaultPost('/vdian/wechat/boundMobile')
// 小程序快捷登录
api.quickLogin = postJson('/user/outer/v1/login/wechatQuickLogin')

/**
 * 首页 相关接口
 */
// 获取首页数据
api.getHomePageInfo = postJson('/activity/outer/v1/wechat/getHomePageInfo')
// 更多商品，包括首页、我的
api.getBottomMoreGoods = postJson('/goods/common/v1/goods/getBottomMoreGoods')
// 频道页更多商品
api.getChannelMoreGoods = postJson('/goods/common/v1/goods/getChannelMoreGoods')

/**
 * 搜索页 相关接口
 */
// 搜索页数据
api.getSearchHome = postJson('/goods/outer/v1/goods/getSearchHome')
// 删除搜索历史记录
api.deletHistorySearch = postJson('/user/outer/v1/deletHistorySearch')

/**
 * 分类 相关接口
 */
// 分类
api.getAllGoodsCategory = postJson('/goods/common/v1/goods/getAllGoodsCategory')
// 三级分类中的商品
api.getGoodsList = postJson('/goods/common/v1/goods/getGoodsList')

/**
 * 我的 相关接口
 */
// 获取我的订单
api.getMineInfo = postJson('/user/outer/v1/mineHome/getMineInfo')
// 获取 我的 优惠券
api.getMyCouponList = postJson('/user/outer/v1/mineHome/getMineCouponList')

/**
 * 我的订单 相关接口
 */
// 获取我的订单
api.getOrderList = postJson('/order/outer/v1/getOrderList')

/**
 * 收货地址 相关接口
 */
// 获取收货地址列表
api.getUserAddressList = postJson('/user/outer/v1/getUserAddressList')
// 添加收货地址
api.addUserAddress = postJson('/user/outer/v1/addUserAddress')
// 获取单个收货地址
api.receiverInfoById = defaultPost('/vdian/wechat/getUserAddressByAddId')
// 修改收货地址
api.changeUserAddress = postJson('/user/outer/v1/changeUserAddress')
// 删除收货地址
api.deleteUserAddress = postJson('/user/outer/v1/deleteUserAddress')
// 获取默认收货地址
api.getUserDefaultAddress = postJson('/user/outer/v1/defAddress')
// 确认收货
api.confirmReceipt = apiPost('/vdian/wechat/order/confirmReceipt')
// api.confirmReceipt = postApiTest('/vdian/wechat/order/confirmReceipt')

/**
 * 订单 相关接口
 */
// 商品详情
api.getGoodsDetail = postJson('/goods/common/v1/goods/getGoodsDetail')
// 商品规格信息
api.getGoodsSpec = postJson('/goods/common/v1/goods/getGoodsSpec')
// 获取可领取优惠券列表
api.getCollectCouponList = postJson('/goods/common/v1/coupon/getGoodsCoupon')
// 领取优惠券
api.collectCoupon = postJson('/goods/outer/v1/coupon/pickCoupon')
// 订单详情
api.getOrderDetail = postJson('/order/outer/v1/getOrderDetailInfo')
// 获取物流
api.getOrderLogistics = postJson('/order/outer/v1/getOrderLogistics')
// 下单接口
api.requestToPayOrder = postJson('/order/outer/v1/requestToPayOrder')
// api.requestToPayOrder = apiPost('/wechat/order/requestToPayOrder')
// 确认订单 选择优惠券
api.getAvailableCouponList = postJson('/goods/outer/v1/coupon/getAvailableCouponList')
// 获取余额
api.getUserBalance = postJson('/user/outer/v1/userBalance')
// 获取商品活动优惠
api.getGoodsDiscount = postJson('/goods/common/v1/coupon/getGoodsDiscount')

// 提交formId
api.submitFormId = postJson('/third/outer/v1/wechat/addFormId')

// 支付完成页运营位
api.payResultBanner = postJson('/order/outer/v1/getPayResultPageBanner')

// 是否开启引导页
api.showGuideSwitch = apiPost('/h5Shopping/borrow/showGuideSwitch')

export default api
