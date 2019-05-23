/**
* Created by xiejun on 2018/11/30
* 详情——订单
*/
<template>
  <div v-if="hasOrderDetailData" class="collage-detail-order" :class="{ 'iphonex':isIphoneX }">
    <!-- 头部信息 -->
    <order-head :statusInfo="statusInfo" :orderDetailData="orderDetailData"/>
    <!-- 物流 -->
    <ala-order-detail-logistics
    v-if="isShowLogistics"
    :tipInfo="tipInfo"
    :logisticsData="logisticsData"/>
    <!-- 地址 -->
    <ala-order-detail-address :addressData="addressData"/>
    <!-- 邀请好友 -->
    <to-share v-if="hasToShare" @tap="onToShare" :shareData="toShareData" :userInfoList="userInfoList"/>
    <!-- 商品信息 -->
    <div class="goods-item-container" @tap="onGoodsTap">
      <ala-order-goods-item :goodsInfoData="goodsInfoData"/>
    </div>
    <!-- 商品价格信息 -->
    <price-info :orderDetail="orderDetail"></price-info>
    <!-- 其它信息 -->
    <info
    :hasMenu="!statusInfo.noMenu"
    :infoData="orderDetail"/>
    <!-- 菜单 -->
    <detail-menu
    @delete="onDelete"
    @cancelNew="onCancelNew"
    @cancelShare="onCancelShare"
    @pay="onPay"
    @paySuccess="onPaySuccess"
    @toShare="onToShare"
    @toDeliver="onToDeliver"
    :orderDetail="orderDetail"
    :isShowLogistics="isShowLogistics"
    :statusInfo="statusInfo"/>

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
import orderHead from './head'
import toShare from './toShare'
import info from './info'
import priceInfo from './priceInfo'
import detailMenu from './menu'
import alaOrderDetailLogistics from 'components/order/detail/orderDetailLogistics'
import alaOrderDetailAddress from 'components/order/detail/orderDetailAddress'
import alaOrderGoodsItem from 'components/order/orderGoodsItem'

