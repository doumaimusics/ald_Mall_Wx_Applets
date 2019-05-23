/**
* Created by xiejun on 2018/12/03.
* 我的订单列表节点
*/
<template>
  <div class="collage-my-order-node">
    <div class="head">
      <div class="shop-name">{{shopName}}</div>
      <div class="status">{{nodeStatusMsg}}</div>
    </div>
    <div class="goods-item-container" @tap="onGoodsTap">
      <ala-order-goods-item :goodsInfoData="goodsInfoData"/>
    </div>
    
    <my-order-node-menu
    @delete="onDelete"
    @cancelNew="onCancelNew"
    @cancelShare="onCancelShare"
    @pay="onPay"
    @toShare="onToShare"
    @detailTap="onGoodsTap"
    :orderData="orderData"/>

    <!-- 弹窗 -->
    <dialog-toast
    v-if="dialogVisible"
    @tap="onDialogTap"
    :dialogData="dialogData"/>

    <!-- 蒙层 -->
    <toast-mask
    :visible="maskVisible"
    @tap="onMaskTap"/>
  </div>
</template>

<script>
import myOrderNodeMenu from './myOrderNodeMenu'
import alaOrderGoodsItem from 'components/order/orderGoodsItem'

import dialogToast from 'components/toast/dialogToast'
import toastMask from 'components/toast/toastMask'

import { mapGetters, mapMutations, mapActions } from 'vuex'
import navigate from 'utils/navigate'
import pay from 'utils/pay'
import basis from 'pcollagecomp/basis'
import dialogUtil from 'pcollagecomp/dialogUtil'
import tool from 'utils/index'
import maidian from 'utils/maidian'

export default {
  name: '',
  data() {
    return {
      dialogVisible: false,
      dialogData: {}
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
    maskVisible() {
      return this.dialogVisible
    },
    goodsInfoData() {
      return basis.transGoodsData(this.orderData)
    },
    // 订单状态信息
    statusInfo() {
      return this.orderData.orderInfo
    },
    shopName() {
      let result = tool.formatDate2(this.orderData.gmtCreate)
      return result
    },
    nodeStatusMsg() {
      let msg = this.statusInfo.nodeStatusMsg
      if (this.statusInfo.isToShare) {
        let count = basis.calcNeedCollageCount(this.orderData)
        msg = `待分享，差${count}人`
      } else {
        if (!msg) msg = this.statusInfo.statusMsg
      }
      return msg
    },
    needCollageCount() {
      if (this.hasShareData) {
        return basis.calcNeedCollageCount(this.orderData)
      }
      return 1
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations('collage', ['setOrderDetailParams', 'pushShareParams']),
    ...mapActions(['requestToPayOrder']),
    ...mapActions('collage', ['getMyOrderList', 'cancelOrder', 'deleteOrder']),
    onGoodsTap() {
      let { orderId, pinOrderNo } = this.orderData

      maidian.click('pintuan_orderlist_detail', pinOrderNo)
      this.setOrderDetailParams({ orderId, pinOrderNo })
      navigate.push({ url: '/pcollage/pages/detail/order/detailOrder' })
    },
    onDelete() {
      this.dialogData = dialogUtil.deleleInfo
      this.dialogVisible = true
    },
    onCancelNew() {
      this.dialogData = dialogUtil.cancelNew
      this.dialogVisible = true
    },
    onCancelShare() {
      this.dialogData = dialogUtil.cancelShare
      this.dialogVisible = true
    },
    onPay() {
      this.toPay()
    },
    onToShare() {
      let { orderId, pinOrderNo, goodsId, goodsPriceId } = this.orderData

      maidian.click('pintuan_orderlist_share', pinOrderNo)
      this.pushShareParams({ orderId, pinOrderNo, goodsId, goodsPriceId })
      let url = '/pcollage/pages/collage/share'
      navigate.push({ url })
    },
    // 取消订单
    async toCancelOrder() {
      let orderId = this.orderData.orderId
      let success = await this.cancelOrder({ orderId })
      if (success) {
        this.dialogVisible = false
        // 刷新列表
        this.getMyOrderList()
      }
    },
    // 删除订单
    async toDeleteOrder() {
      let orderId = this.orderData.orderId
      let success = await this.deleteOrder({ orderId })
      if (success) {
        this.dialogVisible = false
        // 刷新列表
        this.getMyOrderList()
      }
    },

    onDialogTap(action) {
      switch (action) {
        case 'ok':
        case 'del-cancel':
          this.dialogVisible = false
          break
        case 'del-ok':
          this.toDeleteOrder()
          break
        case 'cancel':
          this.toCancelOrder()
          break
        case 'pay':
          this.toPay()
          break
      }
    },
    onMaskTap() {
      this.dialogVisible = false
    },

    async toPay() {
      let payParams = {
        orderId: this.orderData.orderId,
        userID: this.userId,
        openId: this.openId,
        addOrder: 1
      }
      let payment = await this.requestToPayOrder(payParams)
      if (payment) {
        // 调起微信支付
        pay.requestPayment(payment).then(async res => {
          this.onToShare()
        })
      }
    }
  },
  components: {
    myOrderNodeMenu,
    alaOrderGoodsItem,
    dialogToast,
    toastMask
  }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-my-order-node {
  margin-top: 10px;
  background: white;

  .head {
    .flex-hor-center();
    .padding-h(@padding-h);
    height: 40px;
    font-size: 0;
    box-sizing: border-box;
    .shop-name {
      .flex-n();
      .show-line();
      font-family: PingFangSC-Medium;
      font-size: @font-size-list;
      color: @color-txt-2;
    }
    .status {
      margin-left: 10px;
      font-size: @font-size-txt;
      color: @color-price;
    }
  }

  .collage-my-order-node-menu {
    height: 50px;
    &::before {
      left: @padding-h;
    }
  }
}
</style>