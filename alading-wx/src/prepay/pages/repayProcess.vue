<template>
  <div class="repayProcess">
    <div v-if="isLoading" class="loading"></div>
    <div v-else>
      <ul class="billList">
        <li v-for="(item,index) in billListData" :key="index" v-if="item.billMoney>0">
          <div class="left">
            <div class="chooseIcon" v-if="item.name==='逾期账单'"><img :src="commonImgUrl+'icon_repayProcess01@2x.png'"></div>
            <div class="chooseIcon" @click="chooseClick(item,index)" v-if="item.name!='逾期账单' && item.isChoosed"><img :src="commonImgUrl+'icon_repayProcess02@2x.png'"></div>
            <div class="chooseIcon" @click="chooseClick(item,index)" v-if="!item.isChoosed"><img :src="commonImgUrl+'icon_repayProcess03@2x.png'"></div>
            <p class="billName">
              <span class="name">{{item.name}}</span><br/>
              <span class="isChoose" v-if="item.isChoosed">已全选，共{{item.chooseLen}}个</span>
              <span class="noChoose" v-else>未选择</span>
            </p>
          </div>
          <div class="right">
            <p class="billMoney" :class="item.isChoosed?'billMoneyActive':''">{{item.billMoney}}元</p>
            <p class="detailIcon" @click="detailIconClick(item)"><span></span></p>
          </div>
        </li>
      </ul>
      <div class="footerBtn">
        <p class="totalRepayMoney" :class="isIphoneX?'iphoneX':''"><span>实际还款：</span><span>{{totalRepayMoney}}元</span></p>
        <p class="repayNow" :class="isIphoneX?'iphoneX':''" @click="repayNowFun">立即还款</p>
      </div>
      <!--忘记密码-->
      <div class="forgetPassword" v-show="forgetPasswordShow">
        <p class="phoneDes">可联系客服更改支付密码<br/><span>4000025151</span></p>
        <p class="knowBtn" @click="knowBtnClick">我知道了</p>
      </div>
      <!--蒙版-->
      <div class="mask" v-show="maskShow" :style="{'z-index':forgetPasswordShow?'25':'10'}"></div>
      <!--组件-->
      <choosed-bill-list 
        :choosedBillListShow="choosedBillListShow" 
        @sureBtnClick="sureBtnClick" 
        :myRepaymentList_detail="myRepaymentList_detail"></choosed-bill-list>
      <choose-repay-type 
        :chooseRepayTypeShow="chooseRepayTypeShow" 
        @backIconClick="backIconClick" 
        @toKeyBoard="toKeyBoard" 
        :bankCardList="bankCardList"></choose-repay-type>
      <pay-keyboard 
        :payKeyboardShow="payKeyboardShow" 
        @completed="completed" 
        @backIcon_keyBoard="backIcon_keyBoard" 
        @forgetPwd="forgetPwd"></pay-keyboard>
    </div>
  </div>
</template>

<script>
import choosedBillList from '../components/choosedBillList'
import chooseRepayType from '../components/chooseRepayType'
import payKeyboard from '../components/payKeyboard'

import { mapState, mapActions, mapMutations } from 'vuex'
import storage from 'utils/storage'
import basis from 'utils/basis'
import Tips from 'utils/tip'
import Monitor from 'utils/monitor'
import maidian from 'utils/maidian'
import systemInfo from 'utils/systemInfo'
import md5 from 'js-md5'
import navigate from 'utils/navigate'
let commonImgUrl = 'https://img.51fanbei.com/h5/vdian/'

