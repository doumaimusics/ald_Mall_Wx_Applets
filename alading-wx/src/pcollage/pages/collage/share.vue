/**
* Created by xiejun on 2018/12/06.
* 分享
*/
<template>
  <div v-if="hasShareData" class="collage-to-share">
    <div class="head share">
      <goods-node v-if="!shareInfo.isAttend" @tap="onGoodsNameTap" :goodsData="goodsInfo"/>

      <expire-countdown v-if="shareInfo.hasCountdown" :duration="expireDuration"/>

      <div class="info" v-html="title"></div>
      <user-list :userInfoList="userInfoList"/>

      <form class="form-container" @submit="onFormSubmit" report-submit="true">
        <button
        formType="submit"
        class="btn-menu"
        v-for="(menuTitle, index) in shareInfo.menu"
        @tap="onMenuTap(index)"
        :class="'b' + index"
        :key="index">
        {{menuTitle}}
        </button>
      </form>
    </div>

    <div class="menu">
      <list-cell v-if="shareInfo.isAttend" title1="商品名称" :title2="goodsName" @tap="onGoodsNameTap"></list-cell>
      <list-cell title1="拼团规则" title2="开团／参团·邀请好友·满员发货／不满自动退款" @tap="onRuleTap" :hasBorder="shareInfo.isAttend"></list-cell>
      <list-cell v-if="shareInfo.isAttend" title1="拼团订单" title2="查看拼团详情" @tap="onOrderTap" :hasBorder="true"></list-cell>
    </div>

    <div class="container">
      <div class="btn-more" @tap="onMoreTap">
        <span>更多团购</span>
        <span class="icon-more"></span>
      </div>
      <list-goods @goodsTap="onGoodsTap" :goodsList="goodsList"/>
    </div>

    <!-- 拼团规则 -->
    <rule-toast v-if="ruleVisible" @tap="onRuleCloseTap"/>
    <!-- 去分享 -->
    <to-share-toast
    v-if="toShareVisible"
    @close="onToShareCloseTap"
    :needCollageCount="needCollageCount"/>
    <!-- 分享成功 -->
    <share-success-toast
    v-if="shareSuccessVisible"
    @continue="onShareSuccessContinueTap"
    @close="onShareSuccessCloseTap"/>
    <!-- 参与拼团时，存在待支付及待分享订单 -->
    <collage-fail-toast
    v-if="collageFailVisible"
    :title="collageFailInfo.title"
    :btnTitle="collageFailInfo.btnTitle"
    :duration="collageFailInfo.duration"
    @tap="onCollageFailTap"
    @timeout="onCollageFailTimeout"
    @close="onCollageFailCloseTap"/>
    <!-- 拼团规格 -->
    <collage-specs-choose
    @ok="onSpecsChooseOk"
    @close="onSpecsChooseClose"
    @change="onSpecsChooseChange"
    :visible="collageSpecsVisible"
    :goodsInfo="goodsInfo"
    :priceData="priceData"
    :propertyData="propertyData"
    submitName="参与拼团"/>
    <!-- 蒙层 -->
    <toast-mask
    :visible="maskVisible"
    @tap="onMaskTap"/>
  </div>
</template>

