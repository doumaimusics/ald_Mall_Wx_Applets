/**
* Created by xiejun on 2018/10/16.
* 推荐频道
*/
<template>
  <div class="recommend-node">
    <!-- banner -->
    <banner-head @tap="onTap" :bannerList="bannerList"></banner-head>
    <!-- quick nav  -->
    <ala-quick-nav></ala-quick-nav>
    <!-- operation position -->
    <ala-operation-position/>
    <!-- goods information flow -->
    <ala-goods-information-flow :goodsInfoFlow="showGoodsInfoList"/>
    <!-- 底部加载中 -->
    <ala-loadding-bottom :status="loadingBottomStatus"/>
  </div>
</template>

<script>
import bannerHead from 'components/alaUI/bannerHead'

import alaQuickNav from './quickNav'
import alaOperationPosition from './operationPosition'
import alaGoodsInformationFlow from './goodsInformationFlow'
import alaLoaddingBottom from 'components/loadding/loaddingBottom'

import { mapGetters, mapActions } from 'vuex'
import cache from 'utils/cache'
import webview from 'utils/webview'
import maidian from 'utils/maidian'
import wx from 'wx'
export default {
  name: '',
  data() {
    return {
      pageNum: 1,
      pageFlag: 'VDIAN_WECHAT_HOT_GOODS',
      // 商品信息流
      goodsInfoFlow: [],
      // 历史数据，用于下拉刷新时，暂时显示
      historyGoodsInfoList: [],
      // 底部加载
      loadingBottomStatus: 0
    }
  },
  props: {},
  computed: {
    ...mapGetters(['bannerList']),
    showGoodsInfoList() {
      if (this.goodsInfoFlow.length) return this.goodsInfoFlow
      if (this.historyGoodsInfoList && this.historyGoodsInfoList.length) return this.historyGoodsInfoList
      return []
    }
  },
  created() {
    this.historyGoodsInfoList = cache.listGet('recommendGoods', this.pageNum)
    this.getGoods()
  },
  mounted() {},
  onPullDownRefresh() {
    this.refresh()
  },
  onReachBottom() {
    if (this.isReachBottomLoadding) return
    this.isReachBottomLoadding = true
    this.getGoods()
  },
  watch: {},
  methods: {
    ...mapActions(['getBottomMoreGoods']),
    async refresh() {
      this.historyGoodsInfoList = this.goodsInfoFlow
      this.pageNum = 1
      this.goodsInfoFlow = []
      this.loadingBottomStatus = 0
      cache.listClear('recommendGoods', this.pageNum)
      await this.getGoods()

      wx.stopPullDownRefresh()
    },
    onTap(index) {
      maidian.index2(index, maidian.spm.banner_n)

      let url = this.bannerList[index].content
      webview.openOpeNav(url)
    },
    async getGoods() {
      if (this.pageNum > 0) {
        let data = await cache.list('recommendGoods', this.pageNum, this.toGetGoods, cache.TIMEOUT)
        if (data) {
          let list = data.moreGoodsList
          if (list && list.length) {
            this.goodsInfoFlow = this.goodsInfoFlow.concat(list)
            this.pageNum++
            if (data.nextPageNo < 0) this.pageNum = -1
          } else {
            this.pageNum = -1
          }
        }
      }
      this.historyGoodsInfoList = []
      this.loadingBottomStatus = this.pageNum < 0 ? 1 : 0
      this.isReachBottomLoadding = false
    },
    async toGetGoods() {
      let params = { pageNum: this.pageNum, pageFlag: this.pageFlag }
      let data = await this.getBottomMoreGoods(params)
      return data
    }
  },
  components: {
    bannerHead,

    alaQuickNav,
    alaOperationPosition,
    alaGoodsInformationFlow,
    alaLoaddingBottom
  }
}
</script>

<style lang="less">
.recommend-node {
  .ala-loadding-bottom {
    margin-top: 10px;
  }
}
</style>