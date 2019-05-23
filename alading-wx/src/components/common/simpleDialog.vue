/**
* Created by xiejun on 2019/03/28.
* 简单弹窗
*/
<template>
  <div class="simple-dialog">
    <div @tap="onTap" class="icon"></div>
    <div class="title">{{ dialogData.title }}</div>
    <div class="content">
      <div class="tip" v-for="(tip, index) in dialogData.content" :key="index">{{ tip }}</div>
    </div>
    <div @tap="onTap" class="btn-ok">知道了</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  props: {
    dialogData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      this.$emit('tap')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.simple-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);

  width: 310px;
  // height: 220px;
  border-radius: 7px;
  background: white;

  color: @color-txt;
  font-size: 15px;
  .icon {
    position: absolute;
    right: 10px;
    top: 10px;
    .icon('icon_ring_delete', 20px, 20px);
  }
  .title {
    height: 64px;
    line-height: 64px;

    font-family: PingFangSC-Medium;
    font-size: 17px;
    text-align: center;
  }
  .content {
    margin: auto;
    width: 250px;
    max-height: 140px;
    overflow-y: auto;
    .tip {
      margin-bottom: 6px;
      line-height: 21px;
    }
  }
  .btn-ok {
    margin: 22px auto;

    width: 250px;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    background: @color-btn;
    text-align: center;
  }
}
</style>