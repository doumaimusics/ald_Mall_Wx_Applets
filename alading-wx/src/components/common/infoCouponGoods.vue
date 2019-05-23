/**
* Created by xiejun on 2019/03/21.
* 领券信息
*/
<template>
  <div v-if="infoVisible" class="info-coupon-goods" @tap="onTap">
    <span class="tip">领券</span>
    <div v-if="isShowMsg" class="msg">
      <span>限制</span>
      <span>此价格不与优惠券同享</span>
    </div>
    <div v-else class="coupon-title-list">
      <span v-for="(title, index) in showCouponTitles" :key="index">{{ title }}</span>
    </div>
    <span v-if="!isShowMsg" class="icon"></span>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  props: {
    couponTitles: {
      type: Array,
      default: function() {
        return []
      }
    },
    isShowMsg: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    infoVisible() {
      return this.isShowMsg || this.couponTitles.length
    },
    showCouponTitles() {
      return this.couponTitles.slice(0, 2)
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      if (this.isShowMsg) return
      this.$emit('tap')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.info-coupon-goods {
  .flex-hor-center();
  padding-right: @padding-h;
  height: 36px;
  .tip {
    margin-right: 18px;
    font-size: 12px;
    color: @color-txt-2;
  }
  .msg {
    .flex-n();
    .flex-hor-center();
    font-size: 13px;
    color: @color-txt;
    span:first-child {
      color: @color-price;
      border: 1px @color-price solid;
      border-radius: 50px;
      padding: 0 5px;
      font-size: 10px;
      font-family: PingFangSC-Medium;
      margin-top: 1px;
      margin-right: 4px;
    }
  }
  .coupon-title-list {
    .flex-n();
    font-size: 13px;
    color: @color-price;
    .show-one-line();
    span {
      margin-right: 13px;
    }
  }
  .icon {
    margin-left: 15px;
    .icon-arrow();
  }
}
</style>