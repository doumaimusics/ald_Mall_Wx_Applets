/**
* Created by xiejun on 2018/11/22.
* 详情——商品
*/
<template>
  <div v-if="goodsDetailData" class="collage-detail-goods">
    <!-- 商品图片组 --> 
    <banner-goods :picUrlList="picUrlList"></banner-goods>
    <!-- 商品售价 -->
    <goods-price @timeout="onGoodsPriceTimeout" :goodsDetail="goodsDetailData"></goods-price>
    <!-- 商品标题 -->
    <div class="goods-info-base">
      <goods-name :goodsData="goodsInfo" type="gn-goods-detail"></goods-name>
      <div v-if="goodsInfo.isForNew" class="tip">仅限邀请新用户购买，同享低价优惠～</div>
    </div>
    <!-- 拼团实时播放信息 -->
    <div class="goods-real-time">
      <span class="icon-tip"></span>
      <span class="info-all">{{processingCount}}人正在拼团&nbsp;&nbsp;|</span>
      <user-scroll-show :userList="collageUserList"></user-scroll-show>
      <div class="mask"></div>
    </div>
    <!-- 站内拼团列表 -->
    <one-less v-if="isLoadOneLess" @tap="onOneLessTap" @timeout="onOneLessTimeout" :orderList="onelessOrderList"></one-less>
    <!-- 拼团玩法 -->
    <list-cell title1="拼团玩法" title2="详细规则" @tap="onRuleTap"></list-cell>
    <!-- 拼团步骤 -->
    <div class="goods-step"></div>
    <!-- 选择规格 -->
    <list-cell title0="选择" :title1="specsChooseData.chooseSpecs" @tap="onChooseSpecsTap"></list-cell>
    <list-cell title0="服务" title1="正品保证 · 极速物流 · 售后无忧" :iconVisible="false"></list-cell>
    <!-- 商品详情 -->
    <div :class="['goods-detail', {'iphonex': isIphoneX }]">
      <div class="title">
        <span class="line-left"></span>
        <span class="title-content">商品详情</span>
        <span class="line-right"></span>
      </div>
      <img v-for="url in goodsDetailList" :src="url" mode="widthFix" :key="url">
    </div>
    <!-- 购买菜单 -->
    <div :class="['goods-menu', {'iphonex-bottom': isIphoneX }]">
      <div class="more-menu">
        <menu-icon-node type="1" title="客服" @tap="onHelpTap"/>
        <menu-icon-node type="3" title="购物车" @tap="onToShoppingCart"/>
        <menu-icon-node type="2" title="拼团首页" @tap="onToHome"/>
      </div>
      <block v-if="isGoodsCancel || isGoodsEmpty">
        <menu-tip :title="menuTipTitle"/>
        <menu-node type="4" title="立即购买" :price="goodsInfo.saleAmount"/>
        <menu-node type="3" :title="collageTitle" :price="goodsInfo.marketingPrice"/>
      </block>
      <block v-else>
        <menu-node type="1" title="立即购买" @tap="onBuy" :price="goodsInfo.saleAmount"/>
        <menu-node type="2" :title="collageTitle" @tap="onCollage" :price="goodsInfo.marketingPrice"/>
      </block>
    </div>
    <!-- 拼团规则 -->
    <rule-toast v-if="ruleVisble" @tap="onRuleCloseTap"></rule-toast>
    <!-- 拼团规格 -->
    <collage-specs-choose
    @empty="onSpecsChooseEmpty"
    @ok="onSpecsChooseOk"
    @close="onSpecsChooseClose"
    @change="onSpecsChooseChange"
    :visible="collageSpecsVisible"
    :goodsInfo="goodsInfo"
    :priceData="priceData"
    :submitName="collageTitle"
    :propertyData="propertyData"/>
    <!-- 立即购买规格 -->
    <!-- <buy-specs-choose
    @ok="onBuySpecsChooseOk"
    @close="onBuySpecsChooseClose"
    @change="onBuySpecsChooseChange"
    :visible="choosSpecsVisible"
    :goodsInfo="goodsInfo"
    :priceData="buyPriceData"
    :propertyData="buyPropertyData"/> -->
    <!-- 规格选择 -->
    <choose-specs
    :isShow="choosSpecsVisible"
    @confirm="onBuySpecsChooseOk"
    @close="onBuySpecsChooseClose"
    type="choose"
    :isGoodsCancel="isGoodsCancel"
    :chooseSpecsData="chooseSpecsData"/>
    <!-- 参与拼团时，存在待支付及待分享订单 -->
    <collage-fail-toast
    v-if="collageFailVisible"
    @tap="onCollageFailTap"
    @timeout="onCollageFailTimeout"
    @close="onCollageFailCloseTap"
    :title="collageFailInfo.title"
    :btnTitle="collageFailInfo.btnTitle"
    :duration="collageFailInfo.duration"/>
    <!-- 立即参加拼团 -->
    <attend-fast-toast
    v-if="attendFastVisible"
    @tap="onAttendFastTap"
    @timeout="onAttendFastTimeout"
    @close="onAttendFastCloseTap"
    :orderData="currentOrderData"/>
    <!-- 蒙层 -->
    <toast-mask
    :visible="maskVisible"
    @tap="onMaskTap"/>
  </div>
