/**
* Created by xiejun on 2018/12/11.
* 神灯节跳转到小游戏
*/
<template>
  <div v-if="visible" class="jumper-lamp-game">
    <div class="img-0"></div>
    <div class="img-1"></div>
    <div class="btn-jump" @tap="onTap"></div>
  </div>
</template>

<script>
import wx from 'wx'
import storage from 'utils/storage'
import Monitor from 'utils/monitor'
export default {
  name: '',
  data() {
    return { visible: false }
  },
  props: {},
  computed: {},
  created() {},
  onShow() {
    if (storage.props.launchStatus === 1) return
    this.visible = true
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      let params = {
        appId: 'wxec589676fae6b290',
        envVersion: 'release',
        success(res) {
          // 打开成功
        },
        fail(res) {},
        complete(res) {}
      }
      wx.navigateToMiniProgram(params)
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.jumper-lamp-game {
  .fill-screen();
  overflow: hidden;
  .img-0 {
    .image-single('image_lamp_01.png', 375px, 416.5px);
  }
  .img-1 {
    .image-single('image_lamp_02.png', 375px, 287.5px);
  }
  .btn-jump {
    position: absolute;
    left: 28.5px;
    top: 476px;
    .image-single('image_lamp_03.png', 318px, 76px);
  }
}
</style>