import dialogToast from 'components/toast/dialogToast'
import toastMask from 'components/toast/toastMask'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import systemInfo from 'utils/systemInfo'
import pay from 'utils/pay'
import Tips from 'utils/tip'
import navigate from 'utils/navigate'
import storage from 'utils/storage'
import basis from 'utils/basis'
import maidian from 'utils/maidian'
import collageOrderStatus from 'utils/collageOrderStatus'
import collageBasis from 'pcollagecomp/basis'
import dialogUtil from 'pcollagecomp/dialogUtil'
import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      tipInfo: '正在全力读取物流信息...',
      logisticsData: {},

      dialogVisible: false,
      dialogData: {}
    }
  },
  props: {},
  computed: {
    ...mapState(['isLogin']),
    ...mapGetters(['userId', 'openId']),
    ...mapState('collage', ['orderDetailData', 'orderDetailParams']),
    maskVisible() {
      return this.dialogVisible
    },
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    hasOrderDetailData() {
      return this.orderDetailData !== null
    },
    // 订单详情
    orderDetail() {
      if (!this.hasOrderDetailData) return null
      return this.orderDetailData.orderDetail
    },
    // 去分享数据
    toShareData() {
      if (!this.hasOrderDetailData) return null
      if (this.statusInfo.isNew || this.statusInfo.isDealing || this.statusInfo.isCancel) return null
      let title = '拼团已成功'
      let toShare = false
      if (this.statusInfo.isToShare) {
        title = '待分享，还差' + this.needCollageCount + '人'
        toShare = true
      } else if (this.statusInfo.isClosed) {
        title = '拼团已取消'
      } else if (this.statusInfo.isFail) {
        title = '拼团失败'
      }
      return { title, toShare }
    },
    // 订单用户列表
    userInfoList() {
      if (this.hasOrderDetailData) {
        return collageBasis.transUserInfoList(this.orderDetailData)
      }
      return []
    },
    goodsInfoData() {
      if (this.hasOrderDetailData) return collageBasis.transGoodsData(this.orderDetail)
      return null
    },
    // 地址数据
    addressData() {
      if (!this.hasOrderDetailData) return null
      let consignee = this.orderDetail.consignee
      let consigneeMobile = this.orderDetail.consigneeMobile

      let keys = ['province', 'city', 'district', 'address']
      let address = keys.map(value => this.orderDetail[value]).join('')

      let data = { consignee, consigneeMobile, address }
      return data
    },
    // 订单状态信息
    statusInfo() {
      if (!this.hasOrderDetailData) return null
      let pinOrderStatus = this.orderDetailData.pinOrderStatus
      let status = this.orderDetail.status
      let payStatus = this.orderDetail.payStatus
      let info = collageOrderStatus.info({ pinOrderStatus, status, payStatus })
      return info
    },
    // 是否显示物流信息
    isShowLogistics() {
      if (!this.hasOrderDetailData) return false
      return this.orderDetail.showLogistics && this.orderDetail.showLogistics === '1'
    },
    needCollageCount() {
      if (this.hasOrderDetailData) {
        return collageBasis.calcNeedCollageCount(this.orderDetailData)
      }
      return 1
    },
    hasToShare() {
      if (this.hasOrderDetailData) {
        return this.orderDetailData.orderUserInfoList.length > 0
      }
      return false
    }
  },
  created() {},
  mounted() {},
  onShow() {
    if (storage.props.launchStatus === 1) return
    if (!this.isLogin) {
      basis.toLogin()
      return
    }

    let options = storage.props.launchOptions
    if (options && options.query.pinOrderNo) {
      let { orderId, pinOrderNo } = options.query
      orderId = +orderId
      this.setOrderDetailParams({ orderId, pinOrderNo })

      // 清空一下
      options.query = {}
      storage.props.launchOptions = options
    }

    this.tipInfo = '正在全力读取物流信息...'

    maidian.view('pin_orderdetail', this.orderDetailParams.pinOrderNo)
    // 针对分享状态
    this.toGetOrderDetail()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {},
  methods: {
    ...mapMutations(['setCurrentOrderId']),
    ...mapMutations('collage', ['setOrderDetailParams', 'pushShareParams']),
    ...mapActions(['getOrderLogisticsData', 'requestToPayOrder', 'getOldToken', 'confirmReceipt']),
    ...mapActions('collage', ['getOrderDetail', 'cancelOrder', 'deleteOrder']),
    async toGetOrderDetail() {
      await this.getOrderDetail()
      if (this.isShowLogistics) {
        this.setCurrentOrderId(this.orderDetail.orderId)
        let logisticsData = await this.getOrderLogisticsData({ traces: 0 })
        if (logisticsData) {
          this.logisticsData = logisticsData.newestInfo
        } else {
          this.tipInfo = '没有取得物流信息'
        }
      }
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
    onPaySuccess() {
      // 支付成功， 更新订单详情页面
      this.getOrderDetail()
    },
    onGoodsTap() {},
    onToShare() {
      let { orderId, pinOrderNo, goodsId, goodsPriceId } = this.orderDetail

      maidian.click('pin_orderdetail_share', pinOrderNo)
      this.pushShareParams({ orderId, pinOrderNo, goodsId, goodsPriceId })
      let url = '/pcollage/pages/collage/share'
      navigate.push({ url })
    },
    // 确认收货
    async onToDeliver() {
      let success = await this.getOldToken()
      if (success) {
        Tips.confirm('您确定已收到货物/服务？').then(async () => {
          let success = await this.confirmReceipt({ orderId: this.orderDetail.orderId })
          if (success) {
            // 确认收货成功
            this.toGetOrderDetail()
          }
        })
      }
    },
    // 取消订单
    async toCancelOrder() {
      let orderId = this.orderDetail.orderId
      let success = await this.cancelOrder({ orderId })
      if (success) {
        this.dialogVisible = false
        // 支付成功， 更新订单详情
        this.toGetOrderDetail()
      }
    },
    // 删除订单
    async toDeleteOrder() {
      let orderId = this.orderDetail.orderId
      let success = await this.deleteOrder({ orderId })
      if (success) {
        this.dialogVisible = false
        // 支付成功， 更新订单详情
        navigate.back({ delta: 1 })
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
        case 'toRefund':
          this.toPay()
          break
      }
    },
    onMaskTap() {
      this.dialogVisible = false
    },
    async toPay() {
      let payParams = {
        orderId: this.orderDetail.orderId,
        userID: this.userId,
        openId: this.openId,
        addOrder: 1
      }
      let payment = await this.requestToPayOrder(payParams)
      if (payment) {
        // 调起微信支付
        pay.requestPayment(payment).then(async res => {
          // 跳转进入对应的分享页
          this.onToShare()
        })
      }
    }
  },
  components: {
    orderHead,
    toShare,
    info,
    priceInfo,
    detailMenu,
    alaOrderDetailLogistics,
    alaOrderDetailAddress,
    alaOrderGoodsItem,
    dialogToast,
    toastMask
  }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@menu-height: 50px;
.collage-detail-order {
  padding-bottom: @menu-height;
  &.iphonex {
    padding-bottom: @menu-height + @padding-iphonex;
  }

  .goods-item-container {
    position: relative;
    .border-1px-bottom();
    &::after {
      left: @padding-h;
      right: @padding-h;
    }

    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 5px;
    background: white;
  }

  .collage-detail-order-menu {
    height: @menu-height;
  }
}
</style>
