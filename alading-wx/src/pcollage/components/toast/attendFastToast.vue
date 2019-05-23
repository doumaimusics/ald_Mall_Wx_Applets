/**
* Created by xiejun on 2019/01/30.
* 立即参加拼团
*/
<template>
  <div class="attend-fast-toast">
    <div class="title">参与{{ userName }}的拼团</div>
    <div class="timeout">{{ timeoutInfo }}</div>
    <user-list :userInfoList="userInfoList"/>
    <div class="btn" @tap="onTap">立即参加拼团</div>
    <div class="btn-close" @tap="onCloseTap"></div>
  </div>
</template>

<script>
import userList from 'pcollagecomp/common/userList'

import basis from 'utils/basis'
import collageBasis from 'pcollagecomp/basis'
export default {
  name: '',
  data() {
    return {
      timeoutInfo: '仅剩1个名额，29:26后将自动关闭'
    }
  },
  props: {
    orderData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    lessCount() {
      let count = 1
      if (this.orderData) {
        count = this.orderData.times - this.orderData.succCount
      }
      return count
    },
    userName() {
      let name = ''
      if (this.orderData) {
        name = this.orderData.systemUsers
      }
      return name
    },
    userInfoList() {
      let { times, thirdInfoList: orderUserInfoList } = this.orderData
      let list = collageBasis.transUserInfoList({ times, orderUserInfoList })
      return list
    }
  },
  created() {
    this.updateLastTimeInfo()
  },
  mounted() {},
  onShow() {
    this.updateLastTimeInfo()
  },
  onHide() {
    this.clearCountdown()
  },
  onUnload() {
    this.clearCountdown()
  },
  watch: {},
  methods: {
    updateLastTimeInfo() {
      this.clearCountdown()

      let { expireHour, gmtStart, now: gmtCurrent, usedTime } = this.orderData
      let duration = collageBasis.calcExpireDuration({ expireHour, gmtStart, gmtCurrent })
      duration = duration - Math.floor(usedTime / 1000)
      if (duration < 0) duration = 10
      this.duration = duration
      this.startCountdown()
    },
    startCountdown() {
      this.timeoutKey = basis.countdown(this.duration, {
        timer: data => this.updateTimeoutInfo(data.last),
        complete: () => this.$emit('timeout')
      })
    },
    updateTimeoutInfo(count) {
      this.timeoutInfo = '仅剩' + this.lessCount + '个名额，' + collageBasis.timeFormat(count) + '后将自动关闭'
    },
    clearCountdown() {
      basis.clearCountdown(this.timeoutKey)
    },
    onTap() {
      // this.clearCountdown()
      this.$emit('tap')
    },
    onCloseTap() {
      this.clearCountdown()
      this.$emit('close')
    }
  },
  components: { userList }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@import '~pcollagecomp/common/userList.less';
.attend-fast-toast {
  position: fixed;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;

  .icon('image_toast_rule', 300px, auto);
  background-size: 100%;

  padding-bottom: 20px;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;

  color: @color-txt;

  .title {
    margin-top: 20px;
    font-family: PingFangSC-Medium;
    font-size: 15px;
  }
  .timeout {
    margin-top: 10px;
    font-size: 14px;
    color: @color-txt-2;
  }

  /deep/.collage-user-list {
    margin-top: 20px;
    margin-bottom: 10px;
    .padding-h(23px);
    .list-node {
      .user-list-node(14px, 10px, 30px, 6);
    }
  }

  .btn {
    margin: auto;

    width: 226px;
    height: 44px;
    line-height: 44px;
    background: @color-btn;
    border-radius: 22px;

    font-family: PingFangSC-Medium;
    font-size: 15px;
    text-align: center;
  }

  .btn-close {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>