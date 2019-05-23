/**
* Created by xiejun on 2018/10/17.
* info node 信息节点
*/
<template>
  <div class="ala-info-node" @click="onClick">
    <div class="ain__amount">{{infoData.amount}}</div>
    <div class="ain__name">{{infoData.name}}</div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import Tips from 'utils/tip'
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
    infoData: {
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
    onClick() {
      basis.clickThrottle(this.onNodeClick)
    },
    onNodeClick() {
      let types = [maidian.spm.my_cash, maidian.spm.my_coupon, maidian.spm.my_coin]
      maidian.my(types[this.index])

      if (this.index === 1) {
        // 优惠券, 跳转到优惠券列表
        navigate.push({ url: '/pages/common/coupon', isNeedLogin: true })
      } else {
        Tips.toast('登录爱上街APP体验更多～')
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-info-node {
  .flex-ver-center();
  .flex-n();
  color: @color-txt;
  .ain__amount {
    font-family: PingFangSC-Medium;
    font-size: 19px;
  }
  .ain__name {
    margin-top: 7px;
    font-size: @font-size-txt;
  }
}
</style>