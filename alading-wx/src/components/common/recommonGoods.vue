/**
* Created by xiejun on 2019/03/21.
* 推荐商品
*/
<template>
  <div v-if="visible" class="recommon-goods">
    <tab-list @indexChange="onIndexChange" :select="tabSelect" :tabs="['为你推荐', '同类排行']"></tab-list>
    <swiper
    class="goods-list"
    duration="400"
    @change="onGoodsListChange"
    :current="tabSelect">
      <swiper-item v-for="(list, index) in pageGoodsList" :key="index">
        <goods-simple-list :list="list"></goods-simple-list>
      </swiper-item>
    </swiper>  
  </div>
</template>

<script>
import tabList from './tabList'
import goodsSimpleList from 'components/goodsList/goods-simple-list'

import wxBasis from 'utils/wxBasis'
import maidian from 'utils/maidian'
export default {
  name: '',
  components: { tabList, goodsSimpleList },
  data() {
    return {
      tabSelect: 0
    }
  },
  props: {
    goodsDetailData: {
      type: Object,
      default: function() {
        return null
      }
    }
  },
  computed: {
    recommonList() {
      if (!this.goodsDetailData) return []
      let list = this.goodsDetailData.recommonList
      if (!list) list = []
      return list
    },
    similarList() {
      if (!this.goodsDetailData) return []
      let list = this.goodsDetailData.similarList
      if (!list) list = []
      return list
    },
    visible() {
      if (!this.goodsDetailData) return false
      if (!this.recommonList.length) return false
      if (!this.similarList.length) return false
      return true
    },
    pageGoodsList() {
      if (this.goodsDetailData) {
        return [this.recommonList, this.similarList]
      }
      return []
    }
  },
  created() {},
  mounted() {},
  watch: {
    tabSelect() {
      if (this.tabSelect === 0) {
        maidian.shop(maidian.spm.detail_commend)
      } else {
        maidian.shop(maidian.spm.detail_similar)
      }
    }
  },
  methods: {
    onIndexChange(index) {
      this.tabSelect = index
    },
    onGoodsListChange(event) {
      let detail = wxBasis.getDetail(event)
      let index = detail.current
      if (detail.source === 'touch') {
        this.tabSelect = index
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.recommon-goods {
  .goods-list {
    height: 365px;
  }
}
</style>