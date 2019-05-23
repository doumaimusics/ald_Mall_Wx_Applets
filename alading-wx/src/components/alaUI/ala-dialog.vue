/**
* Created by huangyilu on 2018/10/23.
* 说明弹窗样式
*/
<template>
  <div class="ala-dialog-view">
    <div class="ala-dialog__content">
      <div class="content-icon" @click="dialogShowFn"></div>
      <div class="content-title">{{ dialogTitle }}</div>
      <div class="content-tips" v-for="item in dialogContent" :key="index">{{ item }}</div>
      <div class="content-btn" @click="dialogShowFn">知道了</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ala-switch',
  data() {
    return {}
  },
  props: {
    dialogTitle: {
      type: String,
      default: '使用说明'
    },
    dialogContent: {
      type: Array,
      default: []
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    dialogShowFn() {
      this.$emit('dialogShowFn')
    }
  }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

.ala-dialog-view {
  position: fixed;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  .ala-dialog__content {
    position: relative;
    width: 5.9rem;
    box-sizing: border-box;
    padding: 23px;
    margin: 40% auto;
    border-radius: 10px;
    background-color: #ffffff;
    color: #232323;
    font-size: .28rem;
    .content-icon {
      position: absolute;
      right: 12px;
      top: 12px;
      .icon('icon_ring_delete',20px, 20px);
    }
    .content-title {
      font-family: PingFangSC-Medium;
      font-size: .34rem;
      color: @color-txt;
      text-align: center;
      margin-bottom: 23px;
    }
    .content-tips {
      padding-bottom: 5px;
      font-size: .28rem;
    }
    .content-btn {
      width: 100%;
      height: .8rem;
      line-height: .8rem;
      margin-top: 15px;
      text-align: center;
      background-color: @color-btn;
      border-radius: 2.5px;
    }
  }
}
</style>
