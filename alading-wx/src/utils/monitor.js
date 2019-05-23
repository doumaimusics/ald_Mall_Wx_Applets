import WXLogger from 'utils/wxLogger.js'
import storage from 'utils/storage'
import conf from '@/conf'

const isOnline = (() => {
  if (conf.URL_BASE === 'https://app.51fanbei.com') {
    return true
  } else {
    return false
  }
})()

/**
 * disableHook 是否禁用 request 请求监听。默认会监听并用于上报 API 调用成功率。
 * uid 用户 ID，用于统计 UV。
 */
const Monitor = WXLogger.init({
  pid: 'hu30cmlua7@e2f7eabdcd1f18d',
  uid: storage.props.tokenData ? storage.props.tokenData.rid : '',
  region: 'cn',
  disableHook: !isOnline
})

const pageShow = () => {
  if (isOnline) {
    Monitor.pageShow()
    // console.log(' send Monitor.pageShow() ')
  }
}

const pageHide = () => {
  if (isOnline) {
    Monitor.pageHide()
    // console.log(' send Monitor.pageHide() ')
  }
}

const pageError = () => {
  if (isOnline) {
    Monitor.error()
    // console.log(' send Monitor.error() ')
  }
}

const webviewPage = url => {
  if (isOnline) {
    Monitor.pageShow()
    Monitor.setConfig({ url })
    // console.log(' webviewPage ', url)
  }
}

export default {
  pageShow,
  pageHide,
  pageError,
  webviewPage
}
