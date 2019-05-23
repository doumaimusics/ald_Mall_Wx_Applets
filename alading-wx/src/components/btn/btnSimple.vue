/**
* Created by xiejun on 2019/01/16.
* 简单按钮
*/
<template>
  <div class="ala-btn-simple" @tap="onTap">
    <div class="title" v-html="title"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
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
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.ala-btn-simple {
  margin: auto;
  width: 310px;
  height: 46px;
  line-height: 46px;
  background: @color-btn;
  border-radius: 23px;

  .title {
    font-size: @font-size-btn;
    font-family: PingFangSC-Medium;
    color: @color-txt;
    text-align: center;
  }
}
</style>