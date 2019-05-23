/**
* Created by xiejun on 2018/10/16.
* 通用频道
*/
<template>
  <div class="common-node">
    <ala-goods-info-list
    @listGoodsClick="onListGoodsClick"
    :goodsInfoListData="showGoodsInfoList"/>
    <!-- 底部加载中 -->
    <ala-loadding-bottom :status="loadingBottomStatus"/>
  </div>
</template>

<script>
import alaGoodsInfoList from 'components/goodsInfo/goodsInfoList'
import alaLoaddingBottom from 'components/loadding/loaddingBottom'

import { mapState, mapGetters, mapActions } from 'vuex'
import cache from 'utils/cache'
import Tips from 'utils/tip'
import wx from 'wx'
import maidian from 'utils/maidian'

export default {
  name: '',
  data() {
    return {
      // 当前页
      pageNum: 1,
      // 商品信息流
      goodsInfoListData: [],
      // 历史数据，用于下拉刷新时，暂时显示
      historyGoodsInfoList: [],
      // 底部加载
      loadingBottomStatus: 0
    }
  },
  props: {},
  computed: {
    ...mapState(['currentChannelIndex']),
    ...mapGetters(['channelId']),
    cacheKey() {
      return 'channel_' + this.channelId
    },
    showGoodsInfoList() {
      if (this.goodsInfoListData.length) return this.goodsInfoListData
      if (this.historyGoodsInfoList && this.historyGoodsInfoList.length) return this.historyGoodsInfoList
      return []
    }
  },
  created() {
    this.historyGoodsInfoList = cache.listGet(this.cacheKey, this.pageNum)
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
  watch: {
    currentChannelIndex() {
      // 更新频道列表
      this.pageNum = 1
      this.goodsInfoListData = []
      this.historyGoodsInfoList = cache.listGet(this.cacheKey, this.pageNum)
      this.loadingBottomStatus = 0
      this.getGoods()
    }
  },
  methods: {
    ...mapActions(['getChannelMoreGoods']),
    onListGoodsClick() {
      maidian.index2(this.channelId, maidian.spm.pindao_id_product)
    },
    async refresh() {
      Tips.loading()
      this.historyGoodsInfoList = this.goodsInfoListData
      this.pageNum = 1
      this.goodsInfoListData = []
      this.loadingBottomStatus = 0
      cache.listClear(this.cacheKey, this.pageNum)
      await this.getGoods()
      wx.stopPullDownRefresh()
      Tips.loaded()
    },
    // 取得商品信息列表
    async getGoods() {
      if (this.pageNum > 0) {
        let data = await cache.list(this.cacheKey, this.pageNum, this.toGetGoods, cache.TIMEOUT)
        if (data) {
          let list = data.moreGoodsList
          if (list && list.length) {
            this.goodsInfoListData = this.goodsInfoListData.concat(list)
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
      let params = { pageNum: this.pageNum, tabId: this.channelId }
      let data = await this.getChannelMoreGoods(params)
      return data
    }
  },
  components: { alaGoodsInfoList, alaLoaddingBottom }
}
</script>

<style lang="less">
</style>