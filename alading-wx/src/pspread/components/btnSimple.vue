/**
* Created by xiejun on 2019/01/16.
* 简单按钮
*/
<template>
  <div class="spread-btn-simple" @tap="onTap">
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
.spread-btn-simple {
  margin: auto;
  width: 275px;
  height: 35px;
  line-height: 35px;
  border-radius: 18px;
  background-image: linear-gradient(-180deg, #ff7843 0%, #ff3c39 100%);

  .title {
    font-size: @font-size-list;
    font-family: PingFangSC-Medium;
    color: white;
    text-align: center;
  }
}
</style>