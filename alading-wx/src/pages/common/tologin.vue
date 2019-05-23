/**
* Created by xiejun on 2018/11/7.
* 去登录
*/
<template>
  <div class="ala-to-login">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import navigate from 'utils/navigate'
import storage from 'utils/storage'
import basis from 'utils/basis'
import Tips from 'utils/tip'
import wx from 'wx'
import Monitor from 'utils/monitor'
export default {
  name: '',
  data() {
    return {
      getTokenFail: false
    }
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  onShow() {
    this.tologin()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {},
  methods: {
    ...mapActions(['getToken']),

    // 去取得token
    async tologin() {
      // 检测是否存在版本更新
      // await this.checkUpdate()
      this.loadToken()
    },

    async loadToken() {
      let data = await this.getToken()
      if (data) {
        // 已经取得了token
        let options = storage.props.launchOptions
        let params = basis.urlencoded(options.query)
        let path = options.path
        if (path.charAt(0) !== '/') path = '/' + path
        let url = path + '?' + params
        storage.props.launchStatus = 0
        navigate.reLaunch({ url })
      } else {
        Tips.error('由于授权延迟，请稍候重试！')
      }
    },

    checkUpdate() {
      return new Promise((resolve, reject) => {
        let updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(res => {
          if (!res.hasUpdate) {
            resolve()
          } else {
            Tips.toast('正在下载最新版小程序', 100000)
          }
        })
        updateManager.onUpdateReady(() => {
          Tips.toast('新版本已经准备好，将马上重启小程序', 2000, () => {
            updateManager.applyUpdate()
          })
        })
        updateManager.onUpdateFailed(() => {
          resolve()
        })
      })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-to-login {
  .login-fail {
    font-size: @font-size-label;
    color: @color-warn;
    .btn {
    }
  }
}
</style>