<script>
import goodsNode from './goodsNode'
import expireCountdown from './expireCountdown'
import userList from 'pcollagecomp/common/userList'
import listCell from 'pcollagecomp/common/listCell'
import listGoods from 'pcollagecomp/goods/listGoods'
import ruleToast from 'pcollagecomp/toast/ruleToast'
import toShareToast from 'pcollagecomp/toast/toShareToast'
import shareSuccessToast from 'pcollagecomp/toast/shareSuccessToast'
import collageFailToast from 'pcollagecomp/toast/collageFailToast'
import collageSpecsChoose from 'pcollagecomp/specs/collageSpecsChoose'
import toastMask from 'components/toast/toastMask'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import collageStatus from 'utils/collageOrderStatus'
import basis from 'pcollagecomp/basis'
import share from 'pcollagecomp/share'
import navigate from 'utils/navigate'
import basisUtil from 'utils/basis'
import maidian from 'utils/maidian'
import Tips from 'utils/tip'
import storage from 'utils/storage'
import orderConfirmStatus from 'pcollagecomp/orderConfirmStatus'
import wx from 'wx'
import Monitor from 'utils/monitor'
export default {
  name: '',
  data() {
    return {
      ruleVisible: false,
      toShareVisible: false,
      shareSuccessVisible: false,
      collageFailVisible: false,
      // 参与拼团时，用户存在待支付或待分享订单详情数据
      collageFailInfo: {},
      // 拼团选择的规格数据
      specsChooseData: {},
      // 拼团规格选择visible
      collageSpecsVisible: false
    }
  },
  props: {},
  computed: {
    ...mapState(['isLogin']),
    ...mapState('collage', ['toShareData', 'goodsDetailData']),
    ...mapGetters('collage', ['currentShareParams']),
    maskVisible() {
      return (
        this.ruleVisible ||
        this.toShareVisible ||
        this.shareSuccessVisible ||
        this.collageSpecsVisible ||
        this.collageFailVisible
      )
    },
    hasShareData() {
      return this.toShareData !== null
    },
    goodsInfo() {
      if (this.hasShareData) {
        return this.toShareData.goodsInfo
      }
      return null
    },
    priceData() {
      if (!this.goodsDetailData) return []
      return this.goodsDetailData.priceData
    },
    propertyData() {
      if (!this.goodsDetailData) return []
      return this.goodsDetailData.propertyData
    },
    shareInfo() {
      if (this.hasShareData) {
        return collageStatus.shareInfo(this.toShareData)
      }
      return null
    },
    title() {
      if (this.hasShareData) {
        let t = this.shareInfo.title
        if (typeof t === 'string') {
          if (this.shareInfo.hasSign) {
            t = `<span class="info-icon"></span>${t}`
          }
        } else {
          t = `${t[0]}<span class="info-count">${this.needCollageCount}</span>${t[1]}`
        }
        return t
      }
      return ''
    },
    expireDuration() {
      if (this.hasShareData) {
        return basis.calcExpireDuration(this.toShareData, 'ms')
      }
      return 0
    },
    needCollageCount() {
      if (this.hasShareData) {
        return basis.calcNeedCollageCount(this.toShareData)
      }
      return 1
    },
    userInfoList() {
      if (this.hasShareData) {
        return basis.transUserInfoList(this.toShareData)
      }
      return []
    },
    goodsName() {
      if (this.hasShareData) {
        return this.goodsInfo.name
      }
      return ''
    },
    goodsList() {
      if (this.hasShareData) {
        let list = this.toShareData.moreGoodsList
        if (list) return list
      }
      return []
    }
  },
  created() {
    console.log('crreated')
    this.shareUtil = share.createShare()
  },
  mounted() {},
  onPullDownRefresh() {
    this.refresh()
  },
  onShareAppMessage(res) {
    let title = `【仅剩${this.needCollageCount}个名额】${this.goodsInfo.marketingPrice}元 ${this.goodsName}`
    let imageUrl = this.toShareData.goodsInfo.picUrlList[0]
    let pathParams = this.currentShareParams
    let success = res => {
      // 转发成功
      this.shareSuccessVisible = true
      this.toShareVisible = false
    }
    let fail = res => {
      this.toShareVisible = true
    }
    return this.shareUtil.shareMessage({ title, imageUrl, pathParams, success, fail })
  },
  onShow() {
    if (storage.props.launchStatus === 1) return

    let options = storage.props.launchOptions
    if (options && options.query.orderId) {
      let { orderId, pinOrderNo, goodsId, goodsPriceId } = options.query
      orderId = +orderId
      goodsId = +goodsId
      goodsPriceId = +goodsPriceId
      this.pushShareParams({ orderId, pinOrderNo, goodsId, goodsPriceId })

      // 清空一下
      options.query = {}
      storage.props.launchOptions = options
    }

    maidian.view('pin_sharedetail', this.currentShareParams.pinOrderNo)
    // 针对分享状态
    if (this.shareUtil.isInit()) {
      this.resetData()
      this.toGetSharePage()
    }
    this.shareUtil.reset()
    Monitor.pageShow()
  },
  onUnload() {
    if (storage.props.launchStatus === 1) return
    this.initChooseSpecsData()

    this.popShareParams()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {},
  methods: {
    ...mapMutations(['formIdListPush']),
    ...mapMutations('collage', [
      'pushGoodsId',
      'clearShareParams',
      'pushShareParams',
      'popShareParams',
      'setOrderDetailParams',
      'setOrderComfirmGoodsData',
      'setOrderComfirmStatus',
      'resetOrderConfirmStatus'
    ]),
    ...mapActions(['formIdListSubmit']),
    ...mapActions('collage', ['resetIndex', 'getSharePage', 'getGoodsDetail']),
    onFormSubmit(event) {
      this.formIdListPush(event.target.formId)
    },
    resetData() {
      this.initChooseSpecsData()
      this.ruleVisible = false
      this.toShareVisible = false
      this.shareSuccessVisible = false
      this.collageFailVisible = false
      this.collageSpecsVisible = false
    },
    async toGetSharePage() {
      await this.getSharePage()
      this.toShareVisible = this.shareInfo.isAutoShowShareToast
    },
    async refresh() {
      await this.getSharePage()
      wx.stopPullDownRefresh()
    },
    // 立即拼团
    async buyHandler() {
      maidian.click('pin_sharedetail_join', this.currentShareParams.pinOrderNo)
      // 判断是否登录
      if (!this.isLogin) {
        basisUtil.toLogin()
        return
      }

      this.pushGoodsId(this.goodsInfo.goodsId)
      await this.getGoodsDetail({ goodsDetailFlg: 1 })

      // 判断一下用户是否存在待支付或待分享订单
      if (this.goodsDetailData.orderStatus) {
        let status = this.goodsDetailData.orderStatus
        let { pinOrderStatus, payStatus } = this.goodsDetailData
        // 拼团订单信息
        this.collageOrderInfo = collageStatus.info({ status, pinOrderStatus, payStatus })
        let failInfo = basis.getToBuyFailInfo(this.collageOrderInfo, this.goodsDetailData)
        if (failInfo) {
          this.collageFailInfo = failInfo
          this.collageFailVisible = true
          return
        }
      }
      // 显示规格选择
      this.setOrderComfirmStatus(orderConfirmStatus.TO_COLLAGE)

      this.isDefaultSelect = this.priceData.length === 1
      if (!this.isDefaultSelect) this.collageSpecsVisible = true
    },
    onMenuTap(index) {
      let action = this.shareInfo.menuAction[index]
      switch (action) {
        case 'share':
          // 邀请好友拼团
          this.toShareVisible = true
          break
        case 'buy':
          // 开团， 跳转商品详情页
          maidian.click('pin_sharedetail_goods', this.currentShareParams.pinOrderNo)
          this.pushGoodsId(this.goodsInfo.goodsId)
          navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
          break
        case 'toBuy':
          // 立即拼团
          // 取得商品规格，打开规格窗口进入拼团购买流程
          this.buyHandler()
          break
        case 'home':
          // 回拼团首页
          this.onMoreTap()
          break
        case 'toast':
          // 弹窗提示一下
          let info = this.shareInfo.toastInfo[index]
          Tips.toast(info)
          break
        case 'detail':
          // 查看详情
          this.onOrderTap()
          break
      }
    },
    onGoodsNameTap() {
      // 跳转到拼团商品
      maidian.click('pin_sharedetail_goods', this.currentShareParams.pinOrderNo)
      if (this.shareInfo.isShare && !this.shareInfo.isAttend) {
        this.setOrderComfirmStatus(orderConfirmStatus.TO_COLLAGE)
      }

      this.pushGoodsId(this.goodsInfo.goodsId)
      navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
    },
    onRuleTap() {
      this.ruleVisible = true
    },
    onOrderTap() {
      // 进入对应的订单详情
      let orderId = this.toShareData.orderId
      let pinOrderNo = this.currentShareParams.pinOrderNo
      if (!orderId) orderId = this.currentShareParams.orderId

      maidian.click('pin_sharedetail_goodslist', pinOrderNo)
      this.setOrderDetailParams({ orderId, pinOrderNo })
      navigate.push({ url: '/pcollage/pages/detail/order/detailOrder' })
    },
    onGoodsTap(data) {
      maidian.click('pin_sharedetail_goodslist', data.name, data.goodsId)
      this.pushGoodsId(data.goodsId)
      navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
    },
    onMoreTap() {
      maidian.click('pin_sharedetail_moregoods', this.goodsInfo.name, this.goodsInfo.goodsId)
      this.resetIndex()
      navigate.reLaunch({ url: '/pcollage/pages/index/index' })
    },
    onRuleCloseTap() {
      this.ruleVisible = false
    },
    onToShareCloseTap() {
      this.toShareVisible = false
    },
    onShareSuccessContinueTap() {
      this.shareSuccessVisible = false
      this.toShareVisible = true
    },
    onShareSuccessCloseTap() {
      this.shareSuccessVisible = false
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
    onMaskTap() {
      if (this.collageFailVisible) return

      this.ruleVisible = false
      this.toShareVisible = false
      this.shareSuccessVisible = false

      if (this.collageSpecsVisible) this.resetOrderConfirmStatus()
      this.collageSpecsVisible = false
    },

    initChooseSpecsData() {
      this.specsChooseData = {
        chooseSpecs: '请选择 规格',
        allset: false
      }
    },
    onSpecsChooseOk() {
      maidian.click('pin_sharedetail_confirm', this.currentShareParams.pinOrderNo)
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

      if (this.isDefaultSelect) {
        this.isDefaultSelect = false
        // 取得商品详情里的规格之后，就会触发规格选择变化
        this.checkSpecsChoose()
      }
    },
    // 判断规格的选择
    checkSpecsChoose() {
      if (this.specsChooseData.allset) {
        this.formIdListSubmit()

        let goodsInfo = this.goodsDetailData.goodsInfo
        let goodsIcon = goodsInfo.goodsIcon
        let goodsId = goodsInfo.goodsId
        let pinOrderNo = goodsInfo.pinOrderNo
        if (!pinOrderNo) pinOrderNo = ''
        let goodsName = goodsInfo.name
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
    goodsNode,
    expireCountdown,
    userList,
    listCell,
    listGoods,
    ruleToast,
    toShareToast,
    shareSuccessToast,
    collageFailToast,
    toastMask,
    collageSpecsChoose
  }
}
</script>

<style lang="less">
@import 'share.less';
</style>
