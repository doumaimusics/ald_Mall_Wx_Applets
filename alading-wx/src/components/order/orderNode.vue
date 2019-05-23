/**
* Created by xiejun on 2018/10/25.
* 订单列表节点
*/
<template>
  <div class="ala-order-node">
    <div class="node-head">
      <span class="node-head__icon"></span>
      <span class="node-head__shop-name">{{shopName}}</span>
      <span class="node-head__status">{{statusMsg}}</span>
    </div>

    <ala-order-goods-list
    @clickGoods="onClickGoods"
    :goodsList="orderData.childOrderList"/>

    <div class="node-price-detail">
      <span class="node-price-detail__desc">总计:</span>
      <span class="node-price-detail__actual">{{ actualAmount }}</span>
      <span v-if="isShowCoupon" class="node-price-detail__coupon">{{ couponAmount }}</span>
    </div>

    <order-node-button-list 
    v-if="orderData.statusButtonList"
    @deliverSuccess="onDeliverSuccess"
    @pay="onPay"
    @timeout="onTimeout"
    :orderData="orderData"/>

    <ala-order-node-menu
    v-else
    @deliverSuccess="onDeliverSuccess"
    @pay="onPay"
    @timeout="onTimeout"
    :orderData="orderData"/>
  </div>
</template>

<script>
import alaOrderGoodsList from './orderGoodsList'
import orderNodeButtonList from './orderNodeButtonList'
import alaOrderNodeMenu from './orderNodeMenu'

import { mapMutations } from 'vuex'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import storage from 'utils/storage'
import orderStatus from 'utils/orderStatus'
export default {
  name: '',
  data() {
    return {
      // 自动关闭提示
      autoCloseTip: ''
    }
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    // 订单数据
    orderData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    shopName() {
      let result = '爱上街商城'
      if (this.orderData.storeShopDto && this.orderData.storeShopDto.shopName) {
        result = this.orderData.storeShopDto.shopName
      }
      return result
    },
    statusMsg() {
      return this.orderData.orderStatusMsg
    },
    // 真实付款
    actualAmount() {
      return basis.moneyPrefix(this.orderData.actualAmount)
    },
    // 返回是否显示优惠
    isShowCoupon() {
      return this.orderData.actualAmount !== this.orderData.saleAmount
    },
    // 优惠
    couponAmount() {
      let result = ''
      let amount = this.orderData.saleAmount + this.orderData.freightAmount - this.orderData.actualAmount
      amount = Math.floor(amount * 100) / 100
      if (amount) {
        result = `(优惠${basis.moneyPrefix(amount)})`
      }
      return result
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['setCurrentOrderId']),
    // 查看订单详情
    onClickGoods() {
      let orderDetailsUrl = this.orderData.orderDetailsUrl
      if (orderDetailsUrl) {
        let options = storage.props.launchOptions
        options.query = basis.urldecoded(orderDetailsUrl)
        storage.props.launchOptions = options
        console.log('options', options, orderDetailsUrl)
        navigate.push({ url: orderDetailsUrl })
      } else {
        this.setCurrentOrderId(this.orderData.orderId)
        navigate.push({ url: '/pages/common/orderDetailMine' })
      }
    },
    // 确认收货
    onDeliverSuccess() {
      this.emitStatusChange()
    },
    // 订单支付
    onPay(data) {
      if (data.status) {
        // 支付成功
        this.emitStatusChange()
      }
    },
    onTimeout() {
      this.emitStatusChange(orderStatus.statusOffset.timeout)
    },
    emitStatusChange(statusOffset = orderStatus.statusOffset.success) {
      this.$emit('statusChange', {
        index: this.index,
        statusOffset
      })
    }
  },
  components: { alaOrderGoodsList, orderNodeButtonList, alaOrderNodeMenu }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-order-node {
  margin-top: 10px;
  background: white;

  &:first-child {
    margin-top: 5px;
  }

  .node-head {
    .flex-hor-center();
    .padding-h(@padding-h);
    height: 40px;
    font-size: 0;
    box-sizing: border-box;
    .node-head__icon {
      .icon('icon_shop', 20px, 20px);
    }
    .node-head__shop-name {
      margin-left: 6px;
      .flex-n();
      .show-line();
      font-family: PingFangSC-Medium;
      font-size: @font-size-list;
      color: @color-txt;
    }
    .node-head__status {
      margin-left: 10px;
      font-size: @font-size-txt;
      color: @color-price;
    }
  }

  .node-price-detail {
    .flex-hor-center();
    .padding-h(@padding-h);
    margin-top: -10px;
    height: 42px;

    color: @color-txt;
    font-size: 0;
    .node-price-detail__desc {
      .flex-n();
      font-size: @font-size-list;
      text-align: right;
    }
    .node-price-detail__actual {
      margin-left: 5px;
      font-size: @font-size-label;
    }
    .node-price-detail__coupon {
      margin-left: 5px;
      color: @color-price;
      font-size: @font-size-list;
    }
  }

  .ala-order-node-menu {
    height: 53px;
  }
}
</style>