/**
* Created by xiejun on 2018/11/23.
* 商品列表项
*/
<template>
  <div class="collage-list-goods-node" @tap="onTap">
    <div class="goods-pic">
      <img :src="goodsData.goodsIcon" mode="aspectFill">
    </div>
    <div class="goods-info">
      <goods-name :goodsData="goodsData"></goods-name>
      <div class="fill"></div>
      <div class="goods-info__line">
        <div class="price">
          <span class="price-icon">¥</span>
          <span>{{goodsData.marketingPrice}}</span>
        </div>
        <div class="btn-buy">立即拼团</div>
      </div>
      <div class="goods-info__line">
        <div class="price-sale">单买价：¥{{goodsData.saleAmount}}</div>
        <div class="more">{{infoMore}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import goodsName from './goodsName'
import basis from 'utils/basis'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    goodsData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    infoMore() {
      let saleCount = basis.parseCount(this.goodsData.virtualSaleCount)
      let info = `${this.goodsData.times}人团 | 已拼${saleCount}单`
      return info
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      this.$emit('tap', this.goodsData)
    }
  },
  components: { goodsName }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-list-goods-node {
  .flex-hor-top();
  .padding-h(10px);

  .goods-pic {
    width: 120px;
    height: 120px;
    background: white;
  }

  .goods-info {
    .flex-n();
    .flex-ver-center();
    height: 120px;
    margin-left: 10px;
    .goods-info__name {
      position: relative;
      font-family: PingFangSC-Medium;
      font-size: @font-size-list;
      line-height: 20px;
      height: 42px;
      color: @color-txt;
      .show-two-line();
      width: 100%;
      // margin-bottom: 32px;
      .name-tag {
        display: inline-block;
        height: 17px;
        line-height: 17px;
        .padding-h(5px);
        font-size: 10px;
        font-family: PingFangSC-Regular;
        color: @color-txt;
        vertical-align: text-top;

        background: @color-main;
        border-radius: 2px;
      }
    }
    .fill {
      .flex-n();
    }
    .goods-info__line {
      .flex-hor-center();
      margin-bottom: 6px;
      width: 100%;
      .price {
        font-family: PingFangSC-Medium;
        color: @color-price;
        font-size: 20px;
        .flex-n();
        .price-icon {
          font-size: @font-size-label;
        }
      }
      .btn-buy {
        margin-right: 5px;

        width: 90px;
        height: 28px;
        line-height: 28px;

        background: #e40404;
        border-radius: 4px;

        font-size: 15px;
        color: white;
        text-align: center;
      }
      .price-sale,
      .more {
        font-size: 11px;
        color: @color-txt-2;
      }
      .price-sale {
        .flex-n();
      }
    }
  }
}
</style>