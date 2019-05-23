/**
* Created by xiejun on 2018/10/16.
* goods inforamation flow 商品信息流
*/
<template>
  <div class="ala-goods-information-flow">
    <ala-goods-info-node 
    v-for="goodsData in goodsInfoFlow"
    @goodsClick="onGoodsClick"
    :goodsInfoData="goodsData"
    :key="goodsData.id">
    </ala-goods-info-node>
  </div>
</template>

<script>
import alaGoodsInfoNode from 'components/goodsInfo/goodsInfoNode'

import { mapMutations } from 'vuex'
import lcUtil from 'utils/lcUtil'
import maidian from 'utils/maidian'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    goodsInfoFlow: {
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
    ...mapMutations(['setLocationCode']),
    onGoodsClick() {
      maidian.index(maidian.spm.home_product)
      // 添加来源
      this.setLocationCode(lcUtil.homes)
    }
  },
  components: { alaGoodsInfoNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-goods-information-flow {
  padding-top: 2px;
  .ala-goods-info-node {
    .flex-hor-top();
    height: 150px;
    padding: 10px @padding-h 10px 10px;
    box-sizing: border-box;
    margin-top: 8px;
    background: white;

    .goods-info__icon {
      width: 130px;
      height: 130px;
      img {
        border-radius: 4px;
      }
    }
    .goods-info__detail {
      .flex-n();
      margin-left: 20px;
      .goods-info__name {
        // height: 42px;
        .show-two-line();
        font-size: 15px;
        color: @color-txt;
      }
      .goods-info__tag-list {
        margin-top: 15px;
        font-size: 0;
        height: 20px;
        overflow: hidden;
        .tag-list-node {
          display: inline-block;
          height: 20px;
          line-height: 20px;
          background: #ffe7d9;
          border-radius: 10px;
          .padding-h(7px);

          font-size: @font-size-tip;
          color: #ff3827;

          margin-right: 10px;
        }
      }
      .goods-info__price {
        margin-top: 20px;
        font-size: 19px;
        font-family: PingFangSC-Medium;
        color: @color-price;

        .price-icon {
          font-size: 14px;
          margin-left: 2px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>