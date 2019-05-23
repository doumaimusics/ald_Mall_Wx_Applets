/**
* Created by huangyilu on 2018/10/22.
* 订单 中间商品展示 模块
*/
<template>
  <div class="order-item-view">

    <div class="order-item__content" @click="onClick">
      <img class="item__img" :src="goodsInfoData.goodsIcon" mode="aspectFill"/>
      <div class="item__body-right">
        <!-- 商品名 -->
        <div class="item__goods-msg">
          <div class="item__goods-name show_two_line">{{ goodsInfoData.goodsName }}</div>
          <div class="item__goods-price">{{ saleAmount }}</div>
        </div>
        <div class="item__fill"></div>
        <!-- 规格 -->
        <div class="item__order-msg">
          <div class="item__order-select">规格：{{ goodsInfoData.goodsPriceName }}</div>
          <div class="item__order-num">×{{ goodsInfoData.count }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import basis from 'utils/basis'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 商品信息数据
    goodsInfoData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    // 售价
    saleAmount() {
      return basis.moneyPrefix(this.goodsInfoData.saleAmount)
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClick() {
      this.$emit('clickGoods', { goodsId: this.goodsInfoData.goodsId })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

.order-item__content {
  display: flex;
  padding: 7.5px 15px;
  background-color: #fafafa;
  margin-bottom: 5px;
  .item__img {
    height: 1.4rem;
    width: 1.4rem;
    border: 1px solid @color-border;
    box-sizing: border-box;
  }
  .item__body-right {
    flex: 1;
    margin-left: 15px;

    .flex-ver-center();
    .item__goods-msg {
      display: flex;
      justify-content: space-between;
      width: 100%;
      color: @color-txt;
      padding-bottom: 4px;
      .item__goods-name {
        width: 180px;
        font-size: @font-size-tip;
      }
      .item__goods-price {
        font-size: @font-size-list;
      }
    }

    .item__fill {
      .flex-n();
    }

    .item__order-msg {
      margin-top: 13px;
      .flex-hor-center();
      width: 100%;

      .item__order-select {
        font-size: 0.24rem;
        color: #bebebe;
        .flex-n();
        .show-line();
      }
      .item__order-num {
        margin-left: 10px;
        font-size: 0.3rem;
        color: #000;
      }
    }
  }
}
</style>
