/**
* Created by huangyilu on 2018/11/21.
* tabs 标签页 导航
*/
<template>
  <div class="ala-share-view">
    <div class="share-bg">
      <div class="share-tit">
        再邀请
        <span>{{ shareData.inviteTargetNum }} 位</span>好友即可免费领取
      </div>
      <div class="hbdv-countdown">
        还剩 {{ timer.d }}
        <span>{{ timer.h }}</span> :
        <span>{{ timer.m }}</span> :
        <span>{{ timer.s }}</span>
      </div>
      <button class="share-icon" open-type="share">
        <div class="icon"></div>
        <div>微信朋友</div>
      </button>
    </div>
  </div>
</template>

<script>
import basis from 'utils/basis'

export default {
  name: '',
  data () {
    return {
      // 倒计时处理
      countTimeKey: '',
      timer: {},
      endTime: ''
    }
  },
  props: {
    shareData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {},
  created () { },
  mounted () {
    this.formatTimer()
    console.log(' sharedata = ', this.shareData)
  },
  onHide () {
    // 清除 计时器
    basis.clearCountdown(this.countTimeKey)
  },
  onUnload () {
    // 清除 计时器
    basis.clearCountdown(this.countTimeKey)
  },
  watch: {},
  methods: {
    // 倒计时
    formatTimer () {
      let duration = parseInt((this.shareData.endTime - this.shareData.nowTime) / 1000)
      let key = basis.countdown(duration, {
        timer: data => {
          this.timer = basis.formatCountTime(data.last)
          //   console.log('formatTimer == ', this.timer)
        },
        complete: () => {
          // 倒计时结束
        }
      })
      this.countTimeKey = key
      console.log('countTimeKey == ', this.countTimeKey)
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.ala-share-view {
  .share-bg {
    position: fixed;
    bottom: 0;
    height: 564 / @px;
    width: 100%;
    background-color: #ffffff;
    .share-tit {
      font-size: 34 / @px;
      text-align: center;
      padding: 70 / @px 0;
      span {
        color: #ff513d;
      }
    }
    .hbdv-countdown {
      color: #ff513d;
      font-size: 15px;
      text-align: center;
      span {
        width: 28px;
        height: 26px;
        line-height: 26px;
        display: inline-block;
        margin: 0 5px;
        background: linear-gradient(121deg, rgba(255, 120, 67, 1) 0%, rgba(255, 60, 57, 1) 100%);
        border-radius: 2px;
        color: #ffffff;
      }
    }
    .share-icon {
      align-items: center;
      text-align: center;
      margin: 60 / @px 0;
      .icon {
        margin: auto;
        .icon('wechat', 100 / @px, 100 / @px);
      }
      border-style: none;
      background-color: #fff;
      color: @color-txt-666;
      font-size: 30 / @px;
    }
  }
}
</style>
