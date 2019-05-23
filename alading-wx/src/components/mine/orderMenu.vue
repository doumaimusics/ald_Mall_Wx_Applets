/**
* Created by xiejun on 2018/10/17.
* order 订单模块
*/
<template>
  <div class="ala-order-menu">
    <div class="ala-order-menu__head" @click="onAllClick">
      <span class="head-title">全部订单</span>
      <div class="head-icon-arrow"></div>
    </div>
    <div class="ala-order-menu__menu">
      <ala-order-menu-node :index="0" :nodeData="d1"/>
      <ala-order-menu-node :index="1" :nodeData="d2"/>
      <ala-order-menu-node :index="2" :nodeData="d3"/>
      <ala-order-menu-node :index="3" :nodeData="d4"/>
    </div>
  </div>
</template>

<script>
import alaOrderMenuNode from './orderMenuNode'
import { mapState, mapGetters, mapMutations } from 'vuex'
import navigate from 'utils/navigate'
import maidian from 'utils/maidian'

const createData = title => {
  return { title, amount: 0 }
}

export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['minePageInfo']),
    ...mapGetters(['hasMinePageInfo']),
    d1() {
      let d = createData('待支付')
      if (this.hasMinePageInfo) {
        d.amount = this.minePageInfo.newOrderNum
      }
      return d
    },
    d2() {
      let d = createData('待发货')
      if (this.hasMinePageInfo) {
        d.amount = this.minePageInfo.paidOrderNum
      }
      return d
    },
    d3() {
      let d = createData('待收货')
      if (this.hasMinePageInfo) {
        d.amount = this.minePageInfo.deliveredOrderNum
      }
      return d
    },
    d4() {
      let d = createData('售后')
      if (this.hasMinePageInfo) {
        d.amount = this.minePageInfo.afterSaleOrderNum
      }
      return d
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['setCurrentOrderStatusIndex']),
    onAllClick() {
      maidian.my(maidian.spm.my_allorder)
      this.setCurrentOrderStatusIndex(0)
      navigate.push({ url: '/pages/common/order', isNeedLogin: true })
    }
  },
  components: { alaOrderMenuNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@head-transX: 3.5px;
.ala-order-menu {
  margin: 15px @padding-h-mine 0;
  // .padding-h(9px);
  border-radius: 5px;
  background: white;

  .ala-order-menu__head {
    position: relative;
    height: 43px;
    margin-left: 16px;
    margin-right: 9px;
    .flex-hor-center();
    // .border-1px-bottom();

    .head-title {
      .flex-n();
      font-family: PingFangSC-Medium;
      font-size: @font-size-list;
      color: @color-txt;
      transform: translateY(@head-transX);
    }
    .head-icon-arrow {
      .icon-arrow();
      transform: translateY(@head-transX);
    }
  }

  .ala-order-menu__menu {
    height: 86px;
    .padding-h(13.5px);
    .flex-hor-center();
  }
}
</style>