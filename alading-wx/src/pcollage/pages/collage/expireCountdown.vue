/**
* Created by xiejun on 2018/12/04.
* 拼团倒计时
*/
<template>
  <div class="collage-expire-countdown">
    <block v-if="formatTime.length">
      <div class="node">{{formatTime[0]}}</div>
      <div class="sep">:</div>
      <div class="node">{{formatTime[1]}}</div>
      <div class="sep">:</div>
      <div class="node second">
        <span>{{formatTime[2] + '.'}}</span>
        <span class="ms">{{formatTime[3]}}</span>
      </div>
    </block>
  </div>
</template>

<script>
import basis from 'utils/basis'
import collageBasis from 'pcollagecomp/basis'
export default {
  name: '',
  data() {
    return {
      formatTime: []
    }
  },
  props: {
    duration: {
      type: Number,
      default: 0
    }
  },
  computed: {},
  onShow() {
    this.showCountDown()
  },
  onHide() {
    this.clearCountdown()
  },
  created() {},
  mounted() {
    this.showCountDown()
  },
  watch: {
    duration(val, oldVal) {
      this.showCountDown()
    }
  },
  methods: {
    clearCountdown() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = undefined
      }
    },
    showCountDown() {
      this.clearCountdown()
      if (!this.duration) {
        this.formatTime = collageBasis.calcTime(0)
        return
      }
      let last = this.duration
      let current = basis.getTimer()
      let circle = () => {
        this.timeoutId = setTimeout(() => {
          if (last <= 0) {
            this.$emit('timeout')
            return
          }

          let temp = basis.getTimer()
          let d = temp - current
          current = temp
          last = last - d
          if (last < 0) last = 0
          this.formatTime = collageBasis.calcTime(last)
          circle()
        }, 36)
      }
      circle()
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@n-height: 27px;
@n-color: rgb(51, 51, 51);
.collage-expire-countdown {
  margin-bottom: 10px;
  .flex-hor-center();
  justify-content: center;
  height: @n-height;
  .node {
    background: @n-color;
    width: @n-height;
    height: @n-height;
    line-height: @n-height;
    border-radius: 2px;

    font-size: 17px;
    font-family: PingFangSC-Medium;
    color: white;

    &.second {
      width: 55px;
      padding-left: 8px; 
      box-sizing: border-box;
      text-align: left;
      .ms {
        color: @color-warn;
        font-size: @font-size-tip;
      }
    }
  }
  .sep {
    width: 11px;
    height: @n-height;
    color: @n-color;
  }
}
</style>