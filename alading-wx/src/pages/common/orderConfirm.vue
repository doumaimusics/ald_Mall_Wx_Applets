/**
* Created by xiejun on 2019/03/25.
* 确认订单，最新版，目前处理购物车下单
*/
<template>
  <div class="order-confirm">
    <div class="notice">通知：请勿替陌生人购买商品，谨防上当受骗</div>
    <selected-address @tap="onAddressTap" :selectedAddressData="userSelectAddress"/>
    <div class="goods-list">
      <shop-node
      v-for="(shopData, index) in shopDataList"
      @chooseCouponTap="onShopNodeChooseCouponTap"
      :shopData="shopData"
      :key="index"/>
    </div>
    <!-- 优惠选择列表 -->
    <div class="choose-list">
      <!-- 优惠券 -->
      <list-cell
      v-if="couponVisible"
      @tap="onChooseCouponTap"
      title1="优惠券"
      :title2="couponInfo"/>
      <!-- 金币 -->
      <switch-cell
      v-if="coinVisible"
      title="金币抵扣"
      @change="onCoinChange"
      @tipTap="onCoinTipTap"
      :isCheck="isCoinCheck"
      :info="coinInfo"/>
      <!-- 余额 -->
      <switch-cell
      v-if="userBalanceVisible"
      title="余额抵扣"
      @change="onUserBalanceChange"
      @tipTap="onUserBalanceTipTap"
      :isCheck="isUserBalanceCheck"
      :isEnable="userBalanceEnable"
      :info="userBalanceInfo"/>
    </div>
    <!-- 支付合计清单 -->
    <div :class="['total', {'iphonex': isIphoneX }]">
      <info-cell title="总计" :amount="totalStatInfo"/>
      <info-cell v-if="useCouponAmount" title="优惠减免" :amount="couponStatInfo"/>
      <info-cell v-if="isCoinCheck" title="金币抵扣" :amount="coinStatInfo"/>
      <info-cell v-if="isUserBalanceCheck" title="余额支付" :amount="balanceStatInfo"/>
    </div>
    <!-- 支付块 -->
    <div :class="['btn-pay', {'iphonex': isIphoneX, 'need-pay': payVisible }]" @tap="onPayTap">
      <div>微信支付￥{{ needPayAmount }}</div>
    </div>

    <simple-dialog v-if="coinDialogVisible" @tap="onCoinDialogTap" :dialogData="coinDialogData"/>
    <simple-dialog v-if="userBalanceDialogVisible" @tap="onUserBalanceDialogTap" :dialogData="userBalanceDialogData"/>

    <tip-toast v-if="payTipVisible" content="正在支付处理中"/>
    <!-- mask -->
    <page-mask v-if="maskVisible" @tap="onMaskTap"></page-mask>
  </div>
</template>

<script>
import shopNode from 'components/common/orderconfirm/shopNode'
import switchCell from 'components/common/orderconfirm/switchCell'
import infoCell from 'components/common/orderconfirm/infoCell'

import selectedAddress from 'components/common/selectedAddress'
import listCell from 'components/common/listCell'
import simpleDialog from 'components/common/simpleDialog'
import tipToast from 'components/toast/tipToast'
import pageMask from 'components/common/pageMask'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import couponUtil from 'utils/couponUtil'
import systemInfo from 'utils/systemInfo'
import goodsTool from 'utils/goodsTool'
import storage from 'utils/storage'
import maidian from 'utils/maidian'
import Tips from 'utils/tip'
import pay from 'utils/pay'
import OrderConfirmHandler from './OrderConfirmHandler'
import Monitor from 'utils/monitor'

