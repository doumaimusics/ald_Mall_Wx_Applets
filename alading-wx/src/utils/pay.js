/**
 * Created by huangyilu on 2018/11/1.
 * 微信支付
 */
import wx from 'wx'
import Tips from './tip'

const requestPayment = params => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: function(res) {
        // success
        Tips.toast('支付成功')
        resolve(res)
      },
      fail: function(error) {
        // fail
        console.log('fail')
        Tips.toast('支付失败')
        if (error.errMsg === 'requestPayment:ok') {
        } else if (error.errMsg === 'requestPayment:fail cancel') {
          Tips.toast('您已取消支付!')
          reject(new Error('支付失败'))
        } else if (error.errMsg === 'requestPayment:cancel') {
          Tips.toast('您已取消支付!')
          reject(new Error('支付失败'))
        } else {
          Tips.toast('支付失败!')
          reject(new Error('支付失败'))
        }
      },
      complete: function(res) {
        // complete
        console.log('complete')
        if (res.errMsg === 'requestPayment:ok') {
        } else if (res.errMsg === 'requestPayment:fail cancel') {
          Tips.toast('您已取消支付!')
          reject(new Error('支付失败'))
        } else if (res.errMsg === 'requestPayment:cancel') {
          Tips.toast('您已取消支付!')
          reject(new Error('支付失败'))
        } else {
          Tips.toast('支付失败!')
          reject(new Error('支付失败'))
        }
      }
    })
  })
}

export default {
  requestPayment
}
