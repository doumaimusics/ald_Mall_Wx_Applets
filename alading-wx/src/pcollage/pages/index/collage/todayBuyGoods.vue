/**
* Created by xiejun on 2019/01/25.
* goods
*/
<template>
  <div class="today-buy-goods" @tap="onTap">
    <div class="pic">
      <img :src="goodsData.goodsIcon" mode="aspectFill">
    </div>
    <div class="info">
      <goods-name :goodsData="goodsData" type="today-buy"></goods-name>
      <div class="fill"></div>
      <div class="price">
        <span class="price-icon">¥</span>
        <span>{{goodsData.marketingPrice}}</span>
      </div>
      <div class="more">{{infoMore}}</div>
    </div>
  </div>
</template>

<script>
import goodsName from 'pcollagecomp/goods/goodsName'

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

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.today-buy-goods {
  .flex-ver-center();
  width: 107px;
  height: 100%;
  &:nth-child(2) {
    margin: 0 7px;
  }
  .pic {
    width: 107px;
    height: 107px;
    background: white;
    img {
      border-radius: 4px;
    }
  }

  .info {
    .flex-n();
    .flex-ver-center();
    height: 64px;
    margin-top: 10px;
    width: 100%;
    .name {
      position: relative;
      font-size: @font-size-tip;
      line-height: 17px;
      height: 34px;

      font-family: PingFangSC-Regular;
      color: @color-txt;
      .show-two-line();
      width: 100%;
      .name-tag {
        display: inline-block;
        height: 13px;
        line-height: 13px;
        .padding-h(3px);

        font-size: 8px;
        font-family: PingFangSC-Regular;
        vertical-align: text-top;

        background: @color-main;
        border-radius: 2px;
      }
    }
    .fill {
      .flex-n();
    }
    .price {
      width: 100%;
      font-family: PingFangSC-Medium;
      color: @color-price;
      font-size: @font-size-txt;
      .price-icon {
        font-size: 10px;
      }
    }
    .more {
      margin-top: 3px;
      width: 100%;
      font-size: 10px;
      color: @color-txt-2;
    }
  }
}
</style>