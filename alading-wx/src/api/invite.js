/**
 * Created by liuguangqing on 2018/12/07.
 * 邀请有礼接口
 */
import core from './core'

// 微服务 json方式传参
const postJson = core.postMicro('', 'application/json;charset=utf-8')

// 接口
const sendPost = url => postJson('/activity/outer/v1' + url)
// 接口
let api = {}

// 邀请有礼首页：
api.getinvite = sendPost('/inviteReward/index')
// 收益列表：
api.invitereve = sendPost('/inviteReward/rewardList')
// 收益明细列表：
api.invitedetail = sendPost('/inviteReward/rewardDetailList')
// 排行榜：
api.inviterank = sendPost('/inviteReward/rankingList')
// 二维码：
// api.qrcode = sendPost('/wechat/getWXACodeUnlimit')
api.qrcode = postJson('/third/outer/v1/wechat/getWXACodeUnlimit')

export default api
