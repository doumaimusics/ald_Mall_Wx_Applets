import curry from 'lodash/fp/curry'
import { commonResult, apiResult } from '@/api/core'

// 一次普通的请求
export const toRequest = curry(async (resultProcess, request, params, dataHandler = null) => {
  let response = await request(params)
  let data = resultProcess(response)
  if (data && dataHandler) await dataHandler(data)
  return data
})

export const normalRequest = toRequest(commonResult)
export const apiRequest = toRequest(apiResult)

// 合并对应的参数
const merge = curry((type, key, state, data) => {
  if (typeof key === 'string') key = { p: key, v: key }
  let param = state[key.p]
  if (type === 'headers') {
    // 传入到headers
    let headers = data.headers || {}
    headers[key.v] = param || ''
    data.headers = headers
  } else {
    if (param) data[key.v] = param
  }
  return data
})
// 放入headers
const mergeHeader = merge('headers')
export const mergeUserIdHeader = mergeHeader('userId')
export const mergeTokenHeader = mergeHeader('token')
export const mergeOldTokenHeader = mergeHeader({ p: 'oldToken', v: 'token' })
// 合并入参数中
const mergeParam = merge('')
export const mergeUserIdParam = mergeParam('userId')
// const mergeUserNameParam = mergeParam('userName')
// const mergeTokenParam = mergeParam('token')
export const mergeOrderIdParam = mergeParam({ p: 'currentOrderId', v: 'orderId' })

export default {
  normalRequest,
  apiRequest,
  mergeUserIdHeader,
  mergeTokenHeader,
  mergeOldTokenHeader,
  mergeUserIdParam,
  mergeOrderIdParam
}
