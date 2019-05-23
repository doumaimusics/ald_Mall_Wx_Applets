/**
* Created by xiejun on 2018/12/03.
* 我的订单列表节点菜单
*/
<template>
  <div v-if="!statusInfo.noMenu" class="collage-my-order-node-menu">
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
    <!-- 拼单成功 -->
    <block v-else-if="isCollageSuccess">
      <div class="btn-1" @tap="onOrderDetailTap">发货订单</div>
      <my-order-node-user-list :userInfoList="userInfoList"/>
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
import myOrderNodeUserList from './myOrderNodeUserList'

import { mapMutations } from 'vuex'

import Tips from 'utils/tip'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import collageBasis from 'pcollagecomp/basis'
export default {
  name: '',
  data() {
    return {
      autoCloseTip: ''
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
    statusInfo() {
      if (this.orderData) return this.orderData.orderInfo
      return null
    },
    userInfoList() {
      if (this.orderData) {
        let list = collageBasis.transUserInfoList(this.orderData)
        if (!list) {
          list = []
        }
        return list
      }
      return []
    },
    isCollageSuccess() {
      return (
        this.statusInfo.isPaid ||
        this.statusInfo.isDelivered ||
        this.statusInfo.isFinished ||
        this.statusInfo.isRefund ||
        this.statusInfo.isRefunding ||
        this.statusInfo.isOrderClosed
      )
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
    onPaidClick() {
      this.$emit('pay')
    },
    // 去分享
    onToShareTap() {
      this.$emit('toShare')
    },
    // 购买
    onBuyTap() {
      this.pushGoodsId(this.orderData.goodsId)
      navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
    },
    // 订单详情
    onOrderDetailTap() {
      this.$emit('detailTap')
    },
    // 订单详情
    onDeleteTap() {
      this.$emit('delete')
    },

    clearCountdown() {
      if (this.payKey) {
        basis.clearCountdown(this.payKey)
        this.payKey = undefined
        this.autoCloseTip = ''
      }
    },
    // 计时转换
    countTime(count) {
      return collageBasis.timeFormat(count)
    },
    // 显示支付倒计时
    showPayCountdown() {
      this.clearCountdown()
      if (!this.statusInfo.isToShare) return
      let duration = collageBasis.calcExpireDuration(this.orderData)
      this.payKey = basis.countdown(duration, {
        timer: data => {
          this.autoCloseTip = '拼单仅剩<span class="num">' + this.countTime(data.last) + '</span>'
        },
        complete: () => {
          // 倒计时结束
          this.$emit('timeout')
        }
      })
    }
  },
  components: { myOrderNodeUserList }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-my-order-node-menu {
  width: 100%;

  .flex-hor-center();
  flex-direction: row-reverse;
  padding-left: @padding-h;
  box-sizing: border-box;

  font-size: @font-size-txt;
  color: @color-txt;

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