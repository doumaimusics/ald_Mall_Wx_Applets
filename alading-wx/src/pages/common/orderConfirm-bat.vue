/**
* Created by huangyilu on 2018/10/16.
* 确认订单
*/
<template>
  <div :class="['confirm-order-view', {'confirm-order-view-iphonex': isIphoneX }]">

    <div class="confirm-order__notice" >通知：请勿替陌生人购买商品，谨防上当受骗</div>
    <!-- 收货地址 -->
    <div :class="['confirm-order__address ', {'add': userDefAddress }]" @click.stop="goAddressListFn">
      <div class="address-title" v-if="!userDefAddress" @click.stop="goAddAddressFn" >请添加收货地址</div>
      <div class="address-icon" v-if="userDefAddress"></div>
      <div class="address-base" v-if="userDefAddress">
        <div>{{ userDefAddress.consignee }} <span>{{ userDefAddress.mobile }}</span> </div>
        <div>{{ addressDetail }}</div>
      </div>
      <div class="arrow"></div>
      <div class="address-bgicon"></div>
    </div>
    <!-- 商品 -->
    <div class="confirm-order__goods">
      <div class="goods-title show_one_line">
        <div class="goods-title__icon"></div>
        {{ goodsShop }}
      </div>
      <div class="goods-info">
        <div ><img class="goods-info__img" :src=" confirmGoodsData.goodsInfo.goodsIcon " alt=""></div>
        <div class="goods-info__base">
          <div class="show_one_line">{{ confirmGoodsData.goodsInfo.goodsName }}</div>
          <div class="base-spec show_one_line">规格：{{ confirmGoodsData.goodsSpec.speDetail }}</div>
          <div class="base-price"> <span>￥{{ confirmGoodsData.goodsSpec.goodsPrice }}</span> <div>x{{ confirmGoodsData.goodsSpec.goodsNum }}</div> </div>
        </div>
      </div>
      <div class="goods-freight">
        <span>运费</span>
        <div>快递￥{{ freight }}</div>
      </div>
      <div class="goods-freight" v-if="offerPrice && offerPrice.allDiscountAmout > 0">
        <span>活动优惠</span>
        <div>已省{{ offerPrice.allDiscountAmout }}元</div>
      </div>
      <div class="goods-total">共1件商品 小计：<span>￥{{ totalPrice }}</span></div>
    </div>
    <!-- 优惠 -->
    <div class="confirm-order__coupon">
      <div class="coupon-item isarrow" v-if=" couponList && couponList.length > 0 " @click="couponFn">
        <div class="left">优惠券</div>
        <div class="middle">{{ useCoupon }}</div>
        <div > <div class="arrow"></div> </div>
      </div>
      <div class="coupon-item" v-if="goldShow" >
        <div class="left">金币抵扣</div>
        <div class="middle">{{ goldTxt }}<div class="ques-icon" @click="goldDialogShow=true"></div> </div>
        <div > <ala-switch
        :switchTap="goldSwitch"
        :isCanTap="goldSwitchCanTap"
        @getSwitchDataFn="getGoldSwitchDataFn" /> </div>
      </div>
      <div class="coupon-item" v-if="overShow" >
        <div class="left">余额抵扣</div>
        <div class="middle">{{ overTxt }} <div class="ques-icon" @click="overDialogShow=true"></div> </div>
        <div > <ala-switch
        :switchTap="overSwitch"
        :isCanTap="overSwitchCanTap"
        @getSwitchDataFn="getOverSwitchDataFn" /> </div>
      </div>
      <div class="coupon-total">
        <div class="coupon-total__item flex"> <div class="flex-1">商品总计</div> <div>￥{{ totalPrice }}</div> </div>
        <div class="coupon-total__item flex" v-if="comSelectedCoupon" > <div class="flex-1">优惠减免</div> <div>-￥{{ couponPriceFinal }}</div> </div>
        <div class="coupon-total__item flex" v-if="overSwitch && overShow" > <div class="flex-1">余额支付</div> <div>-￥{{ overPrice }}</div> </div>
        <div class="coupon-total__item flex" v-if="goldSwitch && goldShow" > <div class="flex-1">金币抵扣</div> <div>-￥{{ orderPriceInfo ? orderPriceInfo.goldCoinAmount : 0 }}</div> </div>
      </div>
    </div>
    <!-- 支付按钮 -->
    <div :class="['confirm-order__paybtn', {'pay-iphone-bottom': isIphoneX }]" @click="payFn" >微信支付￥{{ finalAmount }}</div>
    <!-- 金币说明弹窗 -->
    <ala-dialog v-if="goldDialogShow" :dialogTitle="goldDialog.title"
    :dialogContent="goldDialog.content"
    @dialogShowFn="dialogShowFn" />
    <!-- 余额说明弹窗 -->
    <ala-dialog v-if="overDialogShow" :dialogTitle="overDialog.title"
    :dialogContent="overDialog.content"
    @dialogShowFn="dialogShowFn" />

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import alaSwitch from 'components/alaUI/ala-switch'
import alaDialog from 'components/alaUI/ala-dialog'
import navigate from 'utils/navigate'
import systemInfo from 'utils/systemInfo'
import pay from 'utils/pay'
import Tips from 'utils/tip'

