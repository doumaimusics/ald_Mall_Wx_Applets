/**
* Created by xiejun on 2019/01/28.
* 
*/
<template>
  <div class="one-less-order-node" @tap="onTap">
    <img v-if="imageUrl" class="icon" :src="imageUrl" mode="aspectFill">
    <div v-else class="icon-default"></div>

    <div class="user-name">{{ userName }}</div>
    <div class="btn-add">
      <div class="content-box">
        <div class="title">差{{ lessCount }}人拼成</div>
        <div class="last-time">{{ lastTimeInfo }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import collageBasis from 'pcollagecomp/basis'
export default {
  name: '',
  data() {
    return {
      lastTimeInfo: ''
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
    imageUrl() {
      let url = ''
      if (this.orderData) {
        url = this.orderData.systemAvatars
        if (url) {
          if (url.endsWith(';')) url = url.substring(0, url.length - 1)
        } else {
          url = ''
        }
      }
      return url
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
    onTap() {
      this.$emit('tap', this.orderData)
    },
    clearCountdown() {
      if (this.countdownKey) {
        basis.clearCountdown(this.countdownKey)
        this.countdownKey = undefined
      }
    },
    updateLastTimeInfo() {
      this.clearCountdown()
      this.prefixInfo = '剩余 '

      let { expireHour, gmtStart, now: gmtCurrent } = this.orderData
      this.duration = collageBasis.calcExpireDuration({ expireHour, gmtStart, gmtCurrent })
      this.startCountdown()
    },
    timeInfoDesc(duration) {
      this.lastTimeInfo = this.prefixInfo + collageBasis.timeFormat(duration)
    },
    // 开始倒计时
    startCountdown() {
      this.timeInfoDesc(this.duration)
      this.countdownKey = basis.countdown(this.duration, {
        timer: data => this.timeInfoDesc(data.last),
        complete: () => this.$emit('timeout')
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.one-less-order-node {
  position: relative;
  .border-1px-bottom();

  .flex-hor-center();
  height: 80px;
  .padding-h(@padding-h);
  box-sizing: border-box;
  background: white;

  color: @color-txt;
  &:last-child {
    &::after {
      border: none;
    }
  }

  @size: 45px;
  .icon {
    margin-right: 10px;
    width: @size;
    height: @size;
    border-radius: 50%;
  }
  .icon-default {
    margin-right: 10px;
    .icon('icon_avatar_default_light', @size, @size);
    border-radius: 50%;
  }

  .user-name {
    margin-right: 10px;
    .flex-n();
    font-size: 15px;
    .show-one-line();
  }
  .btn-add {
    width: 117px;
    height: 40px;
    background: @color-main;
    border-radius: 2px;
    .content-box {
      position: relative;
      top: 50%;
      transform: translateY(-50%);

      text-align: center;
      .title {
        margin-bottom: 1px;
        font-size: 14px;
      }
      .last-time {
        font-size: 10px;
      }
    }
  }
}
</style>  