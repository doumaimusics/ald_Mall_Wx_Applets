/**
* Created by xiejun on 2018/11/4.
* 订单详情——头部
*/
<template>
  <div class="ala-order-detail-head">
    <div class="ala-order-detail-head__info">
      <div class="order-status-msg">{{orderData.orderStatusMsg}}</div>
      <div v-if="infoDesc" class="info-desc">{{infoDesc}}</div>
    </div>
    <div :class="orderDetailIconClass"></div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import orderStatus from 'utils/orderStatus'
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
      default: function() {
        return {}
      }
    },
    orderData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    // 订单详情头部图标
    orderDetailIconClass() {
      return 'order-detail-icon-' + this.statusInfo.desc
    },
    info() {
      return this.orderData.orderStatusRemark
    }
  },
  created() {},
  mounted() {
    this.updateInfoDesc()
  },
  onUnload() {
    this.clearCountdown()
  },
  watch: {
    orderData() {
      this.updateInfoDesc()
    },
    info() {
      this.updateInfoDesc()
    }
  },
  methods: {
    clearCountdown() {
      if (this.countdownKey) {
        basis.clearCountdown(this.countdownKey)
        this.countdownKey = undefined
      }
    },
    updateInfoDesc() {
      this.clearCountdown()
      if (this.statusInfo.isNew) {
        this.showPayCountDown()
      } else {
        this.infoDesc = this.orderData.orderStatusRemark
      }
      return this.infoDesc
    },
    // 更新infoDesc信息
    updateNewInfoDes(duration) {
      this.infoDesc = this.countTime(duration) + '后未支付将自动关闭订单'
    },
    // 计时转换
    countTime(count) {
      let h = Math.floor(count / 3600)
      h = basis.pad0Start(h + '')
      let m = Math.floor((count % 3600) / 60)
      m = basis.pad0Start(m + '')
      let s = count % 60
      s = basis.pad0Start(s + '')
      return `${h}:${m}:${s}`
    },

    // 显示支付倒计时
    showPayCountDown() {
      let orderData = this.orderData
      let duration = Math.floor((orderData.gmtPayEnd - orderData.gmtPayStart) / 1000)
      if (duration < 0) duration = 1

      this.updateNewInfoDes(duration)
      this.countdownKey = basis.countdown(duration, {
        timer: data => {
          this.updateNewInfoDes(data.last)
        },
        complete: () => {
          // 倒计时结束
          let params = {
            index: this.index,
            status: orderStatus.status.CLOSED
          }
          this.$emit('statusChange', params)
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-order-detail-head {
  .flex-hor-center();
  width: 100%;
  height: 100px;
  background-image: linear-gradient(90deg, #ffce3e 0%, #feb600 100%);
  margin-bottom: 10px;

  // 头部信息
  .ala-order-detail-head__info {
    padding-left: @padding-h;
    color: white;
    .flex-n();
    .order-status-msg {
      font-size: @font-size-btn;
    }
    .info-desc {
      margin-top: 3px;
      font-size: 15px;
    }
  }

  // 待支付
  .order-detail-icon-new {
    margin-right: 44.5px;
    .icon('wait_pay_state_pic', 48.5px, 76px);
  }
  // 待发货
  .order-detail-icon-paid {
    margin-right: 15px;
    .icon('wait_state_pic', 110px, 92.5px);
  }
  // 待收货
  .order-detail-icon-delivered {
    margin-right: 15px;
    .icon('wait_state_pic', 110px, 92.5px);
  }
  // 售后
  .order-detail-icon-wait-refund {
    margin-right: 25px;
    .icon('aftersale_wait_state', 92.5px, 92.5px);
  }
  // 订单关闭
  .order-detail-icon-closed {
    margin-right: 35px;
    .icon('close_state_pic', 92.5px, 92.5px);
  }
  // 订单完成
  .order-detail-icon-finished {
    margin-right: 25px;
    .icon('finish_state_pic', 92.5px, 74px);
  }
}
</style>