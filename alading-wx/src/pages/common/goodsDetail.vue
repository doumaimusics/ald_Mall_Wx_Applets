/**
* Created by xiejun on 2019/03/21.
* goods detail
*/
<template>
  <div v-if="hasGoodsDetailData" :class="['goods-detail', {'iphonex': isIphoneX }]">
    <!-- banner --> 
    <banner-goods :picUrlList="picUrlList"/>
    <!-- goods price -->
    <info-price-goods @timeout="onActivityTimeout" :priceData="priceData"></info-price-goods>
    <!-- goods info-->
    <div class="goods-info">
      <div class="goods-name">{{ goodsName }}</div>
      <div v-if="hasRemark" class="goods-remark">{{ remark }}</div>
      <div class="info-else">
        <span class="freight">快递：{{ freight }}</span>
        <span class="sale-count">销量：{{ saleCount }}</span>
      </div>
      <info-coupon-goods @tap="onShowCouponTap" :isShowMsg="isShowMsg" :couponTitles="couponTitles"></info-coupon-goods>
      <info-activity-goods :goodsDetailData="goodsDetailData"/>
    </div>
    
    <div class="content">
      <!-- 选择规格 -->
      <list-cell v-if="selectSpecsInfo" :title0="selectSpecsInfo.title" :title1="selectSpecsInfo.specs" @tap="onChooseSpecsTap"></list-cell>
      <list-cell title0="服务" title1="正品保证 · 极速物流 · 售后无忧" :iconVisible="false"></list-cell>
    </div>
    <!-- 店铺信息 -->
    <info-shop-goods :shopData="shopData"></info-shop-goods>
    <!-- recommon goods -->
    <recommon-goods :goodsDetailData="goodsDetailData"/>
    <!-- info detail goods -->
    <info-detail-goods :goodsImgList="goodsImgList"></info-detail-goods>
    <!-- menu -->
    <menu-goods
    @add="onMenuAdd"
    @buy="onMenuBuy"
    @toShoppingCart="onMenuToShoppoingCart"
    :btnBuyTxt="btnBuyTxt"
    :isGoodsCancel="isGoodsCancel"
    :isGoodsEmpty="isGoodsEmpty"/>

    <!-- mask -->
    <page-mask v-if="visibleMask" @tap="onMaskTap"></page-mask>
    <!-- 优惠券列表 -->
    <receive-coupon
    :isShow="visibleCoupon"
    @receive="onCouponReceive"
    @close="onCouponClose"
    :couponList="couponList"/>
    <!-- 规格选择 -->
    <choose-specs
    :isShow="visibleSpecs"
    @change="onSpecsChange"
    @confirm="onSpecsConfirm"
    @empty="onSpecsEmpty"
    @close="onSpecsClose"
    :type="specsType"
    :btnBuyTxt="btnBuyTxt"
    :isGoodsCancel="isGoodsCancel"
    :chooseSpecsData="chooseSpecsData"/>
  </div>
</template>

<script>
import bannerGoods from 'components/alaUI/bannerGoods'
import infoPriceGoods from 'components/common/infoPriceGoods'
import infoCouponGoods from 'components/common/infoCouponGoods'
import infoActivityGoods from 'components/common/infoActivityGoods'
import listCell from 'components/common/listCell'
import infoShopGoods from 'components/common/infoShopGoods'
import recommonGoods from 'components/common/recommonGoods'
import infoDetailGoods from 'components/common/infoDetailGoods'
import pageMask from 'components/common/pageMask'
import receiveCoupon from 'components/common/receiveCoupon'
import chooseSpecs from 'components/spec/chooseSpecs'
import menuGoods from 'components/menu/menuGoods'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import systemInfo from 'utils/systemInfo'
import basis from 'utils/basis'
import util from 'utils/index'
import Tips from 'utils/tip'
import storage from 'utils/storage'
import maidian from 'utils/maidian'
import webview from 'utils/webview'

import wx from 'wx'
import _ from 'lodash'
import Monitor from 'utils/monitor'

