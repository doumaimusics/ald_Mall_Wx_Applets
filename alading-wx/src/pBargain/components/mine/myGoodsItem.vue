/**
* Created by huangyilu on 2018/11/21.
* 我的砍价 商品 item
*/
<template>
  <div class="mbgl-goods__item" @click="bindGoodsItemFn">
    <!-- 主图 -->
    <div class="mbgl__img">
      <img :src="goodsData.goodsIcon" alt>
    </div>
    <div class="mbgl__info">
      <!-- 商品名 -->
      <div class="mbgl-info__tit">{{ goodsData.goodsName }}</div>
      <!-- 价钱信息 -->
      <div class="mbgl-info__price">
        ￥
        <span>0</span>
        <span>￥{{ goodsData.saleAmount }}</span>
      </div>
      <!-- 砍价信息 -->
      <div class="mbgl-info__need">
        已砍
        <span>{{ goodsData.helpAmount }}</span> 元，还需
        <span>{{ goodsData.targetNum - goodsData.helpNum }}人</span> 助力砍价
      </div>
    </div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'
import maidian from 'utils/maidian'

export default {
  name: '',
  data () {
    return {}
  },
  props: {
    goodsData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {
    bindGoodsItemFn () {
      maidian.click('kanjia_my_list', this.goodsData.goosName, this.goodsData.freeOrderId)
      navigate.push({ url: '/pBargain/pages/bargainDetail?freeOrderId=' + this.goodsData.freeOrderId + '&recommendId=' + this.goodsData.userId })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.mbgl-goods__item {
  // margin: 20/ @px 0 0 0;
  height: 300 / @px;
  display: flex;
  background-color: #ffffff;
  .border-bottom();
  .mbgl__img {
    margin: 20 / @px;
    img {
      width: 260 / @px;
      height: 260 / @px;
    }
  }
  .mbgl__info {
    margin: 40 / @px 25 / @px 40 / @px 10 / @px;
    .flex-n();
    .mbgl-info__tit {
      .show-line(2);
      color: @color-txt-666;
      height: 80 / @px;
      line-height: 40 / @px;
    }
    .mbgl-info__need {
      margin-top: 10 / @px;
      margin-bottom: 10 / @px;
      font-weight: 600;
      span {
        color: @color-txt-price;
      }
    }
    .mbgl-info__price {
      margin: 25 / @px 0;
      font-size: 30 / @px;
      color: @color-txt-price;
      font-weight: 600;
      :first-child {
        font-size: @font-size-price;
      }
      :last-child {
        .line-through();
        font-weight: 400;
        color: @color-txt-999;
        font-size: 26 / @px;
      }
    }
    .mbgl-info__btn {
      width: 294 / @px;
      height: 70 / @px;
      line-height: 70 / @px;
      text-align: center;
      background: linear-gradient(128deg, rgba(255, 233, 121, 1) 0%, rgba(255, 201, 76, 1) 100%);
      border-radius: 35 / @px;
      color: #975f00;
      font-size: 30 / @px;
      font-weight: 600;
    }
  }
}
</style>
