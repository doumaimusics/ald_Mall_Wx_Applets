/*
 * 小程序里面一定要有canvasid，它是以这个为标识来识别的
 * <canvas canvasId="canvasId" style="border:1px solid black;width:540rpx;height:631rpx;"/>
 * 多张图片、水印文字、canvasId、callback
 */
import wx from 'wx'
export const image = (imgList, titleObject, canvasIds, callback) => {
  // 初始化画布
  const ctx = wx.createCanvasContext(canvasIds)
  // 合成多张图片的时候
  imgList.forEach((item, index) => {
    ctx.drawImage(
      item.imgurl,
      item.x,
      item.y,
      item.width,
      item.height
    )
  })
  // 写文字水印
  ctx.setFontSize(titleObject.fontSize)
  ctx.fillText(titleObject.content, titleObject.x, titleObject.y)
  // 画出canvas上面的图片
  ctx.draw(true, function () {
    wx.canvasToTempFilePath({
      // canvasId
      canvasId: canvasIds,
      destWidth: 600,
      destHeight: 800,
      // 图片质量
      quality: 80,
      success: function (res) {
        console.log(res)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(res) {
            // const savedFilePath = res.savedFilePath
            console.log(res)
            callback(res.savedFilePath)
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  })
}
