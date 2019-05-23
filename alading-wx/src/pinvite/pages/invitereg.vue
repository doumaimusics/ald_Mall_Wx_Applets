/**
* Created by liuguangqing on 2018/10/11.
* 新人注册
*/
<template>
  <div class="container"></div>
</template>

<script>
import { Base64 } from 'js-base64'
import navigate from 'utils/navigate'
import Monitor from 'utils/monitor'

export default {
  data() {
    return {
      invitationCode: ''
    }
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  onLoad(options) {
    console.log(' -- invitationCode onload -- ', options)
    if (options.invitationCode) {
      this.invitationCode = options.invitationCode
    } else if (options.scene) {
      this.invitationCode = decodeURIComponent(options.scene)
    } else {
      console.log('没有获取到参数')
    }
    console.log(this.invitationCode)
    this.gotowebview(this.invitationCode)
  },
  onShow() {
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  methods: {
    gotowebview(seCode) {
      let url =
        '/pages/webview/index?url=' +
        Base64.encode('https://h5.51fanbei.com/h5/invite4/newPeovip.html?spread=applet&recommendCode=' + seCode)
      navigate.replace({ url })
    }
  },
  watch: {},
  components: {}
}
</script>

<style lang="less">
</style>
