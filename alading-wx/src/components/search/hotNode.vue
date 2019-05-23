/**
* Created by xiejun on 2018/10/12.
* 热点
*/
<template>
  <div class="ala-hot-node" @click="onClick">
    <span class="content">{{nodeName}}</span>
  </div>
</template>

<script>
import webview from 'utils/webview'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    node: {
      type: [Object, String],
      default: ''
    }
  },
  computed: {
    nodeName() {
      if (typeof this.node === 'string') return this.node
      return this.node.name
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClick() {
      webview.openSearch(this.nodeName)
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-hot-node {
  display: inline-block;
  background: @color-btn-2;
  border-radius: 2px;
  margin-top: @padding-h;
  margin-right: @padding-h;
  padding: 5px 12px;

  .content {
    font-size: @font-size-tip;
    color: @color-txt;
  }
}
</style>