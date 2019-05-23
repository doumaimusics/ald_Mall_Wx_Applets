/**
* Created by xiejun on 2019/03/21.
* 商品价信息
*/
<template>
  <div class="info-price-goods">
    <div v-if="hasActivity" class="activity-price">
      <div class="price-box">
        <span class="uint">￥</span>
        <span class="price">{{ price }}</span>
        <span class="price-history">￥{{ priceHistory }}</span>
      </div>
      <div class="time-info">
        <div class="duration-txt">{{ durationTxt }}</div>
        <time-count-down @timeout="onTimeout" :duration="duration"></time-count-down>
      </div>
    </div>
    <div v-else class="normal-price">
      <span class="unit">￥</span>
      <span class="price">{{ price }}</span>
      <span class="price-history">￥{{ priceHistory }}</span>
    </div>
  </div>
</template>

<script>
import timeCountDown from './timeCountDown'
export default {
  name: '',
  components: { timeCountDown },
  data() {
    return {}
  },
  props: {
    priceData: {
      type: Object,
      default: function() {
        return null
      }
    }
  },
  computed: {
    hasData() {
      return this.priceData
    },
    hasActivity() {
      if (!this.hasData) return false
      return this.priceData.hasActivity
    },
    price() {
      if (!this.hasData) return 0
      return this.priceData.price
    },
    priceHistory() {
      if (!this.hasData) return 0
      return this.priceData.priceHistory
    },
    durationTxt() {
      if (!this.hasData) return ''
      return this.priceData.durationTxt
    },
    duration() {
      if (!this.hasData) return 0
      return this.priceData.duration
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTimeout() {
      this.$emit('timeout')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@width: 375px;
@height: 51px;
.info-price-goods {
  background: white;
  .activity-price {
    .icon('icon_activity', @width, @height);
    .flex-hor-center();
    .price-box {
      .flex-n();
      padding-left: 8px;
      color: white;
      .uint {
        font-family: PingFangSC-Medium;
        font-size: 18px;
      }
      .price {
        font-size: 25px;
        font-family: PingFangSC-Medium;
      }
      .price-history {
        margin-left: 13px;
        opacity: 0.6;
        font-size: 14px;
        text-decoration: line-through;
      }
    }
    .time-info {
      margin-right: 10px;
      text-align: center;
      font-size: 0;
      .duration-txt {
        margin-bottom: 3px;
        color: @color-warn;
        font-size: 13px;
      }
    }
  }
  .normal-price {
    padding-top: 16px;
    .padding-h(@padding-h);
    color: @color-price;
    .uint {
      font-size: 14px;
      font-family: PingFangSC-Medium;
    }
    .price {
      font-size: 21px;
      font-family: PingFangSC-Medium;
    }
    .price-history {
      font-size: 13px;
      margin-left: 8px;
      color: @color-txt-2;
      text-decoration: line-through;
    }
  }
}
</style>