export default {
  name: '',
  components: {
    shopNode,
    switchCell,
    infoCell,
    selectedAddress,
    listCell,
    simpleDialog,
    tipToast,
    pageMask
  },
  data() {
    return {
      // 来源
      source: 'shoppingCart',
      // 商城商品列表数据
      shopDataList: [],
      // 下单数据
      preData: null,
      // 平台优惠券
      platformData: null,
      // 运费总和
      expressTotalAmount: 0,
      // 用户余额
      userBalance: 0,
      // 商品总种数
      goodsTotalNum: 1,

      isCoinCheck: false,
      isUserBalanceCheck: false,

      coinDialogData: {},
      userBalanceDialogData: {},

      coinDialogVisible: false,
      userBalanceDialogVisible: false,
      // 支付提示是否显示标记
      payTipVisible: false
    }
  },
  props: {},
  computed: {
    ...mapState(['userSelectAddress', 'confirmGoodsData']),
    ...mapGetters(['userId', 'openId']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    // 最大可用优惠券抵扣金额
    maxCouponAmount() {
      return this.total - (this.mustPayMinAmount + this.expressTotalAmount)
    },
    couponVisible() {
      if (this.platformData) {
        return this.platformData.couponList.length
      }
      return false
    },
    couponInfo() {
      if (this.platformData) {
        this.platformData.maxCouponAmount = this.maxCouponAmount
        return couponUtil.getCouponInfo(this.platformData)
      }
      return ''
    },
    couponId() {
      if (this.couponVisible) {
        let { couponList, chooseIndex } = this.platformData
        if (chooseIndex >= 0) {
          let couponData = couponList[chooseIndex]
          if (couponData) return couponData.rid
        }
      }
      return -1
    },
    maskVisible() {
      return this.coinDialogVisible || this.userBalanceDialogVisible || this.payTipVisible
    },

    coinVisible() {
      if (this.preData) {
        return this.preData.goldCoinCount
      }
      return false
    },
    // 是否可用呢
    coinEnable() {
      if (this.preData) {
        let count = this.preData.goldCoinCount
        return count >= 100
      }
      return false
    },
    coinInfo() {
      if (this.coinVisible) {
        // if (this.coinEnable) {
        let { goldCoinCount, goldCoinAmount } = this.preData
        return `使用${goldCoinCount}金币抵用${goldCoinAmount}元`
        // } else {
        //   return '可用金币低于100'
        // }
      }
      return ''
    },
    userBalanceVisible() {
      return this.userBalance > 0
    },
    userBalanceEnable() {
      if (this.userBalanceVisible) {
        let needUse = Math.floor(this.userBalanceNeedUse * 100)
        if (needUse <= 0) {
          this.isUserBalanceCheck = false
          return false
        }
        return this.userBalance >= 0.5
      }
      return false
    },
    userBalanceNeedUse() {
      if (this.userBalanceVisible) {
        let total = this.total
        if (this.useCouponAmount) total = total - this.useCouponAmount
        let result = Math.min(total - this.mustPayMinAmount, this.userBalance)
        if (result <= 0) {
          result = 0
        }
        return result
      }
      return 0
    },
    userBalanceInfo() {
      if (this.userBalanceVisible) {
        if (this.userBalanceEnable) {
          let amoumt = basis.toFix(this.userBalanceNeedUse)
          return `可抵扣${amoumt}元`
        } else {
          if (this.userBalance < 0.5) {
            return '可用余额少于0.5元'
          } else {
            return '暂不可用余额'
          }
        }
      }
      return ''
    },
    // 平台优惠金额
    useCouponAmount() {
      if (this.platformData) {
        return this.platformData.useCouponAmount
      }
      return 0
    },
    totalStatInfo() {
      let amount = basis.toFix(this.total)
      return `￥${amount}`
    },
    couponStatInfo() {
      if (this.useCouponAmount) {
        return `-￥${this.useCouponAmount}`
      }
      return ''
    },
    coinStatInfo() {
      if (this.preData) {
        return `-￥${this.preData.goldCoinAmount}`
      }
      return ''
    },
    balanceStatInfo() {
      let amount = basis.toFix(this.userBalanceNeedUse)
      return `-￥${amount}`
    },
    payVisible() {
      return this.needPayAmount
    },
    // 需要支付的金额
    needPayAmount() {
      let result = this.total
      if (this.useCouponAmount) result = result - this.useCouponAmount
      if (this.isUserBalanceCheck) result = result - this.userBalanceNeedUse
      if (this.isCoinCheck) result = result - this.preData.goldCoinAmount
      if (result <= 0) result = this.mustPayMinAmount
      if ((result + '').indexOf('.') >= 0) result = result.toFixed(2)
      return result
    },
    // 最小需要支付的金额
    mustPayMinAmount() {
      return this.goodsTotalNum * 0.01
    },
    total() {
      if (this.shopDataList.length) {
        let list = this.shopDataList.map(shopData => {
          return goodsTool.calcTotal(shopData)
        })
        return list.reduce((p, v) => p + v)
      }
      return 0
    }
  },
  created() {},
  mounted() {},
  onUnload() {
    this.resetData()
    this.setUserSelectAddress(null)
  },
  onLoad(options) {
    if (storage.props.launchStatus === 1) return
    this.optionsHandler(options)

    maidian.shop(maidian.spm.shop_buy)
    this.loadBaseData()
  },
  onShow() {
    if (storage.props.launchStatus === 1) return
    this.payTipVisible = false

    this.loadUserSelectAddress()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {
    total() {
      // 总计金额发生变化时
      this.loadPreData()
    },
    useCouponAmount() {
      // 平台优惠券优惠金额发生变化
      this.loadPreData()
    },
    userSelectAddress(val, oldVal) {
      if (!oldVal || !val) return
      // 用户更换选择地址
      this.userSelectAddressChange()
    }
  },
  methods: {
    ...mapMutations(['setIsSelectAddress', 'setUserSelectAddress']),
    ...mapActions(['getUserDefaultAddressData', 'getGoodsDiscountData', 'getUserBalanceData', 'requestToPayOrder']),
    ...mapActions('shoppingCart', ['getGoodsList', 'getExpressFeeV2', 'getPre', 'checkCountBeforeBuy']),
    ...mapActions('coupon', ['getAgencyCouponList', 'getChooseAgencyCouponList']),
    onAddressTap() {
      if (this.userSelectAddress) {
        this.setIsSelectAddress(true)
        navigate.push({ url: '/pages/common/address' })
      } else {
        navigate.push({ url: '/pages/common/addressAdd' })
      }
    },
    // 商城店铺选择优惠券
    onShopNodeChooseCouponTap(shopData) {
      let params = this.orderConfirmHandler.getShopDataAgencyCouponListParams(shopData)
      this.toCouponChoose(params, shopData, this.platformData)
    },
    onChooseCouponTap() {
      let params = this.orderConfirmHandler.platformAgencyCouponListParams
      this.toCouponChoose(params, this.platformData, null)
    },
    toCouponChoose(params, shopCouponData, platformCouponData) {
      this.getChooseAgencyCouponList({ params, shopCouponData, platformCouponData })
      navigate.push({ url: '/pages/common/couponChoose' })
    },
    onCoinChange(checked) {
      this.isCoinCheck = checked
    },
    onCoinTipTap() {
      this.coinDialogVisible = true
    },
    onUserBalanceChange(checked) {
      // this.isCoinCheck = false
      this.isUserBalanceCheck = checked
      this.loadPreData()
    },
    onUserBalanceTipTap() {
      this.userBalanceDialogVisible = true
    },

    payFail() {
      navigate.replace({ url: '/pages/common/order' })
    },
    // 微信支付
    async onPayTap() {
      maidian.shop(maidian.spm.shop_pay)
      if (!this.userSelectAddress) {
        Tips.toast('请添加收货地址')
        return
      }

      this.payTipVisible = true

      // await this.toCheckCountBeforeBuy()
      await this.loadPreData(false, true)

      if (!this.preData) {
        this.payTipVisible = false
        return
      }
      // 支付
      let orderId = this.preData.orderId
      if (orderId) {
        let openId = this.openId
        let params = { orderId, addOrder: 1, openId }
        let payment = await this.requestToPayOrder(params)
        if (payment) {
          // 调起微信支付
          pay
            .requestPayment(payment)
            .then(res => {
              navigate.replace({ url: '/pages/common/paySuccess?orderId=' + orderId })
            })
            .catch(errorMsg => {
              this.payFail()
            })
        } else {
          this.payFail()
        }
      } else {
        this.payTipVisible = false
      }
    },

    onCoinDialogTap() {
      this.coinDialogVisible = false
    },
    onUserBalanceDialogTap() {
      this.userBalanceDialogVisible = false
    },
    onMaskTap() {
      this.coinDialogVisible = false
      this.userBalanceDialogVisible = false
    },
    // 处理options
    optionsHandler(options) {
      // 来源source 购物车(shoppingCart) 商品详情页(goodsDetail)
      if (options.source) {
        this.source = options.source
      }
    },
    async loadBaseData() {
      this.initDialogData()

      await this.loadUserSelectAddress()

      let data = await this.initGoodsListData()
      this.orderConfirmHandler = new OrderConfirmHandler(data)
      this.goodsTotalNum = this.orderConfirmHandler.goodsTotalNum
      // 取得物流数据
      await this.loadExpressData()
      this.shopDataList = this.orderConfirmHandler.shopDataList
      // 取得所有商城店铺的可用优惠券列表
      await this.loadCouponList()
      // 取得用户余额
      this.loadUserBalanceData()
      // 下单
      await this.loadPreData(false)
      // 用于控制watch时的调用
      this._hasInitBaseData = true
    },
    // 用户重新选择了地址
    async userSelectAddressChange() {
      this._hasInitBaseData = false
      // 取得物流数据
      await this.loadExpressData()
      this.shopDataList = this.orderConfirmHandler.shopDataList
      // 取得所有商城店铺的可用优惠券列表
      await this.loadCouponList()
      // 取得用户余额
      this.loadUserBalanceData()
      // 下单
      await this.loadPreData(false)
      this._hasInitBaseData = true
    },
    // 取得用户选中的收货地址
    async loadUserSelectAddress() {
      if (this._hasToLoadUserSelectAddress) return
      this._hasToLoadUserSelectAddress = true
      if (!this.userSelectAddress) {
        // 不存在已选择的地址
        await this.getUserDefaultAddressData({})
      }
      this._hasToLoadUserSelectAddress = false
    },
    initDialogData() {
      this.coinDialogData = {
        title: '金币使用说明',
        content: [
          '1.金币抵扣创建订单后即减扣金币',
          '2.取消订单，退款退货等情况金币将会原路返回至您的金币余额中',
          '3.金币抵扣比率以确认订单页实际计算为准'
        ]
      }
      this.userBalanceDialogData = {
        title: '余额使用说明',
        content: ['1.余额抵扣创建订单后即减扣', '2.取消订单，退款退货等情况余额将会原路返回至您的账户余额']
      }
    },
    // 初始化商品列表数据，主要需要处理两个方面，从购物车进入确认订单及从商品详情页进入确认订单
    async initGoodsListData() {
      let data = null
      if (this.source === 'shoppingCart') {
        data = await this.getGoodsList()
      } else if (this.source === 'goodsDetail') {
        data = this.confirmGoodsData
        // 取得优惠数据
        let { goodsId, goodsNum, goodsPrice, goodsSpecId: priceId } = data.goodsSpec
        let discountData = await this.getGoodsDiscountData({ goodsId, goodsNum, goodsPrice, priceId })
        data.discountData = discountData
      }
      if (data) data.source = this.source
      return data
    },
    // 取得物流
    async loadExpressData() {
      if (!this.userSelectAddress) return

      let addressId = this.userSelectAddress.rid
      let goodsInfo = this.orderConfirmHandler.expressGoodsInfo
      let expressData = await this.getExpressFeeV2({ addressId, goodsInfo })
      this.orderConfirmHandler.putExpress(expressData)
      this.expressTotalAmount = this.orderConfirmHandler.expressTotal
    },
    loadShopCouponList() {
      return new Promise((resolve, reject) => {
        // 遍历取所有商城店铺的优惠券
        let paramsList = this.orderConfirmHandler.agencyCouponListParams
        let count = paramsList.length
        let completeSize = 0
        paramsList.forEach(async (params, index) => {
          let data = await this.getAgencyCouponList(params)
          let shopData = this.shopDataList[index]
          shopData.couponList = data.couponList
          shopData.useCouponAmount = couponUtil.getUseCouponAmount(shopData)
          completeSize++
          if (completeSize >= count) resolve()
        })
      })
    },
    async loadCouponList() {
      await this.loadShopCouponList()
      // 取平台优惠券
      let platParams = this.orderConfirmHandler.platformAgencyCouponListParams
      let data = await this.getAgencyCouponList(platParams)
      let couponList = data.couponList
      if (couponList && couponList.length) {
        // 平台优惠券，默认不选择
        this.platformData = { couponList, chooseIndex: -1, useCouponAmount: 0 }
      } else {
        this.platformData = null
      }
    },
    async loadUserBalanceData() {
      let data = await this.getUserBalanceData({})
      this.userBalance = data.amount
      // test
      // this.userBalance = 0.4
    },
    getOrderParams() {
      let addOrder = 0
      // 是否使用余额抵扣
      let accountType = this.isUserBalanceCheck ? 1 : 0
      // 表示有多少金币就用多少金币
      let goldCoinType = 1
      let addressId = 0
      if (this.userSelectAddress) addressId = this.userSelectAddress.rid
      let orderType = 'SELFSUPPORT'

      let shopCouponId = this.orderConfirmHandler.agencyChooseCouponIdList.join(',')
      let goodsInfo = this.orderConfirmHandler.allShopDataGoodsInfo
      let params = { addOrder, accountType, goldCoinType, addressId, orderType, shopCouponId, goodsInfo }
      if (this.couponId >= 0) params.couponId = this.couponId
      return params
    },
    getOrderCheckParams() {
      let params = this.getOrderParams()
      // addOrder设置为1
      params.addOrder = 1
      // 更新金币使用情况
      let goldCoinType = this.isCoinCheck ? 1 : 0
      params.goldCoinType = goldCoinType
      return params
    },
    // 下单前的检测
    async toCheckCountBeforeBuy() {
      let params = this.getOrderCheckParams()
      let data = await this.checkCountBeforeBuy(params)
      if (data) {
        if (data.result === 'yes') {
          // 成功
          await this.loadPreData(false, true)
        }
      }
    },
    // 取得
    async loadPreData(check = true, isAddOrder = false) {
      if (check && !this._hasInitBaseData) return
      let params = isAddOrder ? this.getOrderCheckParams() : this.getOrderParams()
      this.preData = await this.getPre(params)

      if (this.isCoinCheck) {
        this.isCoinCheck = this.coinVisible
      }
    },
    // 重置数据
    resetData() {
      this.shopDataList = []
      this.preData = null
      this.platformData = null
      this.userBalance = 0
      this.goodsTotalNum = 1

      this.isCoinCheck = false
      this.isUserBalanceCheck = false

      this.coinDialogVisible = false
      this.userBalanceDialogVisible = false

      this.payTipVisible = false
      this._hasInitBaseData = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@btn-height: 50px;
.order-confirm {
  .fill-page(white);
  .notice {
    height: 28px;
    line-height: 28px;
    background-color: #fffad9;

    text-align: center;
    font-size: @font-size-tip;
  }
  .goods-list {
    background: @color-bg;
    padding: 10px 0;
  }
  .choose-list {
    /deep/.list-cell {
      height: 47px;
      .border-1px-bottom();
      .title1 {
        font-size: 14px;
      }
      .title2 {
        margin-right: 5px;
        font-size: 13px;
        color: @color-txt;
      }
    }
  }
  .total {
    padding-top: 7px;
    padding-bottom: @btn-height + 10px;
    .adapt-iphonex(@btn-height + 10px);
  }
  .btn-pay {
    position: fixed;
    bottom: -@btn-height;
    left: 0;
    width: 100%;

    background: white;
    color: white;
    font-size: 15px;
    text-align: center;

    &.iphonex {
      padding-bottom: @padding-iphonex;
      bottom: -@btn-height - @padding-iphonex;
    }
    &.need-pay {
      bottom: 0;
    }
    div {
      height: @btn-height;
      line-height: @btn-height;
      background: #029900;
    }
  }
}
</style>