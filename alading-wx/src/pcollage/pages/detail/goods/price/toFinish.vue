/**
* Created by xiejun on 2019/01/29.
* 距结束
*/
<template>
  <div class="to-finish">
    <div class="title">距结束</div>
    <div class="count-down">
      <div v-if="lastTime.d" class="day-info">{{ lastTime.d }}天</div>
      <div class="node">{{ lastTime.h }}</div>
      <div class="sep">:</div>
      <div class="node">{{ lastTime.m }}</div>
      <div class="sep">:</div>
      <div class="node">{{ lastTime.s }}</div>
    </div>
  </div>
</template>

<script>
import timeUtil from 'utils/timeUtil'
import basis from 'utils/basis'
export default {
  name: '',
  data() {
    return {
      lastTime: { d: 0, h: 0, m: 0, s: 0 }
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
    dayInfo() {
      return '2天'
    }
  },
  created() {
    this.lastTimeCountdown()
  },
  mounted() {},
  onHide() {
    basis.clearCountdown(this.lastTimeKey)
  },
  onUnload() {
    basis.clearCountdown(this.lastTimeKey)
  },
  watch: {
    goodsDetail() {
      this.lastTimeCountdown()
    }
  },
  methods: {
    lastTimeCountdown() {
      let goodsInfo = {}
      if (this.goodsDetail) {
        goodsInfo = this.goodsDetail.goodsInfo
      }
      let d = (goodsInfo.gmtEnd - goodsInfo.now) / 1000
      if (d < 0) d = 10
      basis.clearCountdown(this.lastTimeKey)
      this.lastTimeKey = basis.countdown(d, {
        timer: data => this.updateLastTime(data),
        complete: () => this.$emit('timeout')
      })
    },
    updateLastTime(data) {
      this.lastTime = timeUtil.showPad(data.last)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.to-finish {
  padding-top: 8px;
  font-size: 15px;
  font-family: PingFangSC-Medium;
  color: @color-txt;
  .title {
    text-align: right;
  }
  .count-down {
    margin-top: 5px;
    .flex-hor-center();
    .day-info {
      margin-right: 5px;
      .flex-n();
      text-align: right;
    }
    .sep {
      font-size: 16px;
      margin: -4px 2px 0;
    }
    .node {
      width: 24px;
      height: 24px;
      line-height: 24px;
      background: @color-txt;
      border-radius: 2px;

      font-size: 14px;
      color: white;
      text-align: center;
    }
  }
}
</style>