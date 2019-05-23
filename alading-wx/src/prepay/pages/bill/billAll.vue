<template>
  <div class="bill-box">
    <div class="repay" @click="toBillRecord()">还款记录&nbsp;&gt;&gt;</div>
    <div class="card-box">
      <swiper class="stomsg" :indicator-dots="false" duration="500" next-margin="10px" previous-margin="10px" :style="{height: windowHeight}" @change="swiperChange">
          <swiper-item>
            <div class="bill-tab tab1" :class="{'ml':pageIndex===1}">
              <div class="txt">已出账单待还(元)</div>
              <div class="money" v-if="billAllData.money>0">{{billMoney}}</div>
              <div class="btn" v-if="billAllData.money>0" @click="repayBtn()">立即还款</div>
              <div class="icon-nobill" v-if="billAllData.money===0"></div>
              <div class="txt2" v-if="billAllData.money===0">暂无账单</div>
            </div>
            <div class="bill-list" :class="{'bill-list-ml':pageIndex===1}" v-if="billAllData.billList &&  billAllData.billList.length> 0">
              <div class="bill-ul" v-for="(item,index) in billAllData.billList" :key="index">
                <div class="line"></div>
                <div class="year">{{item.year}}</div>
                <bill-all-list v-for="(bills,index2) in item.bills" :key="index2" :bills="bills"></bill-all-list>
              </div>
            </div>
          </swiper-item>
          <swiper-item>
            <div class="bill-tab tab2" :class="{'ml2':pageIndex===1}">
              <div class="txt">未出账单(元)</div>
              <div class="money" v-if="notOutBillData.money>0">{{notOutBillMoney}}</div>
               <div class="icon-nobill" v-if="notOutBillData.money===0"></div>
              <div class="txt2" v-if="notOutBillData.money===0">暂无账单</div>
            </div>
            <div class="bill-list" :class="{'bill-list-ml2':pageIndex===0}" v-if="notOutBillData.billList &&  notOutBillData.billList.length> 0">
              <div class="bill-ul" v-for="(item,index) in notOutBillData.billList" :key="index">
                <div class="line"></div>
                <div class="year">{{item.year}}</div>
                <bill-all-list v-for="(bills,index2) in item.bills" :key="index2" :bills="bills"></bill-all-list>
              </div>
            </div>
          </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import billAllList from './billAllList'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import navigate from 'utils/navigate'
import storage from 'utils/storage'
import basis from 'utils/basis'
import Tips from 'utils/tip'
import Monitor from 'utils/monitor'
import wx from 'wx'
import maidian from 'utils/maidian'
export default {
  data() {
    return {
      pageIndex: 0
    }
  },
  components: { billAllList },
  computed: {
    ...mapState(['isLogin']),
    ...mapState('repay', ['billAllData', 'notOutBillData']),
    ...mapGetters('repay', ['nowBillData']),
    billMoney() {
      return this.formatMoney(this.billAllData.money)
    },
    notOutBillMoney() {
      return this.formatMoney(this.notOutBillData.money)
    },
    windowHeight() {
      let h = 1000
      wx.getSystemInfo({
        success: function(res) {
          h = (750 * res.windowHeight) / res.windowWidth
          console.log('h=', h)
        }
      })
      return h - 260 + 'px'
    }
  },
  mounted() {},
  onLoad() {
    Tips.loadDelay(() => (this.isLoading = false))
  },
  onUnload() {
    this.setSelectBill('outBill')
  },
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
  methods: {
    ...mapActions('repay', ['getMyBorrowListV1']),
    ...mapMutations('repay', ['setNowBillData', 'setSelectBill']),
    async getData() {
      await this.getMyBorrowListV1({ status: 'outBill' })
      await this.getMyBorrowListV1({ status: 'notOutBill' })
      maidian.view('miniprogram_bill_out')
      this.pageIndex = 0
      wx.stopPullDownRefresh()
    },
    swiperChange(obj) {
      let selectBill = obj.target.current === 0 ? 'outBill' : 'notOutBill'
      this.pageIndex = obj.target.current
      this.setSelectBill(selectBill)
      if (this.pageIndex === 0) {
        maidian.view('miniprogram_bill_out')
      } else {
        maidian.view('miniprogram_bill_in')
      }
      // this.setNowBillData(obj.target.current === 0 ? this.billAllData : this.notOutBillData)
    },
    toBillRecord() {
      navigate.push({ url: '/prepay/pages/record/list', isNeedLogin: true })
    },
    formatMoney(money) {
      const str = String(money)
      return str.includes('.') ? str : str + '.00'
    },
    repayBtn() {
      navigate.push({ url: '/prepay/pages/repayProcess', isNeedLogin: true })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

.bill-box {
  background: #fff;
}
.repay {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 17px;
  height: 50px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #2e2e2e;
  line-height: 20px;
}

.card-box {
  height: 100%;
  overflow-y: scroll;
}

.bill-tab {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  width: 340px;
  height: 164px;
  border-radius: 6px;
  box-sizing: border-box;
  .txt {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #fff;
    line-height: 20px;
  }
  .money {
    margin-top: 7px;
    margin-bottom: 22.5px;
    height: 44.5px;
    font-size: 38px;
    font-family: SFNSDisplay;
    color: #fff;
    line-height: 45px;
  }
  .btn {
    width: 189px;
    height: 32px;
    background: #fff;
    border-radius: 16px;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #77b4ff;
    line-height: 32px;
    text-align: center;
  }
  .icon-nobill {
    margin-top: 20px;
    margin-bottom: 8px;
    width: 71px;
    height: 52px;
    background-repeat: no-repeat;
    background-image: url('https://f.51fanbei.com/h5/vdian/icon_bill_nobill@2x.png');
    background-size: 100% 100%;
  }
  .txt2 {
    margin-left: 20px;
    width: 48px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 17px;
  }
}
.tab1 {
  background: linear-gradient(346deg, #73b6ff 0%, #8cc9ff 100%);
  box-shadow: 0px 3px 5px 0px #c3e2f3;
  margin-left: 8px;
}
.tab2 {
  background: linear-gradient(349deg, rgba(255, 185, 83, 1) 0%, rgba(255, 219, 133, 1) 100%);
  box-shadow: 0px 3px 5px 0px rgba(224, 217, 210, 1);
}

.bill-list {
  // min-height: 400px;
  margin-top: 20px;
  .money {
    margin-left: 17px;
    margin-top: 10px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(100, 100, 100, 1);
    line-height: 28px;
  }
}
.line {
  position: absolute;
  left: 11px;
  width: 1px;
  height: 100%;
  background: #f4f4f4;
  z-index: 0;
}
.bill-ul {
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  overflow: hidden;
}
.year {
  position: relative;
  z-index: 1;
  // margin-left: 10px;
  font-size: 11px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(150, 150, 150, 1);
  line-height: 15px;
}

.ml {
  margin-left: 13px !important;
}
.ml2 {
  margin-left: 4.5px !important;
}

.bill-list-ml {
  margin-left: -5px !important;
}
.bill-list-ml2 {
  margin-left: 10px !important;
}
</style>