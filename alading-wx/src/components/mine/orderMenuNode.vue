/**
* Created by xiejun on 2018/10/17.
* 订单菜单节点
*/
<template>
  <div class="ala-order-menu-node" @click="onClick">
    <div class="aomn__icon">
      <div :class="'aomn__icon-'+ index"></div>
      <div v-if="nodeData.amount" class="weui-badge">{{nodeData.amount}}</div>
    </div>
    <span class="aomn__name">{{nodeData.title}}</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import navigate from 'utils/navigate'
import maidian from 'utils/maidian'
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
    nodeData: {
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
    ...mapMutations(['setCurrentOrderStatusIndex']),
    onClick() {
      let types = [maidian.spm.my_unpay, maidian.spm.my_undeliver, maidian.spm.my_unget, maidian.spm.my_service]
      maidian.my(types[this.index])

      this.setCurrentOrderStatusIndex(this.index + 1)
      navigate.push({ url: '/pages/common/order', isNeedLogin: true })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@node-width: 40px;
@icon-size: 40px;
.ala-order-menu-node {
  .flex-ver-center();
  width: @node-width;
  margin-right: 54px;
  &:last-child {
    margin-right: 0;
  }

  .aomn__icon {
    position: relative;
    .weui-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: @color-price;

      border-radius: 18px;
      padding: 0.1em 0.25em;
      line-height: 1;
      min-width: 8px;
      font-size: 11px;
    }
    .aomn-icon(@name) {
      .icon('icon_order_@{name}', @icon-size, @icon-size);
    }
    .generate-icon(@length, @i:0) when (@i < @length) {
      .aomn__icon-@{i} {
        .aomn-icon(@i + 1);
      }
      .generate-icon(@length, @i + 1);
    }
    .generate-icon(4);
  }

  .aomn__name {
    font-size: @font-size-txt;
    color: @color-txt;
    margin-top: 5px;
    padding-bottom: 10px;
    .show-one-line();
  }
}
</style>