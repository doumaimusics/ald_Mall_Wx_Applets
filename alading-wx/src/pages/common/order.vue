/**
* Created by xiejun on 2018/10/25.
* 我的订单
*/
<template>
  <div class="ala-order">
    <!-- tab list -->
    <div class="ala-order__tab-list">
      <div
      class="tab-list-node"
      v-for="(statusDesc, index) in statusDescList"
      @click="onNodeClick"
      :data-current="index"
      :key="index">
        <span
        :class="{ 'tab-list-node__title-select': index === currentOrderStatusIndex }"
        class="tab-list-node__title">
          {{ statusDesc }}
        </span>
        <div class="tab-list-node__subline" v-if="index === currentOrderStatusIndex"></div>
      </div>
    </div>
    <!-- order list -->
    <div v-if="showOrderList.length" class="ala-order__list">
      <ala-order-node
      v-for="(orderData, index) in showOrderList"
      @statusChange="onStatusChange"
      :index="index"
      :orderData="orderData"
      :key="orderData.orderId"/>

      <!-- 底部加载中 -->
      <ala-loadding-bottom :status="loadingBottomStatus"/>
    </div>
    <ala-list-empty v-else-if="!isLoad" title="没有相关订单"></ala-list-empty>
  </div>
</template>

<script>
import alaOrderNode from 'components/order/orderNode'
import alaListEmpty from 'components/common/listEmpty'
import alaLoaddingBottom from 'components/loadding/loaddingBottom'

import { mapState, mapMutations, mapActions } from 'vuex'

import basis from 'utils/basis'
import cache from 'utils/cache'
// import orderStatus from 'utils/orderStatus'
import Tips from 'utils/tip'
import wx from 'wx'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      // 订单状态列表
      statusDescList: ['全部', '待支付', '待发货', '待收货', '申请售后'],
      // 订单状态
      statusList: ['ALL', 'NEW', 'TODELIVER', 'DELIVERED', 'WAIT_REFUND'],
      // 分页页码
      pageNum: 1,
      // 订单列表
      orderList: [],
      // 缓存中的订单列表数据
      cacheOrderList: [],
      // 底部加载
      loadingBottomStatus: 0,
      // 标记是否处理数据加载中
      isLoad: false
    }
  },
  props: {},
  computed: {
    ...mapState(['currentOrderStatusIndex']),
    // 缓存key
    cacheKey() {
      return 'orderList_' + this.currentOrderStatusIndex
    },
    showOrderList() {
      if (this.orderList.length) return this.orderList
      if (this.cacheOrderList) return this.cacheOrderList
      return []
    }
  },
  created() {},
  onShow() {
    this.isLoad = true
    this.orderStatusIndexChange()
    this.toGetOrderList(true)
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  mounted() {},
  onPullDownRefresh() {
    this.refresh()
  },
  onReachBottom() {
    if (this.isReachBottomLoadding) return
    this.isReachBottomLoadding = true
    this.toGetOrderList()
  },
  watch: {},
  methods: {
    ...mapMutations(['setCurrentOrderStatusIndex']),
    ...mapActions(['getOrderList']),
    async refresh() {
      this.pageNum = 1
      this.cacheOrderList = this.orderList
      this.orderList = []
      this.loadingBottomStatus = 0
      await this.toGetOrderList(true)
      wx.stopPullDownRefresh()
    },
    async toGetOrderList(showLoading = false) {
      if (showLoading) Tips.loading()
      this.isLoad = true
      if (this.pageNum > 0) {
        let orderStatus = this.statusList[this.currentOrderStatusIndex]
        let params = { orderStatus, pageNum: this.pageNum }
        let data = await this.getOrderList(params).catch(() => {
          this.isReachBottomLoadding = false
        })
        if (data) {
          let list = data.orderList
          if (list && list.length) {
            if (this.pageNum === 1) {
              // 目前只缓存第一页的数据
              cache.listPush(this.cacheKey, this.pageNum, list, cache.TIMEOUT)
            }
            this.orderList = this.orderList.concat(list)
            this.pageNum++
            if (this.pageNum > data.pages) this.pageNum = -1
          } else {
            this.pageNum = -1
          }
        }
      }
      this.cacheOrderList = []
      this.loadingBottomStatus = this.pageNum < 0 ? 1 : 0
      this.isReachBottomLoadding = false
      this.isLoad = false
      if (showLoading) Tips.loaded()
    },
    onNodeClick(event) {
      let current = basis.getClickCurrent(event)
      if (current !== this.currentOrderStatusIndex) {
        // 改变之前的处理
        this.setCurrentOrderStatusIndex(current)
        this.orderStatusIndexChange()
        this.toGetOrderList(true)
      }
    },
    orderStatusIndexChange() {
      this.pageNum = 1
      this.orderList = []
      this.cacheOrderList = cache.listGet(this.cacheKey, this.pageNum)
      this.loadingBottomStatus = 0
    },
    // 订单状态改变
    onStatusChange(data) {
      this.refresh()
      // let index = data.index
      // if (this.currentOrderStatusIndex === 0) {
      // 全部tab下
      // let orderData = this.orderList[index]
      // let changeData = orderStatus.toStatusOffset(orderData, data.statusOffset)
      // basis.setObjProp(orderData, changeData)
      // } else {
      //   // 支付tab下
      //   this.orderList = this.orderList.slice(0, index).concat(this.orderList.slice(index + 1))
      // }
    }
  },
  components: { alaOrderNode, alaListEmpty, alaLoaddingBottom }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@tab-list-height: 40px;
.ala-order {
  .fill-page(@color-bg);
  .ala-order__tab-list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: @tab-list-height;
    z-index: 10;
    background: white;
    .flex-hor-center();

    .tab-list-node {
      .flex-n();
      height: 100%;
      font-size: 0;
      text-align: center;

      .tab-list-node__title {
        line-height: @tab-list-height;
        font-size: 12.5px;
        color: @color-txt;
      }
      .tab-list-node__title-select {
        font-family: PingFangSC-Medium;
        font-size: 15px;
      }
      .tab-list-node__subline {
        margin: auto;
        width: 29px;
        height: 3.5px;
        background: @color-btn;
        transform: translateY(-100%);
      }
    }
  }

  .ala-order__list {
    padding-top: @tab-list-height;
  }

  .ala-loadding-bottom {
    margin-top: 10px;
  }

  .ala-list-empty {
    margin-top: 200px;
  }
}
</style>
