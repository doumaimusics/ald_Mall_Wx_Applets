/**
* Created by xiejun on 2018/12/10.
* 订单详情——菜单
*/
<template>
  <div
  v-if="isMenuVisible" 
  class="collage-detail-order-menu" 
  :class="{ 'iphonex':isIphoneX }">
    <!-- 待支付 -->
    <block v-if="statusInfo.isNew">
      <div class="btn-1" @tap="onPaidClick">立即付款</div>
      <div class="btn-2" @tap="onCancelNewTap">取消订单</div>
    </block>
    <!-- 待分享 -->
    <block v-else-if="statusInfo.isToShare">
      <div class="btn-1" @tap="onToShareTap">邀请好友</div>
      <div class="btn-2" @tap="onCancelShareTap">取消订单</div>
      <span class="auto-close-tip" v-html="autoCloseTip"></span>
    </block>
    <!-- 待发货 -->
    <block v-else-if="statusInfo.isPaid ">
      <div class="btn-2" @tap="onShowGuide">申请售后</div>
    </block>
    <!-- 待收货 -->
    <block v-else-if="statusInfo.isDelivered">
      <div class="btn-1" @tap="onDeliverClick">确认收货</div>
      <div class="btn-2" @tap="onShowGuide">申请售后</div>
      <div class="btn-2" @tap="onShowOrderLogisticsClick">查看物流</div>
    </block>
    <!-- 订单完成 -->
    <block v-else-if="statusInfo.isFinished">
      <div class="btn-2" @tap="onShowGuide">申请售后</div>
      <div class="btn-2" @tap="onDeleteTap">删除订单</div>
      <div class="btn-2" @tap="onShowOrderLogisticsClick">查看物流</div>
    </block>
    <!-- 售后处理中 -->
    <block v-else-if="statusInfo.isRefund">
      <div v-if="isShowLogistics" class="btn-1" @tap="onShowOrderLogisticsClick">查看物流</div>
      <div class="btn-2" @tap="onShowGuide">售后处理中</div>
    </block>
    <!-- 退款中 -->
    <block v-else-if="statusInfo.isRefunding">
      <div v-if="isShowLogistics" class="btn-1" @tap="onShowOrderLogisticsClick">查看物流</div>
    </block>
    <!-- 订单关闭 -->
    <block v-else-if="statusInfo.isOrderClosed">
      <div v-if="isShowLogistics" class="btn-1" @tap="onShowOrderLogisticsClick">查看物流</div>
      <div class="btn-2" @tap="onDeleteTap">删除订单</div>
    </block>
    <!-- 拼单失败 -->
    <block v-else-if="statusInfo.isFail">
      <div class="btn-2" @tap="onDeleteTap">删除订单</div>
    </block>
    <!-- 拼单关闭 -->
    <block v-else-if="statusInfo.isClosed">
      <div class="btn-2" @tap="onDeleteTap">删除订单</div>
    </block>
    <!-- 订单已取消 -->
    <block v-else-if="statusInfo.isCancel">
      <div class="btn-2" @tap="onDeleteTap">删除订单</div>
    </block>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Tips from 'utils/tip'
import navigate from 'utils/navigate'
import systemInfo from 'utils/systemInfo'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    orderDetail: {
      type: Object,
      default: null
    },
    statusInfo: {
      type: Object,
      default: null
    },
    isShowLogistics: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['userId', 'openId']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    isMenuVisible() {
      if (this.statusInfo.noDetailMenu && !this.isShowLogistics) return false
      return this.statusInfo && !this.statusInfo.noMenu
    }
  },
  created() {
    console.log('menu')
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['setCurrentOrderId']),
    ...mapMutations('collage', ['pushGoodsId']),
    // 显示引导
    onShowGuide() {
      Tips.toast('仅限爱上街APP内使用，下载安装APP可体验更多哦～')
    },
    // 未支付 取消订单
    onCancelNewTap() {
      this.$emit('cancelNew')
    },
    // 待分享 取消订单
    onCancelShareTap() {
      this.$emit('cancelShare')
    },
    // 去支付
    async onPaidClick() {
      this.$emit('pay')
    },
    // 去分享
    onToShareTap() {
      this.$emit('toShare')
    },
    // 查看物流
    onShowOrderLogisticsClick() {
      this.setCurrentOrderId(this.orderDetail.orderId)
      navigate.push({ url: '/pages/common/orderLogistics' })
    },
    // 确认收货
    async onDeliverClick() {
      this.$emit('toDeliver')
    },
    // 购买
    onBuyTap() {
      this.pushGoodsId(this.orderDetail.goodsId)
      navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
    },
    // 订单详情
    onOrderDetailTap() {
      let { orderId, pinOrderNo } = this.orderDetail
      this.setOrderDetailParams({ orderId, pinOrderNo })
      navigate.push({ url: '/pcollage/pages/detail/order/detailOrder' })
    },
    // 订单详情
    onDeleteTap() {
      this.$emit('delete')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-detail-order-menu {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  .border-1px-top();

  .flex-hor-center();
  flex-direction: row-reverse;
  padding-left: @padding-h;
  background: white;

  font-size: @font-size-txt;
  color: @color-txt;

  &.iphonex {
    padding-bottom: @padding-iphonex;
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

  .auto-close-tip {
    .flex-n();
    color: @color-txt-1;
    .num {
      margin-left: 4px;
      color: @color-warn;
    }
  }

  .btn-1 {
    .node-menu-btn();
    background: @color-btn;
  }

  .btn-2 {
    .node-menu-btn();
    line-height: 26px;
    color: @color-txt-1;
    border: 1px solid @color-btn-1;
  }
}
</style>