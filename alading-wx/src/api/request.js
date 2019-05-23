import wx from 'wx'
import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

request.interceptors.request.use(request => {
  // 用于后端区分小程序项目和其他项目
  request.headers = {
    ...request.headers,
    isWechat: 'true'
  }
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: 'status:' + err.status + ', ' + err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
