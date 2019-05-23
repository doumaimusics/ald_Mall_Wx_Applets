/**
* Created by xiejun on 2018/11/28.
* 确认订单
*/
<template>
  <div class="collage-order-confirm">
    <div class="notice">通知：请勿替陌生人购买商品，谨防上当受骗</div>
    <selected-address @tap="onAddressTap" :selectedAddressData="userSelectAddress"/>
    <div class="goods-item-container">
      <ala-order-goods-item :goodsInfoData="orderComfirmGoodsData"/>
    </div>
    <div :class="['btn-pay', {'iphonex': isIphoneX }]" @tap="onPayTap">
      微信支付￥{{ orderComfirmGoodsData.saleAmount }}
    </div>

    <tip-toast v-if="payTipVisible" content="正在支付处理中"/>
    <!-- 蒙层 -->
    <toast-mask :visible="payTipVisible"/>
  </div>
</template>

<script>
import selectedAddress from 'pcollagecomp/common/selectedAddress'
import alaOrderGoodsItem from 'components/order/orderGoodsItem'

import tipToast from 'components/toast/tipToast'
import toastMask from 'components/toast/toastMask'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import navigate from 'utils/navigate'
import systemInfo from 'utils/systemInfo'
import maidian from 'utils/maidian'
import Tips from 'utils/tip'
import pay from 'utils/pay'
import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      payTipVisible: false
    }
  },
  props: {},
  computed: {
    ...mapState(['userSelectAddress']),
    ...mapState('collage', ['orderComfirmGoodsData', 'orderConfirmStatus', 'attendFastPinOrderNo']),
    ...mapGetters(['userId', 'openId']),
    ...mapGetters('collage', ['currentGoodsId', 'currentShareParams', 'orderConfirmStatusInfo']),
    isIphoneX() {
      return systemInfo.isIphoneX
    }
  },
  created() {},
  mounted() {},
  onShow() {
    maidian.view('pintuan_order_confirm', this.orderComfirmGoodsData.goodsName, this.currentGoodsId)

    this.payTipVisible = false
    if (this.userSelectAddress) {
      return
    }
    this.getUserDefaultAddressData({})
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onUnload() {
    // 清除状态
    this.setUserSelectAddress(null)
    this.resetOrderConfirmStatus()
  },
  watch: {},
  methods: {
    ...mapMutations(['setCurrentOrderStatusIndex', 'setIsSelectAddress', 'setUserSelectAddress']),
    ...mapMutations('collage', [
      'setPayOrderId',
      'setOrderDetailParams',
      'pushShareParams',
      'resetOrderConfirmStatus',
      'popGoodsId'
    ]),
    ...mapActions(['getUserDefaultAddressData', 'requestToPayOrder']),
    ...mapActions('collage', ['attendGroup']),
    onAddressTap() {
      if (this.userSelectAddress) {
        this.setIsSelectAddress(true)
        navigate.push({ url: '/pages/common/address' })
      } else {
        navigate.push({ url: '/pages/common/addressAdd' })
      }
    },
    // 取得拼团支付参数
    getAttendGroupData() {
      let pinOrderNo = this.orderComfirmGoodsData.pinOrderNo
      if (this.orderConfirmStatusInfo.isToCollage) {
        pinOrderNo = this.currentShareParams.pinOrderNo
      } else if (this.orderConfirmStatusInfo.isAttendFast) {
        pinOrderNo = this.attendFastPinOrderNo
      }
      if (!pinOrderNo) pinOrderNo = ''
      return {
        goodsId: this.orderComfirmGoodsData.goodsId,
        addressId: this.userSelectAddress.rid,
        pinOrderNo,
        goodsPriceId: this.orderComfirmGoodsData.goodsSpecId,
        invoiceHeader: '',
        lc: 'pintuan'
      }
    },

    payToCollage() {
      // 去拼团、立即拼团
      navigate.back({ delta: 1 })

      this.resetOrderConfirmStatus()
    },

    payFailToDetailOrder(data) {
      // 进入对应订单详情
      this.setOrderDetailParams(data)
      navigate.replace({ url: '/pcollage/pages/detail/order/detailOrder' })
    },

    // 支付失败
    payFail(data) {
      if (this.orderConfirmStatusInfo.isToCollage) {
        // 去拼团、立即拼团
        this.popGoodsId()
        this.payFailToDetailOrder(data)
      } else {
        this.payFailToDetailOrder(data)
      }
    },
    // 支付成功
    paySuccess(data) {
      if (this.orderConfirmStatusInfo.isToCollage) {
        // 去拼团、立即拼团
        this.popGoodsId()
        this.payToCollage()
      } else {
        // 正常商品详情拼团支付
        let goodsId = this.orderComfirmGoodsData.goodsId
        let goodsPriceId = this.orderComfirmGoodsData.goodsSpecId
        this.pushShareParams({ ...data, goodsId, goodsPriceId })
        navigate.replace({ url: '/pcollage/pages/collage/share' })
      }
    },
    // 开始支付
    async onPayTap() {
      maidian.click('pintuan_order_wechatpay', this.orderComfirmGoodsData.goodsName, this.currentGoodsId)
      if (!this.userSelectAddress) {
        Tips.toast('请添加收货地址')
        return
      }

      this.payTipVisible = true

      let payOrderData = this.getAttendGroupData()
      let attendGroupResult = await this.attendGroup(payOrderData)
      if (attendGroupResult) {
        let orderId = attendGroupResult.orderId
        let payParams = {
          orderId,
          // userID: this.userId,
          openId: this.openId,
          addOrder: 1
        }
        let payment = await this.requestToPayOrder(payParams)
        let pinOrderNo = attendGroupResult.pinOrderNo
        let data = { orderId, pinOrderNo }
        if (payment) {
          // 调起微信支付
          pay
            .requestPayment(payment)
            .then(res => {
              this.paySuccess(data)
            })
            .catch(errorMsg => {
              // 支付失败
              this.payFail(data)
            })
        } else {
          // 支付失败
          this.payFail(data)
        }
      } else {
        this.payTipVisible = false
      }
    }
  },
  components: {
    tipToast,
    toastMask,
    selectedAddress,
    alaOrderGoodsItem
  }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-order-confirm {
  .fill-page(@color-bg);
  .notice {
    height: 28px;
    line-height: 28px;
    background-color: #fffad9;

    text-align: center;
    font-size: @font-size-tip;
  }
  .goods-item-container {
    margin-top: 10px;
    .padding-v(10px);
    background: white;

    .order-item-view {
      .order-item__content {
        margin-bottom: 0;
      }
    }
  }

  .btn-pay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #029900;

    color: #ffffff;
    font-size: @font-size-btn-1;
    text-align: center;

    &.iphonex {
      bottom: @padding-iphonex;
    }
  }
}
</style>
