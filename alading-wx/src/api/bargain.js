/**
 * Created by huangyilu on 2018/12/02.
 * 砍价接口
 */
import { postMicro } from './core'

// 微服务 json方式传参
const postJson = postMicro('', 'application/json;charset=utf-8')

let api = {}

// 砍价首页 商品列表
api.getBargainIndexGoods = postJson('/activity/outer/v1/freeOrder/todayGoods')
// 砍价商品 详情
api.getBargainIndexGoodsDetail = postJson('/activity/outer/v1/freeOrder/getFreeOrderGoodsDetail')
// 活动规则
api.getBargainRule = postJson('/activity/outer/v1/freeOrder/getFreeOrderActivityRules')
// 查询 商品限购 信息
api.getBargainGoodsLimitInfo = postJson('/activity/outer/v1/freeOrder/getUserGoodsLimitInfo')

/**
 * 订单相关
 */

// 获取订单详情
api.getBargainOrderDetail = postJson('/activity/outer/v1/freeOrder/userFreeGoodsDetail')
// 订单 短信 一键提醒
api.userInviteHelpRemind = postJson('/activity/outer/v1/freeOrder/userInviteHelpRemind')
// 删除助力订单
api.delectUserBargainOrder = postJson('/activity/outer/v1/freeOrder/delUserFreeGoods')

// 发起助力砍价
api.createBargain = postJson('/activity/outer/v1/freeOrder/userCreateFreeOrder')
// 发送验证码
api.sendVerifyCode = postJson('/activity/outer/v1/sms/sendVerifyCode')
// 注册
api.registered = postJson('/user/outer/v1/register')

/**
 * 收货地址相关
 */
// 收货地址列表
api.getUserAddressList = postJson('/user/outer/v1/getUserAddressList')
// 添加 地址
api.addUserAddress = postJson('/user/outer/v1/addUserAddress')
// 修改 地址
api.changeUserAddress = postJson('/user/outer/v1/changeUserAddress')

// 我的砍价列表
api.getUserBargainOrderList = postJson('/activity/outer/v1/freeOrder/userFreeGoodsList')
// 砍价详情 好友砍价列表
api.getFriendsHelpList = postJson('/activity/outer/v1/freeOrder/userInviteHelpList')

export default api
