/**
* Created by xiejun on 2019/01/29.
* 距结束
*/
<template>
  <div class="time-count-down">
    <div v-if="lastTime.d" class="day-info">{{ lastTime.d }}天</div>
    <div class="node">{{ lastTime.h }}</div>
    <div class="sep">:</div>
    <div class="node">{{ lastTime.m }}</div>
    <div class="sep">:</div>
    <div class="node">{{ lastTime.s }}</div>
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
    duration: {
      type: Number,
      default: 0
    }
  },
  computed: {},
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
    duration() {
      this.lastTimeCountdown()
    }
  },
  methods: {
    lastTimeCountdown() {
      let d = Math.floor(this.duration / 1000)
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
.time-count-down {
  .flex-hor-center();
  font-family: PingFangSC-Medium;
  .day-info {
    margin-right: 5px;
    .flex-n();
    text-align: right;
    color: @color-txt;
    font-size: 14px;
  }
  .sep {
    font-size: 16px;
    margin: -4px 2px 0;
  }
  .node {
    width: 20px;
    height: 20px;
    line-height: 20px;
    background: @color-txt;
    border-radius: 2px;

    font-size: 13px;
    color: white;
    text-align: center;
  }
}
</style>