/**
* Created by xiejun on 2018/12/03.
* 详情-订单-头
*/
<template>
  <div v-if="orderDetailData" class="detail-order-head">
    <div class="head-info">
      <div class="status-msg">{{statusInfo.statusMsg}}</div>
      <div v-if="infoDesc" class="info-desc">{{infoDesc}}</div>
    </div>
    <div :class="iconClass"></div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import collageBasis from 'pcollagecomp/basis'
export default {
  name: '',
  data() {
    return {
      infoDesc: ''
    }
  },
  props: {
    statusInfo: {
      type: Object,
      default: null
    },
    orderDetailData: {
      type: Object,
      default: null
    }
  },
  computed: {
    // 订单详情头部图标
    iconClass() {
      return 'icon-' + this.statusInfo.desc
    },
    info() {
      if (!this.orderDetailData) return ''
      return this.orderData.orderStatusRemark
    },
    // 订单详情
    orderData() {
      if (!this.orderDetailData) return null
      return this.orderDetailData.orderDetail
    }
  },
  created() {
    this.updateInfoDesc()
  },
  mounted() {},
  onShow() {
    this.updateInfoDesc()
  },
  onHide() {
    this.clearCountdown()
  },
  onUnload() {
    this.clearCountdown()
  },
  watch: {},
  methods: {
    clearCountdown() {
      if (this.countdownKey) {
        basis.clearCountdown(this.countdownKey)
        this.countdownKey = undefined
      }
    },
    updateInfoDesc() {
      this.clearCountdown()
      this.prefixInfo = '剩余 '
      this.tailInfo = ''
      if (this.statusInfo.isNew) {
        let gmtPayEnd = this.orderData.gmtPayEnd
        let gmtCurrent = this.orderDetailData.gmtCurrent
        this.duration = collageBasis.calcExpirePayDuration({ gmtPayEnd, gmtCurrent })
        this.startCountdown()
      } else if (this.statusInfo.isToShare || this.statusInfo.isDealing) {
        this.tailInfo = ' 让小伙伴们都来拼单吧'
        this.duration = collageBasis.calcExpireDuration(this.orderDetailData)
        this.startCountdown()
      } else {
        if (this.statusInfo.statusRemark) this.infoDesc = this.statusInfo.statusRemark
      }
    },
    infoDescTimer(duration) {
      this.infoDesc = this.prefixInfo + collageBasis.timeFormat(duration) + this.tailInfo
    },
    // 开始倒计时
    startCountdown() {
      this.infoDescTimer(this.duration)
      this.countdownKey = basis.countdown(this.duration, {
        timer: data => this.infoDescTimer(data.last),
        complete: () => this.$emit('timeout')
      })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.detail-order-head {
  .flex-hor-center();
  width: 100%;
  height: 100px;
  background-image: linear-gradient(90deg, #ffce3e 0%, #feb600 100%);
  margin-bottom: 10px;

  // 头部信息
  .head-info {
    padding-left: @padding-h;
    color: white;
    .flex-n();
    .status-msg {
      font-size: @font-size-btn;
    }
    .info-desc {
      margin-top: 3px;
      font-size: 15px;
    }
  }

  // 待支付
  .icon-new {
    margin-right: 44.5px;
    .icon('wait_pay_state_pic', 48.5px, 76px);
  }
  // 待分享
  .icon-to-share {
    margin-right: 15px;
    .icon('icon_to_pay', 54px, 54px);
  }
  // 待发货
  .icon-paid {
    margin-right: 15px;
    .icon('wait_state_pic', 110px, 92.5px);
  }
  // 待收货
  .icon-delivered {
    margin-right: 15px;
    .icon('wait_state_pic', 110px, 92.5px);
  }
  // 售后
  .icon-wait-refund {
    margin-right: 25px;
    .icon('aftersale_wait_state', 92.5px, 92.5px);
  }
  // 订单关闭
  .icon-closed {
    margin-right: 25px;
    .icon('close_state_pic', 92.5px, 92.5px);
  }
  // 订单完成
  .icon-finished {
    margin-right: 25px;
    .icon('finish_state_pic', 92.5px, 74px);
  }
}
</style>