/**
* Created by xiejun on 2019/01/22.
* 我的底部菜单
*/
<template>
  <div class="my-menu-index" :class="{ 'iphonex':isIphoneX }">
      <menu-node :type="1" title="拼团"/>
      <div class="cut-off-line"></div>
      <menu-node :type="2" title="我的"/>
  </div>
</template>

<script>
import menuNode from './menuNode'
import mixinsBase from 'mixins/mixinsBase'

export default {
  mixins: [mixinsBase],
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    menuNode
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@import '../conf.less';
.my-menu-index {
  position: fixed;
  z-index: 5;
  left: 0;
  bottom: 0;
  width: 100%;
  height: @menu-height;
  .flex-hor-center();
  .border-1px-top();
  background: white;

  .adapt-iphonex();

  .cut-off-line {
    height: 34px;
    width: 1px;
    background: @color-border;
  }
}
</style>