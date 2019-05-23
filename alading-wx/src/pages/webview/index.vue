/**
* Created by huangyilu on 2018/10/24.
* webView
*/
<template>
  <div class="ala-web-view">
    <web-view v-if="toShowUrl" :src="toShowUrl" @message="bindmessage"></web-view>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import storage from 'utils/storage'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      toShowUrl: ''
    }
  },
  props: {},
  computed: {
    ...mapGetters(['webviewUrl', 'encodeWebviewUrl'])
  },
  created() {},
  onLoad(options) {
    if (options.url) {
      this.setWebviewUrlsData(options.url)
      Monitor.webviewPage(this.webviewUrl)
    }
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  mounted() {},
  onShow() {
    // 从模版消息 等其他地方进入时
    if (storage.props.launchStatus === 0) {
      let options = storage.props.launchOptions
      if (options && options.query.url) {
        this.setWebviewUrlsData(options.query.url)
        // 清空一下
        options.query = {}
        storage.props.launchOptions = options
      }
    }

    this.toShowUrl = this.webviewUrl
    if (this.webviewUrl.indexOf('asj/shoppingCart') > -1) {
      this.toShowUrl = ''
      clearTimeout(this._showId)
      this._showId = setTimeout(() => {
        this.toShowUrl = this.webviewUrl
        this._showId = -1
      }, 50)
    }
  },
  onUnload() {
    this.deleteWebviewUrlInUrls()
  },
  watch: {},
  onShareAppMessage(options) {
    return {
      path: '/pages/webview/index?url=' + this.encodeWebviewUrl,
      success: function(res) {
        // that.web_url = return_url
        // 转发成功
        // Tips.toast('分享成功！')
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  methods: {
    ...mapMutations(['setWebviewUrlsData', 'deleteWebviewUrlInUrls']),
    bindmessage(e) {
      console.log(e)
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
</style>
