/**
* Created by xiejun on 2019/01/25.
*/
<template>
  <div class="today-buy-node">
    <div class="head">
      <div class="title">今日必拼</div>
      <div class="page-info">{{ pageInfo }}</div>
    </div>
    <div class="goods-list">
      <today-buy-goods
      v-for="(data, index) in goodsList"
      @tap="onGoodsTap"
      :goodsData="data"
      :key="index"/>
    </div>
  </div>
</template>

<script>
import todayBuyGoods from './todayBuyGoods'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    pageInfo: {
      type: String,
      default: ''
    },
    goodsList: {
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
    onGoodsTap(goodsData) {
      this.$emit('tap', goodsData)
    }
  },
  components: { todayBuyGoods }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.today-buy-node {
  .flex-ver-center();
  margin: 4px 10px 10px;
  padding: 10px;
  height: 240px;
  box-sizing: border-box;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .head {
    .flex-hor-center();
    color: @color-txt;
    width: 100%;
    height: 19px;
    .title {
      .flex-n();
      font-size: 15px;
      font-family: PingFangSC-Medium;
    }
    .page-info {
      height: 19px;
      line-height: 19px;
      background: #f3f3f3;
      border-radius: 10px;

      .padding-h(12px);

      font-size: 10px;
      text-align: center;
    }
  }
  .goods-list {
    margin-top: 10px;
    .flex-n();
    .flex-hor-center();
  }
}
</style>