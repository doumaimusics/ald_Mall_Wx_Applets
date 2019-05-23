/**
* Created by xiejun on 2019/01/06.
* 我的订单项按钮列表
*/
<template>
  <div v-if="hasButtonList" class="ala-order-node-button-list">
    <div class="timeout"> {{ timeoutTip }}</div>
    <button-list-item
    v-for="(data, index) in statusButtonList" 
    @tap="onNodeTap"
    :btnData="data"
    :key="index"/>

  </div>
</template>

<script>
import buttonListItem from './buttonListItem'

import { mapGetters, mapMutations, mapActions } from 'vuex'
import Tips from 'utils/tip'
import orderStatus from 'utils/orderStatus'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import pay from 'utils/pay'
import storage from 'utils/storage'
import btnActionType from './buttonListActionType'

export default {
  name: '',
  data() {
    return {
      timeoutTip: ''
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
    ...mapGetters(['userId', 'openId']),
    // 订单状态信息
    statusInfo() {
      return orderStatus.info(this.orderData.orderStatus)
    },
    hasButtonList() {
      return this.statusButtonList && this.statusButtonList.length
    },
    statusButtonList() {
      return this.orderData.statusButtonList
    }
  },
  created() {
    this.showTimeout()
  },
  mounted() {},
  watch: {
    statusInfo() {
      this.showTimeout()
    }
  },
  methods: {
    ...mapMutations(['setCurrentOrderId']),
    ...mapActions(['requestToPayOrder', 'getOldToken', 'confirmReceipt', 'getMineInfo']),

    // 单击按钮
    onNodeTap(btnData) {
      let { type, actionType, url } = btnData

      if (type === 1) {
        switch (actionType) {
          case btnActionType.PAY:
            this.toPay()
            break
          case btnActionType.DELIVER:
            this.toDeliver()
            break
          case btnActionType.CANCEL:
          case btnActionType.REFUND:
          case btnActionType.DELETE:
          case btnActionType.WAIT_REFUND:
            Tips.toast('仅限爱上街APP内使用，下载安装APP可体验更多哦～')
            break
          case btnActionType.SHOW_LOGISTICS:
            this.setCurrentOrderId(this.orderData.orderId)
            navigate.push({ url: '/pages/common/orderLogistics' })
            break
        }
      } else {
        if (url) {
          let options = storage.props.launchOptions
          options.query = basis.urldecoded(url)
          storage.props.launchOptions = options
          navigate.push({ url })
        } else {
          console.log('button list type is 2 else')
        }
      }
    },
    // 支付
    async toPay() {
      let params = {
        addOrder: 1,
        // actualAmount: this.orderData.actualAmount,
        orderId: this.orderData.orderId,
        // userId: this.userId,
        openId: this.openId
      }
      let payment = await this.requestToPayOrder(params)
      if (payment) {
        // 调起微信支付
        pay
          .requestPayment(payment)
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

    async toDeliver() {
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
    clearTimeout() {
      if (this.timeoutKey) {
        basis.clearCountdown(this.timeoutKey)
        this.timeoutKey = null
        this.timeoutTip = ''
      }
    },
    showTimeout() {
      this.clearTimeout()
      if (!this.statusInfo.isNew) return
      let orderData = this.orderData
      let duration = Math.floor((orderData.gmtPayEnd - orderData.gmtPayStart) / 1000)
      if (duration < 0) duration = 60
      this.timeoutKey = basis.countdown(duration, {
        timer: data => (this.timeoutTip = this.countTime(data.last) + '后将自动关闭'),
        complete: () => this.$emit('timeout')
      })
    }
  },
  components: { buttonListItem }
}
</script>

<style lang="less" scope>
@import '~@/styles/base/fn.less';
.ala-order-node-button-list {
  position: relative;
  .border-1px-top();
  width: 100%;
  height: 53px;
  .flex-hor-center();
  .padding-h(@padding-h);
  box-sizing: border-box;

  font-size: @font-size-txt;
  color: @color-txt;

  .timeout {
    .flex-n();
    color: @color-txt-1;
  }
}
</style>