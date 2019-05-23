/**
* Created by xiejun on 2019/03/22.
* 领取优惠券
*/
<template>
  <div class="receive-coupon" :class="{ 'show':isShow }">
    <div class="title">商品优惠</div>
    <div class="coupon-list">
      <receive-coupon-node
      v-for="(couponData, index) in couponList"
      @receive="onReceive"
      :couponData="couponData"
      :key="index"/>
    </div>
    <div class="btn-close" @tap="onCloseTap"></div> 
  </div>
</template>

<script>
import receiveCouponNode from './receiveCouponNode'
export default {
  name: '',
  components: { receiveCouponNode },
  data() {
    return {}
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    couponList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onReceive(couponId) {
      this.$emit('receive', couponId)
    },
    onCloseTap() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

@coupon-height: 460px;
@title-height: 46px;
@bottom-padding: 20px;
.receive-coupon {
  width: 100%;
  height: @coupon-height;
  background: white;
  .radius-top(10px);

  position: fixed;
  left: 0;
  z-index: 20;
  bottom: -@coupon-height;
  .linear();

  &.show {
    bottom: 0;
  }

  .btn-close {
    position: absolute;
    right: 10px;
    top: 12px;
    .icon('icon_close_black', 20px, 20px);
  }

  .title {
    width: 100%;
    height: @title-height;
    line-height: @title-height;
    background: white;
    .radius-top(10px);

    color: @color-txt;
    font-size: 16px;
    text-align: center;
  }

  .coupon-list {
    height: @coupon-height - @title-height - @bottom-padding;
    overflow-y: auto;
    .scroll();
  }
}
</style>