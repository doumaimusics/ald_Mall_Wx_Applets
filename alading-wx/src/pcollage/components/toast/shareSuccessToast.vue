/**
* Created by xiejun on 2018/12/12.
* 分享成功弹窗
*/
<template>
  <div class="collage-share-success-toast">
    <div class="share-success-toast__title">分享成功</div>
    <div class="share-success-toast__content">分享3次以上，拼单成功率高达98%哦</div>
    <div class="share-success-toast__btn-continue" @tap="onContinueTap">继续分享</div>
    <div class="share-success-toast__btn-close" @tap="onCloseTap"></div>  
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onContinueTap() {
      this.$emit('continue')
    },
    onCloseTap() {
      this.$emit('close')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-share-success-toast {
  position: fixed;
  left: 50%;
  top: 103.5px;
  transform: translateX(-50%);
  z-index: 20;

  .icon('image_toast_rule', 300px, 187px);
  background-size: 100%;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;

  color: @color-txt;
  .share-success-toast__title {
    margin-top: 19px;
    font-family: PingFangSC-Medium;
    font-size: 17px;
  }
  .share-success-toast__content {
    margin-top: 24px;
    font-size: 15px;
  }
  .share-success-toast__btn-continue {
    margin: auto;
    margin-top: 19px;
    
    width: 226px;
    height: 41px;
    line-height: 41px;
    background: @color-btn;
    border-radius: 20px;

    font-family: PingFangSC-Medium;
    font-size: 15px;
    text-align: center;
  }
  .share-success-toast__btn-close {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>