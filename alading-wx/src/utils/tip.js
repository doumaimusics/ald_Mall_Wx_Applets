import wx from 'wx'
/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor() {
    this.isLoading = false
  }
  /**
   * 弹出提示框
   */

  static success(title = '', duration = 1500) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: 'success',
        mask: true,
        duration: duration
      })
    }, 300)
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  /**
   * 弹出确认窗口
   */
  static confirm(text, payload = {}, title = '提示', confirmText = '确定') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        confirmText: confirmText,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  }

  static toast(title = '', duration = 2000, onHide) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: 'none',
        mask: true,
        duration
      })
    }, 300)

    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, duration)
    }
  }

  /**
   * 警告框
   */
  static alert(title = '') {
    wx.showToast({
      title: title,
      image: '../images/alert.png',
      mask: true,
      duration: 1500
    })
  }

  /**
   * 错误框
   */

  static error(title = '', onHide) {
    wx.showModal({
      title: '',
      content: title,
      showCancel: false,
      image: '../images/alert2x.png',
      mask: true,
      duration: 150000
    })
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 1500)
    }
  }

  /**
   * 弹出加载提示
   */
  static loading(title = '加载中') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wx.showLoading({
      title: title,
      mask: true
    })
  }

  /**
   * 加载完毕
   */
  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false
      wx.hideLoading()
    }
  }

  static loadDelay(callback = null, title = '加载中', duration = 600) {
    Tips.loading(title)
    setTimeout(() => {
      Tips.loaded()
      callback && callback()
    }, duration)
  }

  static share(title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function(res) {
        Tips.toast('分享成功')
      }
    }
  }
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false
