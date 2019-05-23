/**
 * Created by xiejun on 2019/02/28.
 * repay api
 */
import core from './core'

let headerData = { requestSource: 'microService' }
const _post = core.post({
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    data: JSON.stringify(headerData)
  }
})
// 用于定制api接口
const _postApi = (prefix = '', baseURL = '', contentType = 'application/json;charset=utf-8') => {
  prefix = '/h5Shopping' + prefix
  return _post({ prefix, baseURL, contentType })
}

const postApi = _postApi('')
const postAuth = _postApi('/auth')
const postBorrow = _postApi('/borrow')

// 接口
let api = {}

// 银行卡还款
api.bankCardRepayment = postApi('/user/bankCardRepayment')
// 银行卡列表
api.getBankCardList = postApi('/user/getBankCardList')
// 申请修改银行卡，发送验证码
api.applyEditBankCardInfo = postAuth('/applyEditBankCardInfo')
// 修改银行卡
api.submitEditBankCardInfo = postAuth('/submitEditBankCardInfo')

// 账单页面
api.getMyBorrowListV1 = postBorrow('/getMyBorrowListV1')
// 账单详情
api.getBillListByMonthAndYear = postBorrow('/getBillListByMonthAndYear')
// 退还款记录页面
api.getMyRepaymentHistoryV1 = postBorrow('/getMyRepaymentHistoryV1')
// 退还款详情
api.getRepaymentDetailV1 = postBorrow('/getRepaymentDetailV1')
// 还款页面
api.getMyRepaymentV1 = postBorrow('/getMyRepaymentV1')
// 还款详情页面弹层
api.getMyRepaymentDetailV1 = postBorrow('/getMyRepaymentDetailV1')
// 输入支付密码
api.submitRepaymentByYiBao = postBorrow('/submitRepaymentByYiBao')
// 还款成功页面
api.getPayTypeStatus = postApi('/repayment/getPayTypeStatus')
api.getLimitDetailInfo = postApi('/bill/getLimitDetailInfo')

export default api
