<template>
  <div v-if="billDetail.status">
    <div v-if="billDetail.status==='noBill' || billDetail.status==='noInBill' || billDetail.status==='finsh'">
      暂无账单
    </div>
    <div class="top-box" v-else>
      <div class="date" v-if="billDetail.status==='overdue'">已逾期，共计应还(元)</div>
      <div class="date" v-if="billDetail.status==='out'">{{billDetail.str}}~{{billDetail.end}}</div>
      <div class="date" v-if="billDetail.status==='notOut'">剩余待还(元)</div>
      <div class="money">{{billMoney}}</div>
      <div class="txt" v-if="billDetail.status==='overdue'">包含逾期利息{{billDetail.overdeuInterest}}元</div>
      <div class="txt" v-if="billDetail.status==='out'">最后还款日{{billDetail.lastPayDay}}</div>
      <div class="txt" v-if="billDetail.status==='notOut'">账单未出，将于{{billDetail.outDay}}出账</div>
      <div class="btn" v-if="billDetail.status==='out' || billDetail.status==='overdue'" @click="repayBtn">立即还款</div>
    </div>
    <div class="mid-box" v-if="billDetail.status==='overdue'">共{{billDetail.overdueBillCount}}笔，共计{{billDetail.overdeuMoney}}元</div>
    <div class="mid-box" v-if="billDetail.status==='notOut' || billDetail.status==='out'">共{{billDetail.billList.length}}笔，共计{{billMoney}}元</div>
    <div class="btm-box">
      <bill-detail-list v-for="(item,index) in billDetail.billList" :key="index"  :listData="item"></bill-detail-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import billDetailList from './billDetailList'
import navigate from 'utils/navigate'
import storage from 'utils/storage'
import basis from 'utils/basis'
import Tips from 'utils/tip'
import Monitor from 'utils/monitor'
import wx from 'wx'
export default {
  data() {
    return {
      options: {}
    }
  },
  onLoad(options) {
    this.options = options
    Tips.loadDelay(() => (this.isLoading = false))
  },
  onUnload() {},
  onShow() {
    if (storage.props.launchStatus === 1) return
    if (!this.isLogin) {
      basis.toLogin()
      return
    }
    Monitor.pageShow()
    this.getData()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onPullDownRefresh() {
    this.getData()
  },
  mounted() {},
  computed: {
    ...mapState(['isLogin']),
    ...mapState('repay', ['billDetail']),
    billMoney() {
      const str = String(this.billDetail.money)
      return str.includes('.') ? str : str + '.00'
    }
  },
  methods: {
    ...mapActions('repay', ['getBillListByMonthAndYear']),
    repayBtn() {
      navigate.push({ url: '/prepay/pages/repayProcess', isNeedLogin: true })
    },
    async getData() {
      await this.getBillListByMonthAndYear({ billYear: this.options.year, billMonth: this.options.month })
      wx.stopPullDownRefresh()
    }
  },
  components: { billDetailList }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.top-box {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  .date {
    margin-top: 24px;
    height: 19px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 19px;
  }
  .money {
    margin-top: 2.5px;
    margin-bottom: 2.5px;
    height: 54px;
    font-size: 38px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(35, 35, 35, 1);
    line-height: 54px;
  }
  .txt {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 85, 70, 1);
    line-height: 20px;
  }
  .btn {
    margin-top: 21px;
    width: 222px;
    height: 38px;
    background: rgba(255, 225, 16, 1);
    border-radius: 22px;
    text-align: center;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 38px;
  }
}
.mid-box {
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  padding-top: 28px;
  text-align: center;
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(100, 100, 100, 1);
  line-height: 19px;
}
.btm-box {
  background: #fff;
}
.list-li {
  display: flex;
  box-sizing: border-box;
  padding: 12px 0 0 17px;
  width: 100%;
  height: 68px;
  border-bottom: solid 1px rgba(228, 228, 228, 0.7);
  &:nth-last-child(1) {
    border-bottom: none;
  }
  .left {
    width: 317px;
  }
  .top-line,
  .btm-line {
    display: flex;
    justify-content: space-between;
  }
  .btm-line {
    margin-top: 7px;
  }
  .title {
    width: 222px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .money {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 85, 70, 1);
    line-height: 20px;
  }
  .times {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(100, 100, 100, 1);
    line-height: 17px;
  }
  .date {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(150, 150, 150, 1);
    line-height: 17px;
  }
}
.icon-arrow {
  margin-top: 10px;
  margin-left: 5px;
  .icon('icon_arrow_gray', 24px, 24px);
}
</style>