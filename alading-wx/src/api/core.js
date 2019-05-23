import Tips from 'utils/tip'
import request from './request'
import curry from 'lodash/fp/curry'
import basis from 'utils/basis'
import conf from '@/conf'
import storage from 'utils/storage'
import navigate from 'utils/navigate'

const baseURL = conf.URL_BASE

// 设置请求基地址
request.config.baseURL = baseURL

// request post method
const post = curry((options, { contentType, baseURL, prefix }, url, data) => {
  if (!options) options = {}
  let opt = JSON.parse(JSON.stringify(options))

  if (contentType) opt.headers['content-type'] = contentType
  if (baseURL) opt.baseURL = baseURL

  if (data.headers) {
    opt.headers = { ...opt.headers, ...data.headers }
    delete data.headers
  }

  // 增加appVersion参数
  data.appVersion = conf.VERSION_APP

  let isNeedUrlEncoder = opt.headers['content-type'].indexOf('x-www-form-urlencoded') >= 0
  if (isNeedUrlEncoder) {
    data = encodeURI(basis.urlencoded(data))
  }

  if (prefix) url = prefix + url
  return request.post(url, data, opt)
})

export const postForm = post({
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 用于定制api接口
export const postApi = (prefix = '', baseURL = '') => postForm({ prefix, baseURL })
// 用于定制api接口 增加对contentType的配置， 默认为json格式
export const postApiJson = (prefix = '', baseURL = '', contentType = 'application/json;charset=utf-8') =>
  postForm({ prefix, contentType, baseURL })
// 用于定制微服务接口
export const postMicro = (prefix = '', contentType = 'application/json;charset=utf-8', baseURL = '') => {
  prefix = '/gateway' + prefix
  return postForm({ contentType, baseURL, prefix })
}

// 默认的微服务接口post 兼容项目之前的请求
export const defaultPost = postMicro('/outerh5/activity', '')
// 默认的api接口post 兼容项目之前的请求
export const apiPost = postApi()
// 默认的埋点接口post 兼容项目之前的请求
export const maidianPost = postApi('', 'https://h5.51fanbei.com')

// micro service 针对老api在小程序上的应用方式
let headerData = { requestSource: 'microService' }
const _postMicroService = post({
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    data: JSON.stringify(headerData)
  }
})
const postMicroService = (prefix = '', baseURL = '', contentType = 'application/json;charset=utf-8') => {
  return _postMicroService({ prefix, baseURL, contentType })
}

// 请求结果处理
export const resultProcess = curry((check, error, response) => {
  let errorMsg = '数据请求失败'
  if (response) {
    let result = response.result ? response.result : response
    // 添加 注销账户 判断
    if (result.code === 6666009) {
      storage.props.tokenData = null
      navigate.push({ url: '/pages/common/login?clearToken=true' })
    }
    if (check(result)) {
      let data = result.data
      if (!data) data = {}
      return data
    } else {
      errorMsg = result.msg
    }
  }

  error ? error(errorMsg) : Tips.toast(errorMsg)
  return null
})

export const commonResultProcess = resultProcess(result => result.code === 1000)
export const commonResult = commonResultProcess(null)

export const apiResultProcess = resultProcess(result => result.success)
export const apiResult = apiResultProcess(null)

export default {
  post,
  postForm,
  postApi,
  postApiJson,
  postMicro,

  defaultPost,
  apiPost,
  maidianPost,
  postMicroService,

  resultProcess,
  commonResultProcess,
  commonResult,
  apiResultProcess,
  apiResult
}
