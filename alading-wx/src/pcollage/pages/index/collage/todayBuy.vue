/**
* Created by xiejun on 2019/01/25.
* 今日必拼
*/
<template>
  <swiper
  class="today-buy"
  @transitionend="onTransitionEnd"
  duration="400">
    <swiper-item v-for="(list, index) in pageGoodsList" :key="index">
      <today-buy-node @tap="onNodeTap" :goodsList="list" :pageInfo=" (index + 1) + '/' + totalPage"/>
    </swiper-item>
  </swiper>
</template>

<script>
import todayBuyNode from './todayBuyNode'

import { mapMutations } from 'vuex'
import navigate from 'utils/navigate'
export default {
  name: '',
  data() {
    return {
      cols: 3,
      swiperHeight: 0
    }
  },
  props: {
    goodsList: {
      type: Array,
      default: null
    }
  },
  computed: {
    totalPage() {
      let pages = this.goodsList.length / this.cols + ''
      pages = +pages.split('.')[0]
      return pages
    },
    pageGoodsList() {
      let list = []
      for (let i = 0; i < this.totalPage; i++) {
        let start = i * this.cols
        let end = (i + 1) * this.cols
        list.push(this.goodsList.slice(start, end))
      }
      return list
    }
  },
  created() {},
  mounted() {
    this.updateSwiperHeight()
  },
  watch: {
    goodsList() {
      this.updateSwiperHeight()
    }
  },
  methods: {
    ...mapMutations('collage', ['pushGoodsId']),
    onTransitionEnd() {
      this.$emit('transitionEnd')
    },
    updateSwiperHeight() {
      setTimeout(() => {
        let h = 0
        if (this.goodsList.length >= this.cols) h = '260px'
        this.swiperHeight = h
      }, 300)
    },
    onNodeTap(goodsData) {
      this.pushGoodsId(goodsData.goodsId)
      navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
    }
  },
  components: { todayBuyNode }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.today-buy {
  width: 100%;
  height: 254px;

  background: rgba(255, 255, 255, 1);
  .linear(0.1s);
}
</style>