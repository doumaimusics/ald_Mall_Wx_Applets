/**
* Created by xiejun on 2018/11/27.
* 菜单图标节点
*/
<template>
  <div class="detail-goods-menu-icon-node" @tap="onTap">
    <div class="icon" :class="'n' + type"></div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: '1'
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
    onTap() {
      this.$emit('tap')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.detail-goods-menu-icon-node {
  .flex-ver-center();
  .icon {
    @icon-size: 30px;
    &.n1 {
      .icon('icon_custom_service', @icon-size, @icon-size);
    }
    &.n2 {
      margin: 7.5px;
      .icon('icon_to_home', 15px, 15px);
    }
    &.n3 {
      .icon('icon_shopping_cart', @icon-size, @icon-size);
    }
  }
  .title {
    font-size: 9px;
  }
}
</style>