/**
* Created by xiejun on 2018/11/4.
* 订单详情——价格
*/
<template>
  <div class="ala-order-detail-price">
    <ala-price-node title="运费" :price="priceData.expressFee || priceData.afStoreShopDto.expressFee"></ala-price-node>
    <ala-price-node title="商品总价" :price="priceData.orderAmount"></ala-price-node>
    <ala-price-node title="优惠减免" :isFav="true" :price="priceData.couponAmount"></ala-price-node>
    <ala-price-node :title="couponAmountTitle" :isFav="true" :price="priceData.afStoreShopDto.shopCouponAmount"></ala-price-node>
    <ala-price-node title="活动优惠" :isFav="true" :price="priceData.discountAmount"></ala-price-node>
    <ala-price-node title="金币抵扣" :isFav="true" :price="priceData.goldCoinAmount"></ala-price-node>
    <ala-price-node title="余额抵扣" :isFav="true" :price="priceData.usedRebateAmount"></ala-price-node>
    <ala-price-node title="实付款" type="1" :price="priceData.actualAmount"></ala-price-node>
  </div>
</template>

<script>
import alaPriceNode from './priceNode'
export default {
  name: '',
  data() {
    return {
      price: '100'
    }
  },
  props: {
    priceData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    couponAmountTitle() {
      let title = '店铺优惠'
      if (this.priceData.afStoreShopDto.shopName === '爱上街商城') {
        title = '商城优惠'
      }
      if (this.priceData.childOrderList.length > 1) title = '店铺/商城优惠'
      return title
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { alaPriceNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-order-detail-price {
  width: 100%;
  background: white;
  padding-top: 8px;
  padding-bottom: 15px;
  .ala-price-node {
    margin-top: 7px;
    &:last-child {
      margin-top: 10px;
    }
  }
}
</style>