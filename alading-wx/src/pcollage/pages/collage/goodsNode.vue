/**
* Created by xiejun on 2018/12/06.
* 商品节点
*/
<template>
  <div class="collage-goods-node" @tap="onTap">
    <div class="goods-pic">
      <img :src="goodsData.goodsIcon" mode="aspectFill">
    </div>
    <div class="goods-info">
      <goods-name :goodsData="goodsData" type="collage-share"></goods-name>
      <div class="fill"></div>
      <div class="price">
        <div class="price-box">
          <span class="price-icon">¥</span>
          <span class="price-market">{{goodsData.marketingPrice}}</span>
        </div>
        <span v-if="isSecKill" class="sec-kill-tip">限时特价，即将恢复</span>
        <span v-else class="price-save">拼单省¥{{ savePrice }}</span>
      </div>
      <div class="times">{{goodsData.times}}人团</div>
    </div>
  </div>
</template>

<script>
import basis from 'pcollagecomp/basis'

import goodsName from 'pcollagecomp/goods/goodsName'
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
    savePrice() {
      let result = this.goodsData.saleAmount - this.goodsData.marketingPrice
      return result.toFixed(2)
    },
    // 是否为秒杀商品
    isSecKill() {
      return basis.isSecKill(this.goodsData)
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
.collage-goods-node {
  margin-bottom: 25px;
  .flex-hor-top();
  .padding-h(20px);

  .goods-pic {
    width: 110px;
    height: 110px;
    background: white;
  }

  .goods-info {
    .flex-n();
    .flex-ver-center();
    height: 110px;
    margin-left: 10px;
    text-align: left;
    .name {
      font-size: 15px;
      line-height: 21px;
      color: @color-txt;
      .show-two-line();
      height: 44px;
      width: 100%;
    }
    .fill {
      .flex-n();
      width: 100%;
    }

    .price {
      .flex-hor-center();
      width: 100%;
      color: @color-price;
      .price-box {
        .price-icon {
          font-family: PingFangSC-Medium;
          font-size: @font-size-label;
        }
        .price-market {
          margin-right: 10px;
          font-family: PingFangSC-Medium;
          font-size: 20px;
        }
      }
      .sec-kill-tip {
        color: @color-txt-2;
        font-size: @font-size-txt;
      }
      .price-save {
        color: @color-txt;
        font-size: @font-size-list;
      }
    }
    .times {
      margin-top: 10px;
      width: 100%;
      color: @color-txt-2;
      font-size: @font-size-list;
    }
  }
}
</style>