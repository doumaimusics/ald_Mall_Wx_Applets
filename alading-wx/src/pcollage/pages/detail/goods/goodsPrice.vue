/**
* Created by xiejun on 2019/01/29.
* 商品价格显示，包括标准及秒杀、狂欢价格显示
*/
<template>
  <div :class=" {'goods-price':true, 'activity': isActivity } ">
    <!-- 狂欢 -->
    <div v-if="isCarnival" :class="{ 'carnival':true, 'default-img':!carnivalImgUrl }">
      <img class="bg-img" v-if="carnivalImgUrl" :src="carnivalImgUrl">
      <goods-price-info :goodsInfo="goodsInfo"></goods-price-info>
      <div class="time-info">{{ timeInfo }}</div>
    </div>
    <!-- 秒杀 -->
    <div v-else-if="isSecKill" class="sec-kill">
      <goods-price-info :goodsInfo="goodsInfo"></goods-price-info>
      <to-finish @timeout="onTimeout" :goodsDetail="goodsDetail"></to-finish>
    </div>
    <!-- 标准 -->
    <div v-else class="standard">
      <span>￥</span>
      <span class="marketing">{{goodsInfo.marketingPrice}}</span>
      <span class="sale">￥{{goodsInfo.saleAmount}}</span>
    </div>
  </div>
</template>

<script>
import goodsPriceInfo from './price/goodsPriceInfo'
import toFinish from './price/toFinish'

import timeUtil from 'utils/timeUtil'
import basis from 'utils/basis'
import collageBasis from 'pcollagecomp/basis'
export default {
  name: '',
  data() {
    return {
      timeInfo: ''
    }
  },
  props: {
    goodsDetail: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    // 是否为秒杀
    isSecKill() {
      return collageBasis.isSecKill(this.goodsInfo)
    },
    // 是否为狂欢
    isCarnival() {
      return collageBasis.isCarnival(this.goodsInfo)
    },
    carnivalImgUrl() {
      let url = this.goodsInfo.airUrl
      if (!url) url = ''
      return url
    },
    // 活动
    isActivity() {
      return this.isSecKill || this.isCarnival
    },
    goodsInfo() {
      if (!this.goodsDetail) return {}
      let goodsInfo = this.goodsDetail.goodsInfo
      if (!goodsInfo) goodsInfo = {}
      return goodsInfo
    }
  },
  created() {
    this.startCountdown()
  },
  mounted() {},
  onHide() {
    basis.clearCountdown(this.timeInfoKey)
  },
  onUnload() {
    basis.clearCountdown(this.timeInfoKey)
  },
  watch: {
    goodsDetail() {
      this.startCountdown()
    }
  },
  methods: {
    onTimeout() {
      this.$emit('timeout')
    },
    startCountdown() {
      if (this.isCarnival) {
        this.timeInfoCountdown()
      }
    },
    timeInfoCountdown() {
      let d = (this.goodsInfo.gmtEnd - this.goodsInfo.now) / 1000
      if (d < 0) d = 10
      basis.clearCountdown(this.timeInfoKey)
      this.timeInfoKey = basis.countdown(d, {
        timer: data => this.updateTimeInfo(data),
        complete: () => this.onTimeout()
      })
    },
    updateTimeInfo(data) {
      this.timeInfo = '距结束剩' + timeUtil.showSimple(data.last)
    }
  },
  components: { goodsPriceInfo, toFinish }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@width: 375px;
@height: 68px;
.goods-price {
  background: white;

  &.activity {
    padding-bottom: 15px;
  }
  .sec-kill {
    display: flex;

    .icon('icon_goods_activity', @width, @height);
    .padding-h(@padding-h);
    box-sizing: border-box;
  }
  .carnival {
    position: relative;
    display: flex;
    width: 100%;
    height: @height;
    padding-left: @padding-h;
    box-sizing: border-box;

    &.default-img {
      .icon('icon_goods_activity_1', @width, @height);
    }
    .bg-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .time-info {
      position: relative;
      width: 144px;
      padding-top: 40px;

      color: @color-txt;
      font-size: 12px;
      text-align: center;
    }
  }
  .standard {
    .padding-h(@padding-h);
    padding-top: 15px;
    padding-bottom: 5px;
    color: @color-price;
    font-size: 17px;
    .marketing {
      font-size: 24px;
      margin-right: 5px;
    }
    .sale {
      color: @color-txt-1;
      font-size: @font-size-txt;
      text-decoration: line-through;
    }
  }
}
</style>