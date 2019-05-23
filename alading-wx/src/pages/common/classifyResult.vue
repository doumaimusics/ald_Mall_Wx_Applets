/**
* Created by xiejun on 2018/10/29.
* 分类结果页
*/
<template>
  <div class="ala-classify-result">
    <ala-search-tag :showSearchIcon="false" :placeholder="categoryName"></ala-search-tag>
    <ala-goods-info-list
    @listGoodsClick="onListGoodsClick"
    :goodsInfoListData="goodsInfoFlow"/>
    <!-- 底部加载中 -->
    <ala-loadding-bottom :status="loadingBottomStatus"/>
  </div>
</template>

<script>
import alaSearchTag from 'components/search/searchTag'
import alaGoodsInfoList from 'components/goodsInfo/goodsInfoList'
import alaLoaddingBottom from 'components/loadding/loaddingBottom'

import { mapMutations, mapActions } from 'vuex'
import cache from 'utils/cache'
import lcUtil from 'utils/lcUtil'
import maidian from 'utils/maidian'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      categoryName: '',
      categoryId: 0,

      pageNum: 1,
      // 商品信息流
      goodsInfoFlow: [],
      // 底部加载
      loadingBottomStatus: 0
    }
  },
  props: {},
  computed: {},
  created() {},
  mounted() {
    let query = this.$root.$mp.query
    if (query.categoryId) {
      this.categoryId = query.categoryId
      this.categoryName = query.categoryName
    }
    // 添加来源
    this.setLocationCode(lcUtil.category(this.categoryId))

    this.pageNum = 1
    this.goodsInfoFlow = []
    this.loadingBottomStatus = 0
    this.getGoods()
  },
  onShow() {
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onReachBottom() {
    if (this.isReachBottomLoadding) return
    this.isReachBottomLoadding = true
    this.getGoods()
  },
  watch: {},
  methods: {
    ...mapMutations(['setLocationCode']),
    ...mapActions(['getGoodsList']),
    onListGoodsClick() {
      maidian.classify(maidian.spm.classify_product)
    },
    // 取得商品信息流
    async getGoods() {
      if (this.pageNum > 0) {
        let data = await cache.list('classify_' + this.categoryId, this.pageNum, this.toGetGoods, cache.TIMEOUT)
        if (data) {
          let list = data.goodsList
          if (list && list.length) {
            this.goodsInfoFlow = this.goodsInfoFlow.concat(list)
            this.pageNum++
            if (this.pageNum > data.pages) this.pageNum = -1
          } else {
            this.pageNum = -1
          }
        }
      }
      this.loadingBottomStatus = this.pageNum < 0 ? 1 : 0
      this.isReachBottomLoadding = false
    },
    async toGetGoods() {
      let params = { pageNum: this.pageNum, categoryId: this.categoryId }
      let data = await this.getGoodsList(params)
      return data
    }
  },
  components: { alaSearchTag, alaGoodsInfoList, alaLoaddingBottom }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-classify-result {
  .fill-page(@color-bg);
  .ala-goods-info-list {
    margin-top: @search-height;
  }
}
</style>
