/**
* Created by xiejun on 2018/11/27.
* 菜单图标节点
*/
<template>
  <div class="menu-icon-node" @tap="onTap">
    <div class="icon" :class="'n' + type">
      <div v-if="amount" class="weui-badge">{{ showAmount }}</div>
    </div>
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
    amount: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    showAmount() {
      if (this.amount > 99) return '99+'
      return this.amount
    }
  },
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
.menu-icon-node {
  .flex-ver-center();
  .icon {
    position: relative;
    @icon-size: 30px;
    &.n1 {
      .icon('icon_custom_service', @icon-size, @icon-size);
    }
    &.n2 {
      .icon('icon_home_black', @icon-size, @icon-size);
    }
    &.n3 {
      .icon('icon_to_shopping_cart', @icon-size, @icon-size);
    }
    .weui-badge {
      position: absolute;
      top: 0;
      right: 0;
      transform: translateX(30%);

      background: @color-price;

      border-radius: 18px;
      padding: 0.1em 0.25em;
      line-height: 1;
      min-width: 8px;

      font-size: 11px;
      color: white;
    }
  }
  .title {
    font-size: 9px;
  }
}
</style>