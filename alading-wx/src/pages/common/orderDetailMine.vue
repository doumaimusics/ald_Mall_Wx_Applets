/**
* Created by xiejun on 2018/11/4.
* 订单详情页
*/
<template>
  <div v-if="hasOrderDetailData" :class="['ala-order-detail', {'iphonex-bottom': isIphoneX }]">
    <ala-order-detail-head
    :statusInfo="statusInfo"
    :orderData="orderDetailData"/>

    <ala-order-detail-logistics
    v-if="isShowLogistics"
    :tipInfo="tipInfo"
    :logisticsData="logisticsData"/>

    <ala-order-detail-address :addressData="orderDetailData"/>

    <div class="ala-order-detail__shop-name">
      <span class="node-head__icon"></span>
      <span class="node-head__shop-name">{{shopName}}</span>
    </div>
    <ala-order-goods-list @clickGoods="onClickGoods" :goodsList="goodsList"/>
    <ala-order-detail-price :priceData="orderDetailData"/>
    <ala-order-detail-info
    :hasMenu="!statusInfo.noMenu"
    :infoData="orderDetailData"/>
    <ala-order-node-menu
    @deliverSuccess="onDeliverSuccess"
    @pay="onPay"
    @timeout="onTimeout"
    :isIphoneX="isIphoneX"
    :hasCountdown="false"
    :orderData="orderDetailData"/>
  </div>
</template>

<script>
import alaOrderDetailHead from 'components/order/detail/orderDetailHead'
import alaOrderDetailLogistics from 'components/order/detail/orderDetailLogistics'
import alaOrderDetailAddress from 'components/order/detail/orderDetailAddress'
import alaOrderGoodsList from 'components/order/orderGoodsList'
import alaOrderDetailPrice from 'components/order/detail/orderDetailPrice'
import alaOrderDetailInfo from 'components/order/detail/orderDetailInfo'
import alaOrderNodeMenu from 'components/order/orderNodeMenu'

import { mapState, mapMutations, mapActions } from 'vuex'
import orderStatus from 'utils/orderStatus'
import storage from 'utils/storage'
import basis from 'utils/basis'
import lcUtil from 'utils/lcUtil'
import cache from 'utils/cache'
import systemInfo from 'utils/systemInfo'
import Tips from 'utils/tip'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      tipInfo: '正在全力读取物流信息...',
      logisticsData: {}
    }
  },
  props: {},
  computed: {
    ...mapState(['orderDetailData', 'isLogin', 'currentOrderId', 'userInfo']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    hasOrderDetailData() {
      return basis.isObjNotNull(this.orderDetailData)
    },
    shopName() {
      let result = '爱上街商城'
      if (this.orderDetailData.afStoreShopDto && this.orderDetailData.afStoreShopDto.shopName) {
        result = this.orderDetailData.afStoreShopDto.shopName
      }
      return result
    },
    // 商品列表
    goodsList() {
      return this.orderDetailData.childOrderList
    },
    // 订单状态信息
    statusInfo() {
      return orderStatus.info(this.orderDetailData.orderStatus)
    },
    // 是否显示物流信息
    isShowLogistics() {
      return this.orderDetailData.showLogistics === 1
    }
  },
  created() {},
  onShow() {
    if (storage.props.launchStatus === 1) return
    if (!this.isLogin) {
      basis.toLogin()
      return
    }

    let options = storage.props.launchOptions
    if (options && options.query.orderId) {
      this.setCurrentOrderId(options.query.orderId)

      // 判断是否有mobile参数，若有说明是从App微信支付直接跳转到小程序的
      if (options.query.mobile) {
        let mobile = options.query.mobile
        if (mobile !== this.userInfo.mobile) {
          storage.props.loginMobile = mobile
          basis.toLogin()
          return
        }
      }

      // 清空一下
      options.query = {}
      storage.props.launchOptions = options
    }
    this.tipInfo = '正在全力读取物流信息...'
    this.logisticsData = {}
    this.getPageData()
    Monitor.pageShow()
  },
  mounted() {},
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onUnload() {
    Tips.loaded()
  },
  watch: {},
  methods: {
    ...mapMutations(['setCurrentOrderId', 'updateOrderDetailData', 'setGoodsIdsData', 'setLocationCode']),
    ...mapActions(['getOrderDetailData', 'getOrderLogisticsData', 'judgeCollageOrder']),

    async getPageData() {
      // Tips.loading()
      await this.getOrderDetailData()
      // Tips.loaded()
      // 在两种情况下，需要查看物流
      if (this.isShowLogistics) {
        let cacheKey = 'orderLogistics0'
        let cacheData = cache.mapGet(cacheKey, this.currentOrderId)
        if (cacheData) {
          this.logisticsData = cacheData
        } else {
          this.logisticsData = {}
        }

        this.getOrderLogisticsData({ traces: 0 })
          .then(data => {
            this.logisticsData = data.newestInfo
            cache.mapPush(cacheKey, this.currentOrderId, this.logisticsData, cache.TIME_LONG)
          })
          .catch(() => {
            this.tipInfo = '没有取得物流信息'
          })
      }
    },
    onClickGoods(data) {
      // 更新源
      this.setLocationCode(lcUtil.order)

      // 查看商品详情
      this.setGoodsIdsData(data.goodsId)
      basis.toGoodsDetail()
    },
    // 确认收货
    onDeliverSuccess() {
      this.updateOrderDetail(orderStatus.statusOffset.success)
    },
    // 订单支付
    onPay(data) {
      if (data.status) {
        // 支付成功
        this.updateOrderDetail(orderStatus.statusOffset.success)
      }
    },
    onTimeout() {
      this.updateOrderDetail(orderStatus.statusOffset.timeout)
    },
    // 更新订单数据
    updateOrderDetail(offset) {
      let params = orderStatus.toStatusOffset(this.orderDetailData, offset)
      this.updateOrderDetailData(params)
    }
  },
  components: {
    alaOrderDetailHead,
    alaOrderDetailLogistics,
    alaOrderDetailAddress,
    alaOrderGoodsList,
    alaOrderDetailPrice,
    alaOrderDetailInfo,
    alaOrderNodeMenu
  }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-order-detail {
  .fill-page(@color-bg);
  min-height: auto;

  .flex-ver-center();

  .ala-order-detail__shop-name {
    margin-top: 10px;

    .flex-hor-center();
    width: 100%;
    height: 40px;
    .padding-h(@padding-h);
    box-sizing: border-box;

    background: white;
    font-size: 0;
    .node-head__icon {
      .icon('icon_shop', 20px, 20px);
    }
    .node-head__shop-name {
      margin-left: 13px;
      .flex-n();
      .show-line();
      font-family: PingFangSC-Medium;
      font-size: @font-size-list;
      color: @color-txt;
    }
  }

  .ala-order-node-menu {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    background: white;
    height: @order-detail-menu-height;
  }

  .iphonex-bottom {
    height: @order-detail-menu-height + @padding-iphonex;
  }

  .has-menu {
    margin-bottom: @order-detail-menu-height;
  }
}
</style>
