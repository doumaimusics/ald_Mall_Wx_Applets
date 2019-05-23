/**
* Created by xiejun on 2018/12/28.
* 参与拼团 失败提示（存在未支付或待分享的订单）
*/
<template>
  <div class="collage-fail-toast">
    <div class="title">{{ title }}</div>
    <div class="timeout">{{ timeoutInfo }}</div>
    <div class="btn" @tap="onTap">{{ btnTitle }}</div>
    <div class="btn-close" @tap="onCloseTap"></div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import collageBasis from 'pcollagecomp/basis'
export default {
  name: '',
  data() {
    return {
      timeoutInfo: ''
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    btnTitle: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  computed: {},
  created() {
    this.startCountdown()
  },
  mounted() {},
  onUnload() {
    this.clearCountdown()
  },
  watch: {},
  methods: {
    startCountdown() {
      this.timeoutKey = basis.countdown(this.duration, {
        timer: data => this.updateTimeoutInfo(data.last),
        complete: () => this.$emit('timeout')
      })
    },
    updateTimeoutInfo(count) {
      this.timeoutInfo = collageBasis.timeFormat(count) + '后将自动关闭'
    },
    clearCountdown() {
      basis.clearCountdown(this.timeoutKey)
    },
    onTap() {
      // this.clearCountdown()
      this.$emit('tap')
    },
    onCloseTap() {
      this.clearCountdown()
      this.$emit('close')
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.collage-fail-toast {
  position: fixed;
  left: 50%;
  top: 135px;
  transform: translateX(-50%);
  z-index: 20;

  .icon('image_toast_rule', 300px, 184px);
  background-size: 100%;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;

  color: @color-txt;

  .title {
    margin-top: 25px;
    font-family: PingFangSC-Medium;
    font-size: 19px;
  }

  .timeout {
    margin-top: 6px;
    font-size: 17px;
    color: @color-txt-1;
  }

  .btn {
    margin: auto;
    margin-top: 30px;

    width: 248px;
    height: 44px;
    line-height: 44px;
    background: @color-btn;
    border-radius: 22px;

    font-family: PingFangSC-Medium;
    font-size: 15px;
    text-align: center;
  }

  .btn-close {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>