import maidian from 'utils/maidian'
import Monitor from 'utils/monitor'

const formatGoodsTitle = {
  TAOBAO: '淘宝',
  TMALL: '天猫',
  SELFSUPPORT: '自营'
}

export default {
  name: '',
  data() {
    return {
      goodsId: '',
      // 余额
      overDialogShow: false,
      overSwitch: false,
      overSwitchCanTap: true,
      overDialog: {
        title: '余额使用说明',
        content: ['1.余额抵扣创建订单后即减扣', '2.取消订单，退款退货等情况余额将会原路返回至您的账户余额']
      },
      // 金币
      goldDialogShow: false,
      goldSwitch: false,
      goldSwitchCanTap: true,
      goldDialog: {
        title: '金币使用说明',
        content: [
          '1.金币抵扣创建订单后即减扣金币',
          '2.取消订单，退款退货等情况金币将会原路返回至您的金币余额中',
          '3.金币抵扣比率以确认订单页实际计算为准'
        ]
      },

      // 地址信息
      userDefAddress: null,
      // 优惠券列表
      couponList: [],

      // 优惠券优惠价
      couponPrice: null,
      // 优惠信息
      offerPrice: null,
      // 查询到的 商品下单前的信息
      orderPriceInfo: null,
      // 余额本额
      overagePrice: null,
      // 余额可抵扣
      overPrice: null,
      // 支付成功 地址/价钱数据
      paySeccsssData: null,

      // 实际支付
      actualAmount: null,
      // 小计金额
      totalPrice: 0
    }
  },
  props: {},
  computed: {
    ...mapState(['userSelectAddress', 'availableCouponIndex', 'lc']),
    ...mapGetters(['comSelectedCoupon', 'confirmGoodsData', 'userId', 'openId']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    addressDetail() {
      return this.userDefAddress
        ? this.userDefAddress.province +
            this.userDefAddress.city +
            this.userDefAddress.county +
            this.userDefAddress.address
        : ''
    },
    couponPriceFinal() {
      if (!this.couponPrice) return 0
      return this.couponPrice.toFixed(2)
    },
    // 商品来源
    goodsShop() {
      if (!this.confirmGoodsData) return
      // 店铺商品显示 店铺名称
      if (this.confirmGoodsData.goodsInfo.shopName) {
        return this.confirmGoodsData.goodsInfo.shopName
      } else {
        return formatGoodsTitle[this.confirmGoodsData.goodsInfo.source]
      }
    },
    // 运费
    freight() {
      if (this.orderPriceInfo && this.orderPriceInfo.freightAmount) {
        return this.orderPriceInfo.freightAmount.toFixed(2)
      }
      return 0
    },
    // 优惠券 DISCOUNT 折扣券
    useCoupon() {
      console.log(' comSelectedCoupon =  ', this.comSelectedCoupon)
      if (this.comSelectedCoupon === undefined) {
        if (this.couponList.length > 0) {
          // 默认选中第一张
          this.couponPrice = this.couponList[0].useCouponAmount
          return '优惠券' + this.couponList.length + '张可用'
        }
        return
      }
      if (+this.comSelectedCoupon.useCouponAmount >= +this.totalPrice) {
        this.couponPrice = this.totalPrice
        // 如果优惠券金额正好等于小计金额 - 0.01
        if (+this.comSelectedCoupon.useCouponAmount === +this.totalPrice) {
          this.couponPrice = this.totalPrice - 0.01
        }
      } else {
        this.couponPrice = this.comSelectedCoupon.useCouponAmount
      }
      return '已使用1张优惠券，优惠' + Number(this.couponPrice).toFixed(2) + '元'
    },
    // 金币抵扣 金额 根据比例计算
    goldTxt() {
      if (!this.orderPriceInfo) return
      return '使用' + this.orderPriceInfo.goldCoinCount + '金币可抵扣' + this.orderPriceInfo.goldCoinAmount
    },
    // 金币是否显示
    goldShow() {
      if (!this.orderPriceInfo) return
      if (this.orderPriceInfo.goldCoinCount <= 0 || this.confirmGoodsData.goodsSpec.goodsPrice <= 0.01) {
        this.goldSwitch = false
        return false
      }
      // 如果使用了优惠券，则减去优惠券所抵扣的价钱
      let totPrice = +this.totalPrice
      if (this.comSelectedCoupon && totPrice !== 0.01) {
        totPrice = this.totalPrice - this.couponPrice
      }
      // 如果有可用金币，余额足够的情况下，打开余额开关，金币行不显示
      if (this.overSwitch && this.overagePrice >= totPrice) {
        this.goldSwitch = false
        return false
      }
      return true
    },
    // 余额抵扣
    overTxt() {
      if (!this.overagePrice) return
      if (this.overagePrice < 0.5) {
        this.overSwitch = false
        this.overSwitchCanTap = false
        return '可用余额少于0.5'
      }
      // 如果使用了优惠券，则减去优惠券所抵扣的价钱
      let totPrice = +this.totalPrice
      if (this.comSelectedCoupon && totPrice !== 0.01) {
        totPrice = this.totalPrice - this.couponPrice
      }
      // 如果使用了金币，则减去金币所抵扣的价钱(然而 测试说 不减去！！我觉得不减逻辑有问题啊！说是设计如此啊！就是不要减啊！气！)
      // if (this.goldSwitch) {
      //   totPrice = totPrice - this.orderPriceInfo.goldCoinAmount
      // }
      if (+Number(totPrice).toFixed(2) === 0.01) {
        this.overPrice = 0.01
        return '余额抵扣' + Number(totPrice).toFixed(2) + '元'
      }
      if (this.overagePrice < totPrice) {
        this.overPrice = Number(this.overagePrice).toFixed(2)
        return '余额抵扣' + Number(this.overagePrice).toFixed(2) + '元'
      } else if (this.overagePrice >= totPrice) {
        this.overPrice = Number(totPrice - 0.01).toFixed(2)
        return '余额抵扣' + Number(this.overPrice).toFixed(2) + '元'
      }
    },
    // 余额是否显示
    overShow() {
      if (!this.overagePrice || !this.confirmGoodsData) return
      if (this.overagePrice <= 0) {
        this.overSwitch = false
        return false
      }
      return true
    },
    // 最终支付
    finalAmount() {
      let total = this.totalPrice
      let overP = 0
      let goldP = 0
      let couponP = 0
      // 如果用了余额
      if (this.overSwitch) {
        overP = this.overPrice
        console.log(' overprice ', this.overPrice)
        if ((+this.overPrice === total) === 0.01) {
          overP = 0
        }
      }
      // 如果用了金币
      if (this.goldSwitch) {
        goldP = this.orderPriceInfo ? this.orderPriceInfo.goldCoinAmount : 0
      }
      // 如果用了优惠券
      if (this.comSelectedCoupon) {
        couponP = this.couponPrice
      }
      total = total - overP - goldP - couponP
      console.log(' total == ', total)
      console.log(' overp == ', overP)
      console.log(' goldP == ', goldP)
      console.log(' couponP == ', couponP)
      return Number(total).toFixed(2)
    },
    payOrderData() {
      console.log(' userDefAddress rid ==  ', this.userDefAddress)
      let res = {
        openId: this.openId,
        goodsId: this.confirmGoodsData ? this.confirmGoodsData.goodsInfo.goodsId : 0,
        userId: this.userId,
        addressId: this.userDefAddress ? this.userDefAddress.rid : 0,
        actualAmount: this.totalPrice,
        count: this.confirmGoodsData ? this.confirmGoodsData.goodsSpec.goodsNum : 0,
        invoiceHeader: ' ',
        payType: 'wechat_app',
        userCouponId: this.comSelectedCoupon ? this.comSelectedCoupon.rid : 0,
        goodsPriceId: this.confirmGoodsData ? this.confirmGoodsData.goodsSpec.goodsSpecId : 0,
        activityType: this.confirmGoodsData ? this.confirmGoodsData.goodsInfo.activityType : 0,
        activityId: this.confirmGoodsData ? this.confirmGoodsData.goodsInfo.activityType : 0,
        // 是否使用余额支付，1使用，0不使用
        accountType: this.overSwitch ? 1 : 0,
        // 是否使用金币支付，1使用，0不使用
        goldCoinType: this.goldSwitch ? 1 : 0,
        // 1保存订单，0仅计算订单信息
        addOrder: 0,
        // location code 来源 用于标记用户下单的来源
        lc: this.lc
      }
      return res
    }
  },
  created() {},
  onShow() {
    // 检查是否有地址
    if (this.userSelectAddress) {
      this.userDefAddress = this.userSelectAddress
      return
    }
    this.getUserDefaultAddress()
    this.toUnload = false
    Monitor.pageShow()
  },
  onUnload() {
    // 清除状态
    this.goldSwitch = false
    this.overSwitch = false
    this.goldSwitchCanTap = true
    this.overSwitchCanTap = true
    this.toUnload = true
    this.setAvailableCouponIndex(-2)
    this.setUserSelectAddress(null)
  },
  onHide() {
    // 清除状态
    this.goldSwitch = false
    this.overSwitch = false
    this.goldSwitchCanTap = true
    this.overSwitchCanTap = true
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  mounted() {
    // clear
    this.orderPriceInfo = null
    this.overPrice = null
    // 埋点
    maidian.shop(maidian.spm.shop_buy)
    // 获取 可用余额
    this.getUserOver()
    if (this.$root.$mp.query.clearAvCoupon && this.comSelectedCoupon) {
      // 清除 上一次已选择的优惠券
      this.setAvailableCouponIndex(-1)
      console.log(' setAvailableCouponIndex ')
    }
    console.log(' pre totalPrice = ', this.totalPrice)
    // 获取 活动优惠
    this.getGoodsDiscount({
      goodsId: this.confirmGoodsData.goodsInfo.goodsId,
      goodsNum: this.confirmGoodsData.goodsSpec.goodsNum,
      goodsPrice: this.confirmGoodsData.goodsSpec.goodsPrice
    })
    console.log('this.confirmGoodsData == ', this.confirmGoodsData)
    // console.log('confirm order mounted', this.confirmGoodsData)
    // console.log(' comSelectedCoupon ', this.comSelectedCoupon)
  },
  watch: {
    userSelectAddress(val, oldVal) {
      if (!oldVal || !val) return
      // 用户更换选择地址
      this.userDefAddress = this.userSelectAddress
      this.getOrderPriceData()
    },
    // 用户选择的优惠券发生改变
    availableCouponIndex(val, oldVal) {
      if (oldVal === -2 || val === -2) return
      this.getOrderPriceData()
    }
  },
  methods: {
    ...mapMutations(['setCurrentOrderStatusIndex', 'setIsSelectAddress', 'setUserSelectAddress']),
    ...mapActions([
      'getAvailableCouponListData',
      'getUserDefaultAddressData',
      'getUserBalanceData',
      'getGoodsDiscountData',
      'requestToPayOrder',
      'getMineInfo',
      'setAvailableCouponIndex'
    ]),
    // 获取 可用优惠券列表
    async getAvailableCouponList(params) {
      let data = await this.getAvailableCouponListData(params)
      if (data.couponList !== null) {
        this.couponList = data.couponList
        // 默认选中第一张
        this.setAvailableCouponIndex(0)
      } else {
        this.couponList = []
      }
      // 获取 下单计算信息
      this.getOrderPriceData()
    },
    // 获取 用户地址
    async getUserDefaultAddress() {
      let data = await this.getUserDefaultAddressData({ userId: this.userId })
      if (data.address === null) {
        this.userDefAddress = undefined
        return
      }
      this.userDefAddress = data
      console.log(' getUserDefaultAddress ', this.userDefAddress)
    },
    // 获取 用户余额
    async getUserOver() {
      let data = await this.getUserBalanceData({ userId: this.userId })
      this.overagePrice = data.amount
      console.log(' overagePrice ', this.overagePrice)
    },
    // 获取 下单计算信息
    async getOrderPriceData() {
      this.payOrderData.goldCoinType = 1
      console.log(' payOrderData requestToPayOrder ===== ', this.payOrderData)
      let data = await this.requestToPayOrder(this.payOrderData)
      this.orderPriceInfo = data
      this.actualAmount = data.actualAmount
      this.comptTotalPrice()
      Tips.loaded()
      console.log(' this.orderData ===== ', this.orderPriceInfo)
    },
    // 获取 活动优惠信息
    async getGoodsDiscount(params) {
      Tips.loading()
      let data = await this.getGoodsDiscountData(params)
      this.offerPrice = data
      // 计算小计 金额
      this.comptTotalPrice()
      // 获取 可用优惠券 （ 商品金额（秒杀，促销，折扣后的）- 满减优惠的 ）价钱 (如果是秒杀商品 不取优惠券)
      if (this.confirmGoodsData) {
        this.getAvailableCouponList({
          actualAmount: this.totalPrice - this.freight,
          goodsId: this.confirmGoodsData.goodsInfo.goodsId,
          pageNum: 1,
          userId: this.userId
        })
      }
    },
    // 计算小计 金额
    comptTotalPrice() {
      if (!this.confirmGoodsData) return 0
      let goodsPrice = this.confirmGoodsData.goodsSpec.goodsPrice
      let goodsNum = this.confirmGoodsData.goodsSpec.goodsNum
      let allDiscountAmout = this.offerPrice.allDiscountAmout
      let freight = +this.freight
      let total = goodsPrice * goodsNum - allDiscountAmout + freight
      console.log(' 计算小计 金额 comptTotalPrice totalprice =  ', total)
      this.totalPrice = Number(total).toFixed(2)
    },
    // 跳转 优惠券
    couponFn() {
      navigate.push({ url: '/pages/common/couponChoose' })
    },
    // 关闭弹窗
    dialogShowFn() {
      this.goldDialogShow = false
      this.overDialogShow = false
    },
    // 金币开关
    getGoldSwitchDataFn(data) {
      this.goldSwitch = data
      console.log('goldSwitch = ', data)
    },
    // 余额开关
    getOverSwitchDataFn(data) {
      this.overSwitch = data
      console.log('overSwitch = ', data)
      if (this.overSwitch) {
        this.payOrderData.accountType = 1
      } else {
        this.payOrderData.accountType = 0
      }
      // 获取 下单计算信息
      this.getOrderPriceData()
    },
    goAddAddressFn() {
      navigate.push({ url: '/pages/common/addressAdd' })
    },
    goAddressListFn() {
      this.setIsSelectAddress(true)
      navigate.push({ url: '/pages/common/address' })
    },
    async payFn() {
      console.log(' pay data = ', this.payOrderData)
      // 埋点
      maidian.shop(maidian.spm.shop_pay)
      if (this.payOrderData) {
        // 下单 -- 调起支付
        this.payOrderData.goldCoinType = this.goldSwitch ? 1 : 0
        this.payOrderData.addOrder = 1
        this.payOrderData.actualAmount = this.finalAmount
        let data = await this.requestToPayOrder(this.payOrderData)
        if (data) {
          // 调起微信支付
          pay
            .requestPayment(data)
            .then(res => {
              this.getMineInfo()
              console.log(' --- 支付成功 并跳转 --- ')
              navigate.replace({ url: '/pages/common/paySuccess?orderId=' + data.orderId })
            })
            .catch(errorMsg => {
              this.setCurrentOrderStatusIndex(1)
              console.log(' --- 支付失败 并跳转 --- ')
              navigate.replace({ url: '/pages/common/order' })
            })
        }
      }
    }
  },
  components: { alaSwitch, alaDialog }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.confirm-order-view {
  color: @color-txt;
  font-size: 0.28rem;
  padding-bottom: 60px;
  &.confirm-order-view-iphonex {
    padding-bottom: 124px;
  }
  .confirm-order__notice {
    background-color: #fffad9;
    text-align: center;
    font-size: 12px;
    padding: 5px 0;
  }
  .confirm-order__address.add {
    padding: 15px;
  }
  .confirm-order__address {
    background-color: #ffffff;
    padding: 20px 10px 20px 15px;
    position: relative;
    display: flex;
    align-items: center;
    .address-title {
      .flex-n(1);
    }
    .address-icon {
      .icon('icon_adress_black', 23px, 23px);
    }
    .address-base {
      font-size: 0.26rem;
      padding: 0 10px;
      .flex-n(1);
      div:first-child {
        font-family: PingFangSC-Medium;
        color: @color-txt;
        margin-bottom: 5px;
        font-size: 0.28rem;
        span {
          margin-left: 5px;
        }
      }
    }
    .address-bgicon {
      position: absolute;
      bottom: 0;
      left: 0;
      .icon('icon_adress_line', 100%, 4px);
    }
    .arrow {
      .icon('icon_arrow_gray', 24px, 24px);
    }
  }
  .confirm-order__goods {
    background-color: #ffffff;
    margin: 10px 0;
    .goods-title {
      font-size: 14px;
      color: @color-txt;
      display: flex;
      padding: 15px;
    }
    .goods-title__icon {
      margin-right: 10px;
      .icon('icon_shop', 20px, 20px);
    }
    .goods-info {
      padding: 10px 15px;
      background-color: #fbfbfb;
      display: flex;
      .goods-info__img {
        width: 1.45rem;
        height: 1.45rem;
        margin-right: 10px;
      }
      .goods-info__base {
        .flex-n(1);
        font-size: 0.28rem;
        .base-spec {
          margin-top: 5px;
          font-size: 0.24rem;
          color: #bebebe;
        }
        .base-price {
          margin-top: 10px;
          font-size: 0.3rem;
          display: flex;
          align-items: center;
          span {
            .flex-n(1);
            color: @color-price;
          }
        }
      }
    }
    .goods-freight {
      padding: 20px 15px;
      border-bottom: 1px @color-border solid;
      display: flex;
      div {
        .flex-n(1);
        text-align: right;
      }
    }
    .goods-total {
      padding: 20px 15px;
      text-align: right;
      font-size: 0.3rem;
      span {
        color: @color-price;
      }
    }
  }
  .confirm-order__coupon {
    background-color: #ffffff;
    .coupon-item.isarrow {
      padding: 15px 10px 15px 15px;
    }
    .coupon-item {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px @color-border solid;
      .arrow {
        .icon('icon_arrow_gray', 24px, 24px);
      }
      .left {
        width: 75px;
      }
      .middle {
        flex: 1;
        display: flex;
        align-items: center;
        color: @color-txt-2;
        .ques-icon {
          display: inline-block;
          margin-left: 10px;
          .icon('icon_ques', 14px, 14px);
        }
      }
    }
    .coupon-total {
      font-size: 0.26rem;
      color: @color-txt-1;
      padding: 5px 0 40px;
      .coupon-total__item {
        padding: 5px 15px;
      }
    }
  }
  .confirm-order__paybtn {
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    line-height: 50px;
    color: #ffffff;
    font-size: 0.3rem;
    text-align: center;
    background: #029900;
  }
  .confirm-order__paybtn.pay-iphone-bottom {
    bottom: 74px;
  }
}
</style>
