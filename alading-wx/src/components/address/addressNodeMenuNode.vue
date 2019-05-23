/**
* Created by xiejun on 2018/10/19.
* 地址节点-菜单节点
*/
<template>
  <div class="ala-address-node-menu-node" @click.stop="onClick">
    <div :class="'node-icon-' + index"></div>
    <span class="node-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    index: {
      type: Number,
      default: 0
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
      this.$emit('click')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@icon-size: 20px;
.ala-address-node-menu-node {
  .flex-hor-center();
  margin-left: 20px;

  // 生成对应的icon
  .node-icon(@name) {
    .icon(@name, @icon-size, @icon-size);
  }
  @list: 'icon_edit', 'icon_delete';
  .generate-icon(@length, @i:0) when (@i < @length) {
    .node-icon-@{i} {
      @iconName: extract(@list, @i + 1);
      .node-icon(@iconName);
    }
    .generate-icon(@length, @i + 1);
  }
  .generate-icon(length(@list));

  .node-title {
    margin-left: 3.5px;
    font-size: @font-size-txt;
    color: @color-txt;
  }
}
</style>
