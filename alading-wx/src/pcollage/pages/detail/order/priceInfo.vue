/**
* Created by xiejun on 2018/12/10.
* 商品价格信息
*/
<template>
  <div class="collage-detail-order-price-info">
    <div class="price-item">
      <span class="title">商品总价</span>
      <div class="price">
        <span class="unit">¥</span>
        <span class="content">{{orderDetail.marketingPropertyPrice}}</span>
      </div>
    </div>
    <div class="price-item-total">
      <span class="title">实付款</span>
      <div class="price">
        <span class="unit">¥</span>
        <span class="content">{{orderDetail.actualAmount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    orderDetail: {
      type: Object,
      default: null
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-detail-order-price-info {
  padding: @padding-h;
  background: white;

  .price-item {
    .flex-hor-bottom();
    .title {
      .flex-n();
      font-size: @font-size-txt;
      color: @color-txt;
    }
    .price {
      font-size: @font-size-list;
      color: @color-txt-2;
    }
  }
  .price-item-total {
    margin-top: 7px;
    .flex-hor-center();
    .title {
      .flex-n();
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: @color-txt;
    }
    .price {
      font-size: 0;
      color: @color-price;
      .unit {
        font-size: @font-size-list;
      }
      .content {
        font-size: 17px;
      }
    }
  }
}
</style>