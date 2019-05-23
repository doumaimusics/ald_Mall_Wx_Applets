/**
* Created by xiejun on 2019/01/29.
* 商品价格信息
*/
<template>
  <div class="goods-price-info">
    <div class="price">
      <span>￥</span>
      <span class="marketing">{{goodsInfo.marketingPrice}}</span>
      <span class="sale">￥{{goodsInfo.saleAmount}}</span>  
    </div>
    <div class="collage-info">{{ collageInfo }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 商品信息
    goodsInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    // 已拼信息
    collageInfo() {
      return this.goodsInfo.virtualSaleCount + '件已拼'
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.goods-price-info {
  position: relative;
  .flex-n();
  padding-top: 4px;
  color: white;
  .price {
    margin-bottom: 3px;
    margin-left: -2px;
    font-size: 15px;
    .marketing {
      font-size: 24px;
      font-family: PingFangSC-Medium;
      margin-right: 5px;
    }
    .sale {
      font-size: @font-size-tip;
      text-decoration: line-through;
    }
  }
  .collage-info {
    position: absolute;
    bottom: 9px;

    display: inline-block;
    height: 23px;
    line-height: 23px;
    .padding-h(12px);
    font-size: 11px;
    color: #fc2929;
    background: white;
    border-radius: 12px;
  }
}
</style>