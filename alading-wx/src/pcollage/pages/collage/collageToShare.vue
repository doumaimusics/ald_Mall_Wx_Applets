/**
* Created by xiejun on 2018/12/04.
* 邀请好友拼单
*/
<template>
  <div v-if="hasShareData" class="collage-to-share">
    <div class="head">
      <expire-countdown :duration="expireDuration"/>
      <div class="info">还差<span class="info-count">{{needCollageCount}}</span>人，人满即可拼单成功</div>
      <div class="info-des">人满后立即发货</div>
      <user-list :userInfoList="userInfoList"/>
      <div class="btn-menu" @tap="onToShareTap">邀请好友拼团</div>
    </div>

    <div class="menu">
      <list-cell title1="商品名称" :title2="goodsName" @tap="onGoodsNameTap"></list-cell>
      <list-cell title1="拼团规则" title2="开团／参团·邀请好友·满员发货／不满自动退款" @tap="onRuleTap" :hasBorder="true"></list-cell>
      <list-cell title1="拼团订单" title2="查看拼团详情" @tap="onOrderTap" :hasBorder="true"></list-cell>
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
    <!-- 蒙层 -->
    <toast-mask
    :visible="maskVisible"
    @tap="onMaskTap"/>
  </div>
</template>

<script>
import expireCountdown from './expireCountdown'
import userList from 'pcollagecomp/common/userList'
import listCell from 'pcollagecomp/common/listCell'
import listGoods from 'pcollagecomp/goods/listGoods'
import ruleToast from 'pcollagecomp/toast/ruleToast'
import toShareToast from 'pcollagecomp/toast/toShareToast'
import shareSuccessToast from 'pcollagecomp/toast/shareSuccessToast'
import toastMask from 'components/toast/toastMask'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import basis from 'pcollagecomp/basis'
import share from 'pcollagecomp/share'
import navigate from 'utils/navigate'
import basisUtil from 'utils/basis'
import storage from 'utils/storage'
import wx from 'wx'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      ruleVisible: false,
      toShareVisible: true,
      shareSuccessVisible: false
    }
  },
  props: {},
  computed: {
    ...mapState(['isLogin']),
    ...mapState('collage', ['toShareData']),
    ...mapGetters('collage', ['currentShareParams']),
    maskVisible() {
      return this.ruleVisible || this.toShareVisible || this.shareSuccessVisible
    },
    hasShareData() {
      return this.toShareData !== null
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
        return this.toShareData.goodsInfo.name
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
    this.shareUtil = share.createShare()
  },
  mounted() {},

  onPullDownRefresh() {
    this.toGetSharePage()
  },

  onShareAppMessage(res) {
    let title = `【仅剩${this.needCollageCount}个名额】${this.toShareData.goodsInfo.marketingPrice}元 ${this.goodsName}`
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
    if (!this.isLogin) {
      basisUtil.toLogin()
      return
    }

    let options = storage.props.launchOptions
    if (options && options.query.orderId) {
      let { orderId, pinOrderNo, goodsId, goodsPriceId } = options.query
      this.pushShareParams({ orderId, pinOrderNo, goodsId, goodsPriceId })

      // 清空一下
      options.query = {}
      storage.props.launchOptions = options
    }

    // 针对分享状态
    if (this.shareUtil.isInit()) {
      this.resetData()
      this.getSharePage()
    }
    this.shareUtil.reset()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onUnload() {
    this.popShareParams()
  },
  watch: {},
  methods: {
    ...mapMutations('collage', ['pushGoodsId', 'setOrderDetailParams', 'pushShareParams', 'popShareParams']),
    ...mapActions('collage', ['resetIndex', 'getSharePage']),
    resetData() {
      this.ruleVisible = false
      this.toShareVisible = true
      this.shareSuccessVisible = false
    },
    async toGetSharePage() {
      await this.getSharePage()
      wx.stopPullDownRefresh()
    },
    onToShareTap() {
      this.toShareVisible = true
    },
    onGoodsNameTap() {
      this.pushGoodsId(this.toShareData.goodsInfo.goodsId)
      navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
    },
    onRuleTap() {
      this.ruleVisible = true
    },
    onOrderTap() {
      // 进入对应的订单详情
      let { orderId, pinOrderNo } = this.currentShareParams
      this.setOrderDetailParams({ orderId, pinOrderNo })
      navigate.push({ url: '/pcollage/pages/detail/order/detailOrder' })
    },
    onGoodsTap(data) {
      this.pushGoodsId(data.goodsId)
      navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
    },
    onMoreTap() {
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
    onMaskTap() {
      this.ruleVisible = false
      this.toShareVisible = false
      this.shareSuccessVisible = false
    }
  },
  components: {
    expireCountdown,
    userList,
    listCell,
    listGoods,
    ruleToast,
    toShareToast,
    shareSuccessToast,
    toastMask
  }
}
</script>

<style lang="less">
@import 'share.less';
</style>