export default {
  components: {
    'choosed-bill-list': choosedBillList,
    'choose-repay-type': chooseRepayType,
    'pay-keyboard': payKeyboard
  },
  data() {
    return {
      isIphoneX: systemInfo.isIphoneX,
      commonImgUrl: commonImgUrl,
      billListData: [],
      totalRepayMoney: 0,
      bankChannel: '',
      cardId: '',
      billIds: [],
      maskShow: false,
      choosedBillListShow: false,
      chooseRepayTypeShow: false,
      payKeyboardShow: false,
      forgetPasswordShow: false
    }
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapState('repay', [
      'myRepaymentList',
      'payTypeStatus',
      'myRepaymentList_detail',
      'bankCardList',
      'submitRepaymentByYiBao'
    ])
  },
  created() {},
  onLoad() {
    Tips.loadDelay(() => (this.isLoading = false))
  },
  onShow() {
    if (storage.props.launchStatus === 1) return
    if (!this.isLogin) {
      basis.toLogin()
      return
    }
    Monitor.pageShow()
    maidian.view('miniprogram_bill_paying')
    // 初始化数据
    this.billListData = []
    this.totalRepayMoney = 0
    this.bankChannel = ''
    this.cardId = ''
    this.billIds = []
    this.maskShow = false
    this.choosedBillListShow = false
    this.chooseRepayTypeShow = false
    this.payKeyboardShow = false
    this.forgetPasswordShow = false
    this.initData()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  methods: {
    ...mapActions('repay', [
      'getMyRepaymentV1',
      'getPayTypeStatus',
      'getMyRepaymentDetailV1',
      'getBankCardList',
      'submitRepaymentByYiBao'
    ]),
    ...mapMutations('repay', ['setRefidsFun']),
    // 初始数据
    async initData() {
      await this.getMyRepaymentV1({})
      let arr = []
      arr[0] = {
        name: '逾期账单',
        billMoney: this.myRepaymentList.overdueMoney ? this.myRepaymentList.overdueMoney : 0,
        isChoosed: true,
        status: 'overdue',
        chooseLen: 0,
        billId: this.myRepaymentList.overdueBills ? this.myRepaymentList.overdueBills.join(',') : ''
      }
      arr[1] = {
        name: this.myRepaymentList.month + '月账单',
        billMoney: this.myRepaymentList.outMoney ? this.myRepaymentList.outMoney : 0,
        isChoosed: false,
        status: 'out',
        chooseLen: 0,
        billId: this.myRepaymentList.outBills ? this.myRepaymentList.outBills.join(',') : ''
      }
      this.billListData = arr
      // 有逾期账单
      console.log(this.billListData)
      if (this.billListData[0].billMoney > 0) {
        this.totalRepayMoney = this.billListData[0].billMoney
        this.billIds.push(this.billListData[0].billId)
        await this.getMyRepaymentDetailV1({ status: this.billListData[0].status })
        this.billListData[0].chooseLen = this.myRepaymentList_detail.billList.length
      }
    },
    // 选择账单
    async chooseClick(item, index) {
      if (item.isChoosed) {
        item.isChoosed = false
        this.totalRepayMoney -= item.billMoney
      } else {
        item.isChoosed = true
        this.totalRepayMoney += item.billMoney
        await this.getMyRepaymentDetailV1({ status: item.status })
        item.chooseLen = this.myRepaymentList_detail.billList.length
      }
      this.totalRepayMoney = parseFloat(this.totalRepayMoney.toFixed(2))
      let idArr = []
      this.billListData.forEach(item => {
        if (item.isChoosed && item.chooseLen > 0) {
          idArr.push(item.billId)
        }
      })
      this.billIds = idArr
    },
    // 查看已选账单列表
    async detailIconClick(item) {
      await this.getMyRepaymentDetailV1({ status: item.status })
      this.maskShow = true
      this.choosedBillListShow = true
    },
    async repayNowClick() {
      await this.getPayTypeStatus({ sceneType: 'REPAYMENT' })
      await this.getBankCardList({ cardType: 1 })
      this.maskShow = true
      this.chooseRepayTypeShow = true
    },
    // 立即还款
    repayNowFun() {
      console.log(this.billIds, '1111')
      if (this.billIds.length > 0) {
        this.repayNowClick()
      } else {
        Tips.toast('请选择账单')
      }
    },
    // 已选择账单--确定
    sureBtnClick(data) {
      this.maskShow = data
      this.choosedBillListShow = data
    },
    // 选择支付方式--返回
    backIconClick(data) {
      this.maskShow = data
      this.chooseRepayTypeShow = data
    },
    // 选择银行卡--去输入密码
    toKeyBoard(data) {
      this.maskShow = true
      this.payKeyboardShow = true
      this.bankChannel = data.bankChannel
      this.cardId = data.cardId
    },
    // 选择银行卡--返回
    backIcon_keyBoard(data) {
      this.payKeyboardShow = data
    },
    // 密码输入完成
    async completed(data) {
      Tips.loading()
      let obj = {
        billIds: this.billIds.join(',').replace(/ /g, ''),
        repaymentAmount: this.totalRepayMoney,
        actualAmount: this.totalRepayMoney,
        couponId: '',
        useRebateAmount: 0,
        cardId: this.cardId,
        payPwd: md5(data),
        bankChannel: this.bankChannel
      }
      let submitRepayData = await this.submitRepaymentByYiBao(obj)
      if (submitRepayData) {
        Tips.loaded()
        this.setRefidsFun(submitRepayData.refId)
        navigate.replace({ url: '/prepay/pages/repaySuccess' })
      }
    },
    // 忘记密码
    forgetPwd() {
      this.forgetPasswordShow = true
    },
    knowBtnClick() {
      this.forgetPasswordShow = false
    },
    minusArr(arr) {
      let result = []
      let obj = {}
      for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = 1
      }
      for (let j = 0; j < this.length; j++) {
        if (!obj[this[j]]) {
          obj[this[j]] = 1
          result.push(this[j])
        }
      }
      return result
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

.repayProcess {
  width: 100%;
  margin-top: 10px;
  .billList {
    li {
      width: 91.6%;
      padding: 0 4.2%;
      height: 60px;
      background: #fff;
      border-bottom: 1px solid @color-border;
      display: flex;
      justify-content: space-between;
      position: relative;
      .left {
        display: flex;
        align-items: center;
        .chooseIcon {
          position: absolute;
          width: 45.8%;
          height: 60px;
          left: 4.2%;
          top: 0;
          img {
            width: 16px;
            height: 16px;
            margin-top: 22px;
          }
        }
        .billName {
          color: @color-txt;
          margin-left: 27px;
          .name {
            font-size: @font-size-list;
          }
          .isChoose {
            font-size: @font-size-tip;
            opacity: 0.8;
          }
          .noChoose {
            font-size: @font-size-tip;
            color: @color-txt-3;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .billMoney {
          font-size: @font-size-label;
          color: @color-txt-1;
          margin-right: 27px;
        }
        .billMoneyActive {
          color: @color-price;
        }
        .detailIcon {
          position: absolute;
          width: 45.8%;
          height: 60px;
          right: 4.2%;
          top: 0;
          span {
            .icon('icon_arrow', 20px, 20px);
            position: absolute;
            right: 0;
            top: 22px;
          }
        }
      }
    }
  }
  .footerBtn {
    width: 100%;
    display: flex;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    .iphoneX {
      padding-bottom: @padding-iphonex;
    }
    .totalRepayMoney {
      width: 57.3%;
      height: 50px;
      line-height: 51px;
      border-top: 1px solid @color-border;
      box-sizing: border-box;
      span:nth-child(1) {
        font-size: @font-size-list;
        color: @color-txt-1;
        padding-left: 22px;
      }
      span:nth-child(2) {
        font-size: @font-size-label;
        color: @color-price;
      }
    }
    .repayNow {
      width: 42.7%;
      height: 50px;
      line-height: 51px;
      text-align: center;
      background: @color-main;
      font-size: @font-size-btn;
      color: @color-txt;
    }
  }
  .forgetPassword {
    width: 209px;
    padding: 33px 25px 26px;
    background: #fff;
    border-radius: 11px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 30;
    .phoneDes {
      font-size: 19px;
      color: @color-txt;
      line-height: 27px;
      font-family: PingFangSC-Medium;
      span {
        color: @color-status;
      }
    }
    .knowBtn {
      width: 100%;
      height: 41px;
      background: @color-main;
      border-radius: 21px;
      margin-top: 19px;
      line-height: 42px;
      font-size: @font-size-btn;
      color: @color-txt;
      font-family: PingFangSC-Medium;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
    opacity: 0.6;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
}
</style>
