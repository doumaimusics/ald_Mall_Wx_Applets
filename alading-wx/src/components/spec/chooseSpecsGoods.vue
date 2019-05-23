/**
* Created by xiejun on 2019/03/19.
* 规格选择商品
*/
<template>
  <div class="choose-specs-goods">
    <div class="icon">
      <img :src="goodsData.icon" mode="aspectFill">
    </div>
    <div class="info">
      <div class="price">￥{{ goodsPrice }}</div>
      <block v-if="!goodsData.tip">
        <div class="stock">库存{{goodsData.stock}}件</div>
        <div class="specs">已选 {{goodsData.propertyValueNames}}</div>
      </block>
      <div v-else class="tip">{{goodsData.tip}}</div>
    </div>  
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
    goodsData: {
      type: Object,
      default: function() {
        return null
      }
    }
  },
  computed: {
    goodsPrice() {
      let { price, actualAmount } = this.goodsData
      if (actualAmount !== undefined) price = actualAmount
      return price
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.choose-specs-goods {
  .flex-hor-center();
  padding-top: 10px;
  padding-left: @padding-h;
  padding-bottom: 10px;
  box-sizing: border-box;
  .icon {
    width: 95px;
    height: 95px;
    margin-right: 10px;
    border-radius: 4px;
    overflow: hidden;
  }
  .info {
    .flex-n();
    color: @color-txt-1;
    font-size: @font-size-tip;
    height: 90px;
    margin-right: 35px;
    .price {
      margin-top: 15px;
      margin-bottom: 15px;
      color: @color-price;
      font-size: @font-size-label;
    }
    .stock {
      margin-bottom: 3px;
    }
    .specs {
      .show-two-line();
    }
    .tip {
      margin-top: 34px;
    }
  }
}
</style>