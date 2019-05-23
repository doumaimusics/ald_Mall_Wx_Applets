<template>
  <div :class="choosedBillListShow?'choosedBillList choosedBillListActive':'choosedBillList'">
    <p class="title">
      <span>共计{{myRepaymentList_detail.moneny}}元</span>
      <span v-if="myRepaymentList_detail.status==='overdue'">逾期未还账单</span>
      <span v-if="myRepaymentList_detail.status==='out'">{{myRepaymentList_detail.month}}月账单</span>
      <span v-if="myRepaymentList_detail.status==='notOut'">{{myRepaymentList_detail.month}}月未出账单</span>
    </p>
    <ul v-if="myRepaymentList_detail.billList">
      <li v-for="(item,index) in myRepaymentList_detail.billList" :key="index">
        <div class="left">
          <p class="des show_one_line">{{item.name}}</p>
          <p class="time">{{item.payDateFix}}</p>
        </div>
        <div class="right">
          <p class="monthMoney">{{item.billAmount}}元</p>
          <p class="monthCount">{{item.billNper>10?item.billNper:'0'+item.billNper}}/{{item.nper}}期</p>
        </div>
      </li>
    </ul>
    <p class="sureBtn" :class="isIphoneX?'iphoneX':''" @click="sureBtnClick">确定</p>
  </div>
</template>

<script>
import systemInfo from 'utils/systemInfo'
export default {
  props: ['choosedBillListShow', 'myRepaymentList_detail'],
  data() {
    return {
      isIphoneX: systemInfo.isIphoneX
    }
  },
  computed: {},
  created() {},
  methods: {
    sureBtnClick() {
      this.$emit('sureBtnClick', false)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

.choosedBillList {
  width: 100%;
  background: #fff;
  position: fixed;
  left: 0;
  bottom:-100%;
  z-index: 20;
  transition: all 0.3s;
  .title {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid @color-border;
    span:nth-child(1) {
      font-size: @font-size-label;
      color: @color-txt;
    }
    span:nth-child(2) {
      font-size: @font-size-list;
      color: @color-txt-1;
      padding: 2px 0 0 11px;
    }
  }
  ul {
    height: 304px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    li {
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;
      border-bottom: 1px solid @color-border;
      .left {
        width: 180px;
        .des {
          font-size: @font-size-list;
          color: @color-txt;
        }
        .time {
          font-size: @font-size-tip;
          color: @color-txt-2;
          padding-top: 7px;
        }
      }
      .right {
        text-align: right;
        .monthMoney {
          font-size: @font-size-list;
          color: @color-price;
        }
        .monthCount {
          font-size: @font-size-tip;
          color: @color-txt-1;
          padding-top: 7px;
        }
      }
    }
  }
  .sureBtn {
    width:100%;
    height: 50px;
    background: @color-main;
    text-align: center;
    line-height: 51px;
    font-size: @font-size-btn;
    color: @color-txt;
  }
  .iphoneX{
    padding-bottom:@padding-iphonex
  }
}
.choosedBillListActive {
  bottom: 0;
}
</style>