</template>

<script>
import menuIconNode from './menu/menuIconNode'
import menuNode from './menu/menuNode'
import menuTip from './menu/menuTip'
import userScrollShow from './userScrollShow'
import goodsPrice from './goodsPrice'
import oneLess from './oneLess'

import goodsName from 'pcollagecomp/goods/goodsName'
import listCell from 'pcollagecomp/common/listCell'
import ruleToast from 'pcollagecomp/toast/ruleToast'
import collageFailToast from 'pcollagecomp/toast/collageFailToast'
import attendFastToast from 'pcollagecomp/toast/attendFastToast'
import toastMask from 'components/toast/toastMask'

import collageSpecsChoose from 'pcollagecomp/specs/collageSpecsChoose'
import buySpecsChoose from 'pcollagecomp/specs/buySpecsChoose'
import chooseSpecs from 'components/spec/chooseSpecs'

import bannerGoods from 'components/alaUI/bannerGoods'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import collageStatus from 'utils/collageOrderStatus'
import collageBasis from 'pcollagecomp/basis'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import storage from 'utils/storage'
import systemInfo from 'utils/systemInfo'
import goodsTool from 'utils/goodsTool'
import maidian from 'utils/maidian'
import Tips from 'utils/tip'
import orderConfirmStatus from 'pcollagecomp/orderConfirmStatus'
import webview from 'utils/webview'
import wx from 'wx'
import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      // 标记商品是否为空
      isGoodsEmpty: false,
      // 拼团选择的规格数据
      specsChooseData: {},
      // 立即购买商品规格数据
      buySpecsData: null,
      // 收藏
      // isCollect: false,
      // 规则visible
      ruleVisble: false,
      // 拼团规格选择visible
      collageSpecsVisible: false,
      // 规格选择visible
      choosSpecsVisible: false,

      collageFailVisible: false,
      // 参与拼团时，用户存在待支付或待分享订单详情数据
      collageFailInfo: {},

      attendFastVisible: false,
      // 当前选中的拼团订单数据
      currentOrderData: null,
      // 差一个拼团成功的订单列表
      onelessOrderList: []
    }
  },
  props: {},
  computed: {
    ...mapState(['isLogin']),
    ...mapState('collage', ['goodsDetailData', 'collageFake']),
    ...mapGetters('collage', ['orderConfirmStatusInfo']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    maskVisible() {
      return (
        this.ruleVisble ||
        this.choosSpecsVisible ||
        this.collageSpecsVisible ||
        this.collageFailVisible ||
        this.attendFastVisible
      )
    },
    goodsInfo() {
      if (!this.goodsDetailData) return {}
      let goodsInfo = this.goodsDetailData.goodsInfo
      if (!goodsInfo) goodsInfo = {}
      return goodsInfo
    },
    picUrlList() {
      if (!this.goodsDetailData) return []
      let list = this.goodsInfo.picUrlList
      if (!list) list = []
      return list
    },
    // 控制一下假数据
    processingCount() {
      if (!this.goodsDetailData) return 0
      if (this.collageFake < 0) {
        return 0
      }
      return this.collageFake
    },
    collageUserList() {
      if (!this.goodsDetailData) return []
      let list = this.goodsDetailData.thirdInfoList
      if (list) {
        list = list.filter(value => value && value.nickname)
      } else {
        list = []
      }
      return list
    },
    isGoodsCancel() {
      if (!this.goodsDetailData) return false
      return this.goodsInfo.goodsStatus === 'CANCEL'
    },
    isLoadOneLess() {
      let isLoad = this.goodsInfo.isInner === 1
      isLoad = isLoad && !this.isGoodsEmpty && !this.isGoodsCancel
      // isLoad = true // test
      return isLoad
    },
    menuTipTitle() {
      let tip = ''
      if (this.isGoodsCancel) {
        tip = '商品已下架，可以看看别的商品哦'
      } else if (this.isGoodsEmpty) {
        tip = '来晚一步，商品已抢完，去看看别的吧'
      }
      return tip
    },
    // 拼团标题
    collageTitle() {
      let title = '发起拼团'
      if (this.orderConfirmStatusInfo.isToCollage) title = '参与拼团'
      return title
    },
    priceData() {
      if (!this.goodsDetailData) return []
      let priceData = this.goodsDetailData.priceData
      if (!priceData) priceData = []
      return priceData
    },
    propertyData() {
      if (!this.goodsDetailData) return []
      let propertyData = this.goodsDetailData.propertyData
      if (!propertyData) propertyData = []
      return propertyData
    },
    buyPriceData() {
      if (!this.buySpecsData) return []
      return this.buySpecsData.priceData
    },
    buyPropertyData() {
      if (!this.buySpecsData) return []
      return this.buySpecsData.propertyData
    },
    // 规格数据
    chooseSpecsData() {
      if (!this.buySpecsData) return null
      let price = this.goodsInfo.saleAmount
      let icon = this.goodsInfo.goodsIcon
      let goodsName = this.goodsInfo.goodsName
      let goodsId = this.goodsInfo.goodsId
      return { price, icon, goodsName, goodsId, ...this.buySpecsData }
    },
    goodsDetailList() {
      if (!this.goodsDetailData) return []
      let list = this.goodsInfo.goodsDetail.split(',')
      list = list.map(value => value.split(';')[0])
      return list
    }
  },
  created() {},
  onShow() {
    if (storage.props.launchStatus === 1) return
    let options = storage.props.launchOptions
    if (options && options.query.goodsId) {
      let goodsId = +options.query.goodsId
      this.pushGoodsId(goodsId)

      // 清空一下
      options.query = {}
      storage.props.launchOptions = options
    }

    wx.startPullDownRefresh()
    this.hasPullDownRefresh = true

    this.initData()
    Monitor.pageShow()
  },
  onHide() {
    this.collageFailVisible = false
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  mounted() {},
  onPullDownRefresh() {
    if (this.hasPullDownRefresh) return
    this.refresh()
  },
  onUnload() {
    this.clearData()
    this.popGoodsId()
    this.resetOrderConfirmStatus()
  },
  watch: {},
  methods: {
    ...mapMutations(['setGoodsIdsData']),
    ...mapMutations('collage', [
      'pushShareParams',
      'setOrderDetailParams',
      'popGoodsId',
      'pushGoodsId',
      'setOrderComfirmGoodsData',
      'setOrderComfirmStatus',
      'resetOrderConfirmStatus',
      'updateCollageFakeTime',
      'setAttendFastPinOrderNo'
    ]),
    ...mapActions(['setConfirmGoodsData', 'getGoodsDetailData', 'formIdListSubmit']),
    ...mapActions('collage', ['getGoodsDetail', 'getBuyGoodsSpec', 'getOneLessOrderList']),
    ...mapActions('shoppingCart', ['addGoods']),
    async initData(goodsDetailFlg = 0) {
      this.initChooseSpecsData()
      await this.getGoodsDetail({ goodsDetailFlg })
      this.updateCollageFakeTime()

      maidian.view('pintuan_goodsdetail', this.goodsInfo.name, this.goodsInfo.goodsId)
      this.hasPullDownRefresh = false
      wx.stopPullDownRefresh()

      this.loadOneLessData()
    },
    async loadOneLessData() {
      if (this.isLoadOneLess) {
        let data = await this.getOneLessOrderList({ marketingGoodsId: this.goodsInfo.id })
        // 当前时间，用于计算用户参与待拼订单的等待时间
        this.oneLessStartTime = basis.getTimer()
        if (data) {
          this.onelessOrderList = []
          setTimeout(() => {
            let list = data.orderListWithOneLess
            if (!list) list = []
            this.onelessOrderList = list
          }, 100)
        }
      }
    },
    clearData() {
      this.isGoodsEmpty = false
      this.initChooseSpecsData()
      this.buySpecsData = null
      this.ruleVisble = false
      this.collageSpecsVisible = false
      this.choosSpecsVisible = false
      this.collageFailVisible = false
      this.collageFailInfo = {}
      this.attendFastVisible = false
      this.currentOrderData = null
      this.onelessOrderList = []
    },
    refresh() {
      this.clearData()

      // 针对拼团成功假数据的逼真操作
      this.updateCollageFakeTime()

      this.initData(1)
    },
    initChooseSpecsData() {
      this.specsChooseData = {
        chooseSpecs: '请选择 规格',
        allset: false
      }
      // 显示拼团失败状态 初始状态0 显示过1 加载更新过2
      this.showCollageFailStatus = 0
    },
    onSpecsChooseEmpty() {
      // 发起拼团
      this.isGoodsEmpty = true
    },
    onGoodsPriceTimeout() {
      this.refresh()
    },
    onHelpTap() {
      Tips.toast('有疑问请联系客服：400-002-5151')
    },
    onToHome() {
      navigate.reLaunch({ url: '/pcollage/pages/index/index' })
    },
    onToShoppingCart() {
      if (!this.isLogin) {
        basis.toLogin()
        return
      }
      // 去购物车
      webview.openShoppingCart()
    },
    onSpecsChooseOk() {
      maidian.click('pintuan_goodsdetail_confirm', this.goodsInfo.name, this.goodsInfo.goodsId)
      // 发起拼团
      this.collageSpecsVisible = false
      this.checkSpecsChoose()
    },
    onSpecsChooseClose() {
      this.collageSpecsVisible = false
      this.resetOrderConfirmStatus()
    },
    onSpecsChooseChange(data) {
      this.specsChooseData = data
    },
    async onBuySpecsChooseOk(data) {
      console.log('on buy specs choose ok', data)
      if (!this.isLogin) {
        basis.toLogin()
        return
      }
      // 立即购买
      this.choosSpecsVisible = false
      let type = data.type
      if (type === 'addCart') {
        console.log('add cart')
        // 加入购物车
        let { goodsId, goodsSpecId: priceId, goodsNum, goodsPrice } = data.goodsSpec
        let success = await this.addGoods({ goodsId, priceId, goodsNum, goodsPrice })
        if (success) Tips.success('添加成功')
      } else {
        // 立即购买
        this.setGoodsIdsData(this.goodsInfo.goodsId)
        this.formIdListSubmit()

        let detailData = await this.getGoodsDetailData()
        let goodsInfo = goodsTool.format(detailData)

        let storeShopDto = detailData.storeShopDto
        let goodsSpec = data.goodsSpec
        let goodsData = { goodsSpec, goodsInfo, storeShopDto }
        this.setConfirmGoodsData(goodsData)
        basis.toOrderConfirm()
      }
    },
    onBuySpecsChooseClose() {
      this.choosSpecsVisible = false
    },

    onCollageFailTap() {
      // 跳转，根据info
      if (this.collageOrderInfo.isNew) {
        // 待支付
        let { orderId, pinOrderNo } = this.goodsDetailData
        this.setOrderDetailParams({ orderId, pinOrderNo })
        navigate.push({ url: '/pcollage/pages/detail/order/detailOrder' })
      } else if (this.collageOrderInfo.isDealing) {
        // 处理中
        let { orderId, pinOrderNo } = this.goodsDetailData
        this.setOrderDetailParams({ orderId, pinOrderNo })
        navigate.push({ url: '/pcollage/pages/detail/order/detailOrder' })
      } else if (this.collageOrderInfo.isToShare) {
        // 待分享
        let { orderId } = this.goodsDetailData
        this.pushShareParams({ orderId })
        navigate.push({ url: '/pcollage/pages/collage/share' })
      }
    },
    // 倒计时结束
    onCollageFailTimeout() {
      this.refresh()
    },
    onCollageFailCloseTap() {
      this.collageFailVisible = false
    },
    onOneLessTap(data) {
      let usedTime = basis.getTimer() - this.oneLessStartTime
      this.currentOrderData = { ...data, usedTime }
      this.attendFastVisible = true
    },
    onOneLessTimeout() {
      this.loadOneLessData()
    },

    onAttendFastTap() {
      // 站内拼团
      this.attendFastVisible = false

      // 设置站内拼团的orderNo
      this.setAttendFastPinOrderNo(this.currentOrderData.pinOrderNo)
      // 显示规格选择
      this.setOrderComfirmStatus(orderConfirmStatus.ATTEND_FAST)
      // 显示规格
      this.onCollage()
    },
    // 倒计时结束
    onAttendFastTimeout() {
      this.refresh()
    },
    onAttendFastCloseTap() {
      this.attendFastVisible = false
    },
    onMaskTap() {
      if (this.collageFailVisible) return

      if (this.ruleVisble) {
        this.ruleVisble = false
      } else if (this.collageSpecsVisible) {
        this.resetOrderConfirmStatus()
        this.collageSpecsVisible = false
      } else if (this.choosSpecsVisible) {
        this.choosSpecsVisible = false
      } else if (this.attendFastVisible) {
        this.attendFastVisible = false
      }
    },
    onRuleTap() {
      this.ruleVisble = true
    },
    onChooseSpecsTap() {
      this.collageSpecsVisible = true
    },
    onRuleCloseTap() {
      this.ruleVisble = false
    },
    onCloseSpecs() {
      this.collageSpecsVisible = false
    },
    async onBuy() {
      maidian.click('pintuan_goodsdetail_shop', this.goodsInfo.name, this.goodsInfo.goodsId)
      if (this.isGoodsEmpty || this.isGoodsCancel) return
      if (!this.isLogin) {
        basis.toLogin()
        return
      }
      if (this.buySpecsData) {
        // 规格数据已经取过了
        this.choosSpecsVisible = true
        return
      }
      // 立即购买
      Tips.loading()

      let params = {}
      let activityId = this.goodsInfo.activityId
      if (activityId) params.activityId = activityId
      let data = await this.getBuyGoodsSpec(params)
      Tips.loaded()
      if (data) {
        this.buySpecsData = data
        this.choosSpecsVisible = true
      } else {
        // 取商品规格失败
        console.log('get buy goods spec fail')
      }
    },
    onCollage() {
      maidian.click('pintuan_goodsdetail_pin', this.goodsInfo.name, this.goodsInfo.goodsId)
      if (this.isGoodsEmpty || this.isGoodsCancel) return

      if (!this.isLogin) {
        basis.toLogin()
        return
      }
      // 判断是否选择了规格
      this.checkSpecsChoose()
    },
    // 判断一下用户是否存在待支付或待分享订单
    checkUserOrderStatus() {
      if (this.goodsDetailData.orderStatus) {
        let status = this.goodsDetailData.orderStatus
        let { pinOrderStatus, payStatus } = this.goodsDetailData
        // 拼团订单信息
        this.collageOrderInfo = collageStatus.info({ status, pinOrderStatus, payStatus })
        let failInfo = collageBasis.getToBuyFailInfo(this.collageOrderInfo, this.goodsDetailData)
        if (failInfo) {
          this.collageFailInfo = failInfo
          this.collageFailVisible = true
          // 已经显示过发起拼团失败toast
          this.showCollageFailStatus = 1
          return true
        }
      }
      return false
    },
    // 判断规格的选择
    async checkSpecsChoose() {
      // 判断一下用户是否存在待支付或待分享订单
      if (this.showCollageFailStatus !== 2) {
        if (this.showCollageFailStatus === 1) {
          await this.getGoodsDetail({ goodsDetailFlg: 1 })
          this.showCollageFailStatus = 2
        }
        if (this.checkUserOrderStatus()) return
      }

      if (this.specsChooseData.allset) {
        this.formIdListSubmit()

        let goodsIcon = this.goodsInfo.goodsIcon
        let goodsId = this.goodsInfo.goodsId
        let pinOrderNo = this.goodsInfo.pinOrderNo
        if (!pinOrderNo) pinOrderNo = ''
        let goodsName = this.goodsInfo.name
        let goodsPriceName = this.specsChooseData.goodsPriceName
        let saleAmount = this.specsChooseData.saleAmount
        let goodsSpecId = this.specsChooseData.goodsSpecId
        let count = 1
        this.setOrderComfirmGoodsData({
          goodsIcon,
          goodsId,
          pinOrderNo,
          goodsName,
          goodsPriceName,
          saleAmount,
          goodsSpecId,
          count
        })
        // 已经选好了
        navigate.push({ url: '/pcollage/pages/order/orderConfirm' })
      } else {
        // 没有选好
        this.collageSpecsVisible = true
      }
    }
  },
  components: {
    goodsName,
    listCell,
    menuIconNode,
    menuNode,
    menuTip,
    userScrollShow,
    goodsPrice,
    oneLess,
    ruleToast,
    toastMask,
    collageFailToast,
    attendFastToast,
    collageSpecsChoose,
    buySpecsChoose,
    chooseSpecs,
    bannerGoods
  }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@menu-height: 50px;
.collage-detail-goods {
  color: @color-txt;
  .goods-info-base {
    margin-bottom: 10px;
    background: white;

    .padding-h(@padding-h);
    padding-bottom: 15px;

    .title {
      position: relative;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: @color-txt;
      line-height: 22px;
      .show-two-line();
      .name-tag {
        display: inline-block;
        height: 17px;
        line-height: 17px;
        .padding-h(12px);
        font-size: 11px;
        font-family: PingFangSC-Regular;
        background: @color-btn;
        border-radius: 5px 0 5px 0;
      }
    }

    .tip {
      margin-top: 6px;
      color: @color-price;
      font-size: @font-size-tip;
    }
  }

  .goods-real-time {
    position: relative;
    .flex-hor-center;
    .padding-h(@padding-h);
    height: 40px;
    background: #fff8da;
    color: #975f00;
    font-size: @font-size-txt;
    .icon-tip {
      .icon('icon_tip', 18px, 18px);
    }
    .info-all {
      margin-left: 8px;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
  }

  .goods-step {
    margin-top: 10px;
    margin-bottom: 10px;
    .image-single('image_detail_goods_step.jpg', 375px, 68px);
  }

  .goods-detail {
    margin-top: 10px;
    text-align: center;
    padding-bottom: @menu-height;
    background: white;
    &.iphonex {
      padding-bottom: @menu-height + @padding-iphonex;
    }
    .title {
      .flex-hor-center();
      justify-content: center;
      height: 40px;
      background: white;
      font-size: @font-size-txt;
      .title-content {
        .padding-h(@padding-h);
      }
      .line() {
        position: relative;
        display: inline-block;
        background: @color-border-1;
        height: 1px;
        width: 38px;
      }
      .point() {
        display: block;
        position: absolute;
        top: 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: @color-border-1;
        transform: translateY(-50%);
        content: ' ';
      }
      .line-left {
        .line();
        &::before {
          .point();
          right: 0;
        }
      }
      .line-right {
        .line();
        &::after {
          .point();
          left: 0;
        }
      }
    }
  }

  .goods-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: @menu-height;
    .flex-hor-center();
    background: white;
    .more-menu {
      .flex-n();
      .flex-hor-center();
      justify-content: center;
      .padding-h(@padding-h);

      .detail-goods-menu-icon-node {
        .flex-n();
      }
    }
  }
}
</style>
