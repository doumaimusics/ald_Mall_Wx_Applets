/**
* Created by xiejun on 2018/10/16.
* 两行商品信息流
*/
<template>
  <div class="ala-goods-info-list">
    <ala-goods-info-node
    v-for="goodsData in goodsInfoListData"
    @goodsClick="onGoodsClick"
    :goodsInfoData="goodsData"
    :key="goodsData.id">
    </ala-goods-info-node>
  </div>
</template>

<script>
import alaGoodsInfoNode from './goodsInfoNode'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 商品信息数据
    goodsInfoListData: {
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
    onGoodsClick() {
      this.$emit('listGoodsClick')
    }
  },
  components: { alaGoodsInfoNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@node-width: 175px;
.ala-goods-info-list {
  .flex-hor-center();
  flex-wrap: wrap;
  padding-left: 8.5px;
  padding-bottom: 8.5px;
  .ala-goods-info-node {
    width: @node-width;
    height: 285px;
    margin-top: 8px;
    margin-right: 8px;

    border-radius: 5px;
    background: white;
    overflow: hidden;
    &:nth-child(even) {
      margin-right: 0;
    }
    .goods-info__icon {
      width: @node-width;
      height: @node-width;
    }
    .goods-info__detail {
      .padding-h(10px);
      margin-top: 10px;
      .goods-info__name {
        // height: 34px;
        .show-two-line();
        font-size: @font-size-tip;
        color: @color-txt;
      }
      .goods-info__tag-list {
        margin-top: 15px;
        font-size: 0;
        height: 17px;
        overflow: hidden;
        .tag-list-node {
          display: inline-block;
          height: 17px;
          line-height: 17px;
          background: #ffe7d9;
          border-radius: 10px;
          .padding-h(6px);

          font-size: 10px;
          color: #ff3827;

          margin-right: 5px;
        }
      }
      .goods-info__price {
        margin-top: 8px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: @color-price;
        .price-icon {
          margin-left: 2px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>