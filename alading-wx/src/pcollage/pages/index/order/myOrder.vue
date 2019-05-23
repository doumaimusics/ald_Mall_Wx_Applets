/**
* Created by xiejun on 2018/11/30.
* 我的
*/
<template>
  <div class="my-order-list-index">
    <div class="tab-list">
      <div
      class="tab-list-node"
      v-for="(statusDesc, index) in statusDescList"
      @click="onNodeClick(index)"
      :key="index">
        <span
        :class="{ 'select': index === myOrderIndex }"
        class="title">
          {{ statusDesc }}
        </span>
        <div class="subline" v-if="index === myOrderIndex"></div>
      </div>
    </div>

    <!-- order list -->
    <div v-if="showOrderList.length" class="order-list" :class="{ 'iphonex':isIphoneX }">
      <my-order-node
      v-for="(orderData, index) in showOrderList"
      :orderData="orderData"
      :key="index"/>
    </div>
    <ala-list-empty v-else-if="!isLoad" title="没有相关订单"></ala-list-empty>
  </div>
</template>

<script>
import myOrderNode from './myOrderNode'
import alaListEmpty from 'components/common/listEmpty'

import { mapState, mapGetters, mapMutations } from 'vuex'
import mixinsBase from 'mixins/mixinsBase'
import Monitor from 'utils/monitor'

export default {
  mixins: [mixinsBase],
  name: '',
  data() {
    return {
      // 订单状态列表
      statusDescList: ['全部', '待支付', '待分享', '拼单成功'],
      // 分页页码
      pageNum: 1
    }
  },
  props: {
    isLoad: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('collage', ['myOrderIndex']),
    ...mapGetters('collage', ['myOrderList']),
    orderListNew() {
      return this.myOrderList.filter(value => value.orderInfo.isNew)
    },
    orderListToShare() {
      return this.myOrderList.filter(value => value.orderInfo.isToShare)
    },
    orderListComplete() {
      return this.myOrderList.filter(
        value => value.orderInfo.isPaid || value.orderInfo.isDelivered || value.orderInfo.isFinished
      )
    },
    showOrderList() {
      let list = this.myOrderList
      if (this.myOrderIndex === 1) {
        list = this.orderListNew
      } else if (this.myOrderIndex === 2) {
        list = this.orderListToShare
      } else if (this.myOrderIndex === 3) {
        list = this.orderListComplete
      }
      return list
    }
  },
  created() {},
  mounted() {},
  onShow() {
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
    ...mapMutations('collage', ['setMyOrderIndex']),
    onNodeClick(index) {
      if (index !== this.myOrderIndex) {
        // 改变之前的处理
        this.setMyOrderIndex(index)
      }
    }
  },
  components: { myOrderNode, alaListEmpty }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@import '../conf.less';

@tab-list-height: 44px;
.my-order-list-index {
  .tab-list {
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

      .title {
        line-height: @tab-list-height;
        font-size: 15px;
        min-width: 60px;
        color: @color-txt-2;
        &.select {
          font-family: PingFangSC-Medium;
          font-size: @font-size-btn-1;
          color: @color-txt;
        }
      }
      .subline {
        margin: auto;
        width: 20px;
        height: 3px;
        background: @color-btn;
        transform: translateY(-200%);
      }
    }
  }

  .order-list {
    padding-top: @tab-list-height;
    .adapt-iphonex(@menu-height + @list-bottom);
  }

  /deep/.ala-list-empty {
    margin-top: 200px;
  }
}
</style>
