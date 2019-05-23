/**
* Created by xiejun on 2018/11/6.
* 订单节点菜单项
*/
<template>
  <div v-if="!statusInfo.noMenu" :class="['ala-order-node-menu', {'iphonex-bottom': isIphoneX }]">
    <!-- 待支付 -->
    <block v-if="statusInfo.isNew">
      <div class="node-menu__btn-1" @click="onPaidClick">立即付款</div>
      <div class="node-menu__btn-2" @click="onShowGuide">取消订单</div>
      <span class="node-menu__auto-close-tip">{{autoCloseTip}}</span>
    </block>
    <!-- 待发货 -->
    <block v-else-if="statusInfo.isPaid">
      <div class="node-menu__btn-2" @click="onShowGuide">申请售后</div>
    </block>
    <!-- 待收货 -->
    <block v-else-if="statusInfo.isDelivered">
      <div class="node-menu__btn-1" @click="onDeliverClick">确认收货</div>
      <div class="node-menu__btn-2" @click="onShowGuide">申请售后</div>
      <div class="node-menu__btn-2" @click="onShowOrderLogisticsClick">查看物流</div>
    </block>
    <!-- 售后-今后处理中 -->
    <block v-else-if="statusInfo.isWaitRefund">
      <div class="node-menu__btn-2" @click="onShowGuide">售后处理中</div>
      <div v-if="isShowLogistics" class="node-menu__btn-2" @click="onShowOrderLogisticsClick">查看物流</div>
    </block>
    <!-- 订单完成 -->
    <block v-else-if="statusInfo.isFinished">
      <div class="node-menu__btn-2" @click="onShowGuide">申请售后</div>
      <div class="node-menu__btn-2" @click="onShowGuide">删除订单</div>
      <div class="node-menu__btn-2" @click="onShowOrderLogisticsClick">查看物流</div>
    </block>
    <!-- 订单关闭 -->
    <block v-else-if="statusInfo.isClosed">
      <div v-if="isCanDelOrder" class="node-menu__btn-2" @click="onShowGuide">删除订单</div>
      <div v-if="isShowLogistics" class="node-menu__btn-2" @click="onShowOrderLogisticsClick">查看物流</div>
    </block>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Tips from 'utils/tip'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import orderStatus from 'utils/orderStatus'
import pay from 'utils/pay'
// import systemInfo from 'utils/systemInfo'
export default {
  name: '',
  data() {
    return {
      isVisible: true,
      autoCloseTip: ''
    }
  },
  props: {
    orderData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 是否显示倒计时
    hasCountdown: {
      type: Boolean,
      default: true
    },
    // 是否为iphone x
    isIphoneX: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['userId', 'openId']),
    // 订单状态信息
    statusInfo() {
      return orderStatus.info(this.orderData.orderStatus)
    },
    // 是否显示物流信息
    isShowLogistics() {
      return this.orderData.showLogistics === 1
    },
    // 是否可删除订单
    isCanDelOrder() {
      return this.orderData.isCanDelOrder === 'Y'
    },
    // 是否可发起售后申请
    isCanApplyAfterSale() {
      return this.orderData.isCanApplyAfterSale === 'Y'
    }
  },
  created() {
    this.showPayCountdown()
  },
  mounted() {},
  onUnload() {
    this.clearCountdown()
  },
  watch: {
    statusInfo() {
      this.showPayCountdown()
    }
  },
  methods: {
    ...mapMutations(['setCurrentOrderId']),
    ...mapActions(['requestToPayOrder', 'getOldToken', 'confirmReceipt', 'getMineInfo']),
    // 显示引导
    onShowGuide() {
      Tips.toast('仅限爱上街APP内使用，下载安装APP可体验更多哦～')
    },
    // 查看物流
    onShowOrderLogisticsClick() {
      this.setCurrentOrderId(this.orderData.orderId)
      navigate.push({ url: '/pages/common/orderLogistics' })
    },
    // 确认收货
    async onDeliverClick() {
      let success = await this.getOldToken()
      if (success) {
        Tips.confirm('您确定已收到货物/服务？').then(async () => {
          let success = await this.confirmReceipt({ orderId: this.orderData.orderId })
          if (success) {
            // 确认收货成功
            this.$emit('deliverSuccess')
          }
        })
      }
    },
    // 支付
    async onPaidClick() {
      let params = {
        addOrder: 1,
        // actualAmount: this.orderData.actualAmount,
        orderId: this.orderData.orderId,
        // userId: this.userId,
        openId: this.openId
      }
      let data = await this.requestToPayOrder(params)
      if (data) {
        // 调起微信支付
        pay
          .requestPayment(data)
          .then(res => {
            this.getMineInfo()
            this.$emit('pay', { status: 1 })
          })
          .catch(errorMsg => {
            if (errorMsg === '支付失败') {
              this.$emit('pay', { status: 0 })
            }
          })
      }
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
    clearCountdown() {
      if (this.payKey) {
        basis.clearCountdown(this.payKey)
        this.payKey = undefined
      }
    },
    // 显示支付倒计时
    showPayCountdown() {
      this.clearCountdown()
      if (!(this.statusInfo.isNew && this.hasCountdown)) return
      let orderData = this.orderData
      let duration = Math.floor((orderData.gmtPayEnd - orderData.gmtPayStart) / 1000)
      if (duration < 0) {
        this.autoCloseTip = '订单支付超时'
        return
      }
      this.payKey = basis.countdown(duration, {
        timer: data => {
          this.autoCloseTip = this.countTime(data.last) + '后将自动关闭'
        },
        complete: () => {
          // 倒计时结束
          this.$emit('timeout')
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-order-node-menu {
  position: relative;
  .border-1px-top();

  width: 100%;

  .flex-hor-center();
  flex-direction: row-reverse;
  padding-left: @padding-h;
  box-sizing: border-box;

  font-size: @font-size-txt;
  color: @color-txt;

  .node-menu__auto-close-tip {
    .flex-n();
    color: @color-txt-1;
  }

  .node-menu-btn() {
    width: 84px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 3px;
    margin-right: 10px;
    box-sizing: border-box;
    &:first-child {
      margin-right: @padding-h;
    }
  }

  .node-menu__btn-1 {
    .node-menu-btn();
    background: @color-btn;
  }

  .node-menu__btn-2 {
    .node-menu-btn();
    line-height: 26px;
    color: @color-txt-1;
    border: 1px solid @color-btn-1;
  }
}
</style>