export default {
  name: '',
  components: {
    bannerGoods,
    infoPriceGoods,
    infoCouponGoods,
    infoActivityGoods,
    listCell,
    infoShopGoods,
    recommonGoods,
    infoDetailGoods,
    pageMask,
    receiveCoupon,
    chooseSpecs,
    menuGoods
  },
  data() {
    return {
      // 优惠券列表
      couponList: [],
      couponTitles: [],
      // 类型，用于区别底部按钮，规格选择(choose)，立即购买(buy)，加入购物车(addCart)
      specsType: 'choose',
      // 规格数据
      goodsSpecsData: null,
      // 用户的规格选择信息
      selectSpecsInfo: null,
      // 商品库存是否为空
      isGoodsEmpty: false,

      visibleCoupon: false,
      visibleSpecs: false
    }
  },
  props: {},
  computed: {
    ...mapState(['isLogin', 'goodsDetailData']),
    ...mapGetters(['userId', 'userName', 'isLogin', 'goodsId']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    visibleMask() {
      return this.visibleCoupon || this.visibleSpecs
    },
    hasGoodsDetailData() {
      return this.goodsDetailData !== null
    },
    picUrlList() {
      if (!this.hasGoodsDetailData) return []
      let list = this.goodsDetailData.goodsPics
      if (!list) list = []
      return list
    },
    btnBuyTxt() {
      if (this.priceData) return this.priceData.btnBuyTxt
      return '立即购买'
    },
    // 商品价格数据
    priceData() {
      if (!this.hasGoodsDetailData) return null
      let { activityId, activityType } = this.goodsDetailData
      // id存在且为秒杀
      let hasActivity = +activityId !== 0
      let { saleAmount, specialPrice, priceAmount } = this.goodsDetailData
      let price = hasActivity ? specialPrice : saleAmount
      let priceHistory = hasActivity ? saleAmount : priceAmount

      let duration = 0
      let durationTxt = ''
      let btnBuyTxt = '立即购买'
      hasActivity = hasActivity && activityType === 2
      if (hasActivity) {
        let { nowDate, gmtStart, gmtPstart, gmtEnd } = this.goodsDetailData
        if (!gmtPstart) gmtPstart = nowDate
        if (nowDate < gmtPstart) {
          hasActivity = false
        } else {
          if (nowDate < gmtStart) {
            // 未开始
            durationTxt = '距开始'
            btnBuyTxt = '即将抢购'
            duration = gmtStart - nowDate
          } else if (nowDate >= gmtStart && nowDate < gmtEnd) {
            // 已经开始还未结束
            durationTxt = '距结束仅剩'
            duration = gmtEnd - nowDate
          } else {
            // 已经结束
            durationTxt = '活动已结束'
            duration = 0
          }
        }
      }
      return { hasActivity, price, priceHistory, duration, durationTxt, btnBuyTxt }
    },
    goodsLimitNum() {
      if (this.priceData) {
        let { limitCount, limitedPurchase } = this.goodsDetailData
        if (this.priceData.hasActivity) {
          // 有活动
          if (limitedPurchase < 0) return limitCount
          return Math.min(limitCount, limitedPurchase)
        } else {
          // 没有活动
          return limitedPurchase
        }
      }
      return 0
    },
    shopData() {
      if (this.hasGoodsDetailData) return this.goodsDetailData.storeShopDto
      return null
    },
    goodsName() {
      if (!this.hasGoodsDetailData) return ''
      return this.goodsDetailData.goodsName
    },
    hasRemark() {
      if (!this.hasGoodsDetailData) return false
      return this.goodsDetailData.remark
    },
    remark() {
      if (!this.hasGoodsDetailData) return ''
      return this.goodsDetailData.remark
    },
    freight() {
      if (!this.hasGoodsDetailData) return '包邮'
      let explan = this.goodsDetailData.freightExplanation
      if (explan) return explan
      return '包邮'
    },
    saleCount() {
      if (!this.hasGoodsDetailData) return 0
      return this.goodsDetailData.saleCount
    },
    goodsImgList() {
      if (!this.hasGoodsDetailData) return []
      let list = this.goodsDetailData.goodsDetail
      list = list.map(value => value.picUrl)
      return list
    },
    // 规格数据
    chooseSpecsData() {
      if (!this.hasGoodsDetailData) return null
      if (!this.goodsSpecsData) return null
      let price = this.priceData.price
      let icon = this.goodsDetailData.goodsIcon
      let goodsName = this.goodsDetailData.goodsName
      let goodsId = this.goodsDetailData.goodsId
      let goodsLimitNum = this.goodsLimitNum
      return { price, icon, goodsName, goodsId, goodsLimitNum, ...this.goodsSpecsData }
    },
    //
    isGoodsCancel() {
      if (!this.hasGoodsDetailData) return false
      return this.goodsDetailData.status === 'CANCEL'
    },
    isUseCoupon() {
      if (this.hasGoodsDetailData) {
        return this.goodsDetailData.isUseCoupon === 1
      }
      return true
    },
    // 是否显示秒杀不可使用优惠券提示
    isShowMsg() {
      if (this.priceData) {
        return this.priceData.hasActivity && !this.isUseCoupon
      }
      return false
    }
  },
  created() {},
  mounted() {},
  onPullDownRefresh() {
    this.resetData()
    this.loadGoodsDetailData(this.goodsDetailData)
  },
  // 小程序生命周期 页面卸载
  onUnload() {
    this.resetData()
    // 移除当前goodsId
    this.deleteGoodsIdInIds()
  },
  onHide() {
    Monitor.pageHide()
  },
  onLoad(options) {
    if (options.goodsId) {
      this.goodsId = options.goodsId
      this.setGoodsIdsData(options.goodsId)

      // 更新源
      if (options.lc) {
        this.setLocationCode(options.lc)
      }
    }
  },
  onShow() {
    if (storage.props.launchStatus === 1) return
    // 从模版消息 等其他地方进入时
    let options = storage.props.launchOptions
    if (options && options.query.goodsId) {
      this.setGoodsIdsData(options.query.goodsId)

      // 清空一下
      options.query = {}
      storage.props.launchOptions = options
    }
    this.loadGoodsDetailData()
    // 埋点
    maidian.shop(maidian.spm.shop_detail)
    Monitor.pageShow()
  },
  onError() {
    Monitor.pageError()
  }, // 小程序分享事件
  onShareAppMessage(options) {
    return {
      title: this.shareConfig.shareAppTitle,
      path: '/pages/common/goodsDetail?goodsId=' + this.goodsId
    }
  },
  watch: {},
  methods: {
    ...mapMutations([
      'setGoodsIdsData',
      'setCurrentTabbarIndex',
      'deleteGoodsIdInIds',
      'setGoodsDetailData',
      'setLocationCode'
    ]),
    ...mapActions([
      'getGoodsDetailData',
      'getCollectCouponListData',
      'collectCoupon',
      'submitFormId',
      'setConfirmGoodsData',
      'postMaidianInfo'
    ]),
    ...mapActions('coupon', ['getDetailCouponList']),
    ...mapActions('shoppingCart', ['addGoods', 'getUserGoodsNumber', 'getGoodsSpec']),
    resetData() {
      this.couponList = []
      this.couponTitles = []
      this.goodsSpecsData = null
      this.selectSpecsInfo = null
      this.isGoodsEmpty = false

      this.visibleCoupon = false
      this.visibleSpecs = false
    },
    onMaskTap() {
      this.visibleCoupon = false
      this.visibleSpecs = false
    },
    onActivityTimeout() {
      // 倒计时结束
      this.resetData()
      this.loadGoodsDetailData(this.goodsDetailData)
    },
    onShowCouponTap() {
      this.visibleCoupon = true
    },
    async onCouponReceive(couponId) {
      if (!this.isLogin) {
        basis.toLogin()
        return
      }
      let data = await this.collectCoupon({ couponId })
      if (data) {
        this.loadCollectCouponListData()
        Tips.toast('领取成功')
      }
    },
    onCouponClose() {
      this.visibleCoupon = false
    },
    onChooseSpecsTap() {
      // 选择规格
      this.specsType = 'choose'
      this.visibleSpecs = true
    },
    onMenuAdd() {
      // 加入购物车
      this.specsType = 'addCart'
      this.visibleSpecs = true
    },
    onMenuBuy() {
      if (this.priceData.btnBuyTxt === '即将抢购') {
        // 即将抢购
        Tips.toast('活动未开始')
      } else {
        // 立即购买
        this.specsType = 'buy'
        this.visibleSpecs = true
      }
    },
    onMenuToShoppoingCart() {
      if (!this.isLogin) {
        basis.toLogin()
        return
      }
      // 去购物车
      webview.openShoppingCart()
    },
    onSpecsChange(info) {
      this.selectSpecsInfo = info
    },
    async onSpecsConfirm(data) {
      if (!this.isLogin) {
        basis.toLogin()
        return
      }
      this.visibleSpecs = false
      let type = data.type
      if (type === 'addCart') {
        // 加入购物车
        let { goodsId, goodsSpecId: priceId, goodsNum, goodsPrice } = data.goodsSpec
        let success = await this.addGoods({ goodsId, priceId, goodsNum, goodsPrice })
        if (success) Tips.success('添加成功')
      } else {
        if (this.priceData.btnBuyTxt === '即将抢购') {
          // 即将抢购
          Tips.toast('活动未开始')
        } else {
          // 立即购买
          let goodsInfo = { ...this.goodsDetailData }
          let goodsSpec = data.goodsSpec
          let storeShopDto = this.goodsDetailData.storeShopDto
          let confirmGoodsData = { goodsInfo, goodsSpec, storeShopDto }
          this.setConfirmGoodsData(confirmGoodsData)
          basis.toOrderConfirm()
        }
      }
    },
    onSpecsEmpty() {
      // 无库存
      this.isGoodsEmpty = true
    },
    onSpecsClose() {
      this.visibleSpecs = false
    },
    async loadGoodsDetailData(initData = null) {
      await this.getGoodsDetailData(initData)
      wx.stopPullDownRefresh()

      this.loadGoodsSpecsData()

      if (this.isUseCoupon) {
        this.loadCollectCouponListData()
      }

      this.getUserGoodsNumber()
    },
    async loadCollectCouponListData() {
      let storeShopDto = this.goodsDetailData.storeShopDto
      let shopCoupon = 0
      if (storeShopDto) shopCoupon = storeShopDto.rid
      let goodsId = this.goodsDetailData.goodsId
      let params = { goodsId, shopCoupon }
      let data = await this.getDetailCouponList(params)
      let list = data.couponList

      let couponTitles = list.map(value => {
        let title = ''
        let limitAmount = value.limitAmount
        if (!limitAmount) limitAmount = '任意金额'
        if (value.type === 'DISCOUNT') {
          let discount = Number(value.discount * 10).toFixed(1)
          title = `满${limitAmount}享${discount}折`
        } else {
          title = `满${limitAmount}减${value.amount}`
        }
        return title
      })
      this.couponTitles = _.uniq(couponTitles)

      this.couponList = list.map(value => {
        let date = util.formatDate(value.gmtEnd)
        let toDays = basis.formatTimestampToDays(value.gmtEnd)
        let isGot = value.userAlready >= value.limitCount
        let isAllGot = value.quotaAlready >= value.quota
        let discount = (value.discount * 10).toFixed(1)
        let collapse = false
        let isExclude = false
        let data = { ...value, ...toDays, date, isGot, isAllGot, discount, collapse, isExclude }
        return data
      })
    },
    async loadGoodsSpecsData() {
      let { activityId, goodsId } = this.goodsDetailData
      let params = { goodsId }
      if (activityId) params.activityId = activityId
      let data = await this.getGoodsSpec(params)
      if (data) {
        // 数据存在
        this.goodsSpecsData = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@menu-height: 50px;
.goods-detail {
  .fill-page(@color-bg);
  padding-bottom: @menu-height;
  .adapt-iphonex(@menu-height);
  .goods-info {
    background: white;
    padding-top: 10px;
    padding-left: @padding-h;
    margin-bottom: 10px;
    .goods-name {
      padding-right: @padding-h;
      color: @color-txt;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      line-height: 20px;
    }
    .info-else {
      position: relative;
      .border-1px-bottom();
      .flex-hor-center();
      height: 40px;
      font-size: 14px;
      color: @color-txt-2;
      .freight {
        .flex-n();
        .show-line();
      }
      .sale-count {
        padding-right: 20px;
      }
    }
  }
  .content {
    margin-bottom: 10px;
  }
  /deep/.recommon-goods {
    margin-bottom: 10px;
  }
}
</style>