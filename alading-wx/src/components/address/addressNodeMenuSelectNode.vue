/**
* Created by xiejun on 2018/10/19.
* 地址节点-菜单选择节点
*/
<template>
  <div class="ala-address-node-menu-select-node" @click.stop="onClick">
    <div :class="['node-icon', {'node-icon-select': isSelect} ]"></div>
    <span class="node-title">{{ title }}</span>
  </div>
</template>

<script>
import Tips from 'utils/tip'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    isSelect: {
      type: Boolean,
      default: false
    },
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
    onClick() {
      if (!this.isSelect) {
        this.$emit('select')
      } else {
        Tips.toast('亲,不能取消默认地址')
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@icon-size: 20px;
.ala-address-node-menu-select-node {
  .flex-hor-center();

  // 生成对应的icon
  .node-icon {
    .icon('icon_address_unselected', @icon-size, @icon-size);
  }

  .node-icon-select {
    .icon('icon_address_selected', @icon-size, @icon-size);
  }

  .node-title {
    margin-left: 5px;
    font-size: @font-size-txt;
    color: @color-txt;
  }
}
</style>
