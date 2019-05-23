
<template>
  <div class="container">
    <div class="nav">
      111
    </div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'
import storage from 'utils/storage'
import Tips from 'utils/tip'
import { Base64 } from 'js-base64'
import Monitor from 'utils/monitor'

import wx from 'wx'

export default {
  mpType: 'app',
  created() {},
  onLaunch(options) {
    console.log('app launch', options)
    this.checkUpdate()
    // 开始launch 开始1, 结束0
    storage.props.launchStatus = 1
    this.storageOptions(options)
    // 应用第一步处理
    navigate.reLaunch({ url: '/pages/common/tologin' })
  },
  onShow(options) {
    console.log('app show', options)
    if (storage.props.launchStatus === 1) return
    this.storageOptions(options)
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  methods: {
    storageOptions(options) {
      let { path, query } = options
      if (path.indexOf('pinvite/pages/invitereg') < 0) {
        // 排序邀请有礼动态二维码
        if (query && query.scene) {
          // 针对动态二维码参数处理
          let sceneData = decodeURIComponent(query.scene)
          // 适配最新的键值对方式
          if (sceneData.startsWith('a,')) {
            let splits = sceneData.substring(2).split(',')
            sceneData = {}
            splits.map(value => {
              let splitValue = value.split('=')
              sceneData[splitValue[0]] = splitValue[1]
            })
          } else {
            sceneData = Base64.decode(sceneData)
            sceneData = JSON.parse(sceneData)
          }
          if (typeof sceneData === 'object') {
            query = { ...sceneData }
          }
        }
      }
      storage.props.launchOptions = { path, query }
    },

    checkUpdate() {
      if (wx.getUpdateManager) {
        let updateManager = wx.getUpdateManager()
        updateManager.onUpdateReady(() => {
          Tips.toast('新版本已经准备好，将马上重启小程序', 2000, () => {
            updateManager.applyUpdate()
          })
        })
        updateManager.onUpdateFailed(() => {})
      }
    }
  }
}
</script>

<style lang="less" >
</style>
