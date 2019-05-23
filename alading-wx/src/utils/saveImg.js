/**
 * 保存图片
 */
import wx from 'wx'
import Tips from './tip'

const downImg = filePath => {
  wx.saveImageToPhotosAlbum({
    filePath,
    success(res) {
      console.log('保存图片：success')
      wx.showToast({
        title: '保存成功'
      })
    },
    fail(res) {
      console.log('保存图片：fail')
      console.log(res)
    }
  })
}
const saveImg = function(downloadUrl) {
  // Tips.loading()
  function downloadImage(imageUrl) {
    // 下载文件
    wx.downloadFile({
      url: imageUrl,
      success: function(res) {
        console.log('下载文件：success', res) // 保存图片到系统相册

        Tips.loading('正在保存中')
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log('保存图片：success')
            Tips.toast('保存成功')
          },
          fail(res) {
            console.log('保存图片：fail', res)
            Tips.toast('图片保存失败，请重新尝试')
          }
        })
      },
      fail: function(res) {
        console.log('下载文件：fail', res)
      }
    })
  }
  console.log('onSavePicClick')
  console.log('downloadUrl=' + downloadUrl)
  if (!wx.saveImageToPhotosAlbum) {
    Tips.loaded()
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
    return
  } // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope
  Tips.loaded()
  wx.getSetting({
    success(res) {
      console.log('getSetting: success')
      if (!res.authSetting['scope.writePhotosAlbum']) {
        console.log('1-没有授权《保存图片》权限') // 接口调用询问
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            console.log('2-授权《保存图片》权限成功')
            downloadImage(downloadUrl)
          },
          fail() {
            // 用户拒绝了授权
            console.log('2-授权《保存图片》权限失败') // 打开设置页面
            wx.openSetting({
              success: function(data) {
                console.log('openSetting: success')
              },
              fail: function(data) {
                console.log('openSetting: fail')
              }
            })
          }
        })
      } else {
        console.log('1-已经授权《保存图片》权限')
        // 用户拒绝了授权
        downloadImage(downloadUrl)
      }
    },
    fail(res) {
      console.log('getSetting: success')
      console.log(res)
    }
  })
}
export { saveImg, downImg }
