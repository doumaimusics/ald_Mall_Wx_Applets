/**
* Created by xiejun on 2019/03/22.
* 领取优惠券节点
*/
<template>
  <div class="receive-coupon-node">
    <coupon-item :coupon="couponData"></coupon-item>
    <div class="btn-receive" @tap="onTap" :class="{ 'gray': isGray }">{{ btnReceiveTxt }}</div>
  </div>
</template>

<script>
import couponItem from 'components/coupon/coupon-item'
export default {
  name: '',
  components: { couponItem },
  data() {
    return {}
  },
  props: {
    couponData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    isGray() {
      return this.couponData.isAllGot || this.couponData.isGot
    },
    btnReceiveTxt() {
      let txt = '立即领取'
      if (this.couponData.isAllGot) {
        txt = '已领完'
      } else if (this.couponData.isGot) {
        txt = '已领取'
      }
      return txt
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      if (this.isGray) return
      this.$emit('receive', this.couponData.couponId)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.receive-coupon-node {
  position: relative;
  .btn-receive {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 26px;

    width: 64px;
    height: 27px;
    line-height: 27px;

    text-align: center;
    font-size: 12px;
    color: @color-txt;
    background: @color-btn;
    border-radius: 15px;
    &.gray {
      color: white;
      background: #ddd;
    }
  }
}
</style>