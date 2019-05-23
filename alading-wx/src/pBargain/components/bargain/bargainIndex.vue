/**
* Created by huangyilu on 2018/11/15.
* tabbar
*/
<template>
  <div class="ala-bargain-view">
    <!-- 头部 img  -->
    <div class="abv-title__bgimg">
      <img :src="titleBgImg" alt>
    </div>

    <!-- 用户购买信息 轮播 -->
    <user-swiper/>

    <!-- 商品swiper -->
    <goods-swiper :goodsList="topThreeGoodsList"/>

    <!-- 商品 list -->
    <goods-list :goodsList="goodsList"/>

    <!-- 选择规格 -->
    <div v-if="specShow">
      <spec-model
        v-if="specShow"
        :specGoodsData="goodsData"
        :specPriceData="priceData"
        :specPropertyData="propertyData"
        @sendSelectGoodsInfo="getSelectGoodsInfo"
      />
    </div>
    <!-- 选择收货地址 -->
    <address-model v-if="addressTCControl!=-1 && goodsList.length"/>
  </div>
</template>

<script>
import userSwiper from './userSwiper'
import goodsSwiper from './goodsSwiper'
import goodsList from '../goods/goodsList'
import conf from '../../util/conf'
import specModel from '../spec/index'
import addressModel from '../address/address'
import { mapActions, mapState, mapMutations } from 'vuex'
import _ from 'lodash'
import wx from 'wx'
import maidian from 'utils/maidian'

export default {
  name: '',
  data () {
    return {
      titleBgImg: conf.indexBgImg
    }
  },
  props: {},
  computed: {
    ...mapState('bargain', ['addressTCControl', 'bargainGoodsList', 'bargainGoodsDetail', 'isSpecShow']),
    specShow () {
      return this.isSpecShow
    },
    goodsData () {
      if (!this.bargainGoodsDetail) {
        return
      }
      return {
        freeOrderGoodsId: this.bargainGoodsDetail.freeOrderGoodsId,
        goodsDetailList: this.bargainGoodsDetail.goodsDetailList,
        goodsId: this.bargainGoodsDetail.goodsId,
        goodsIcon: this.bargainGoodsDetail.goodsIcon,
        goodsPics: this.bargainGoodsDetail.goodsPics,
        goodsName: this.bargainGoodsDetail.goodsName,
        targetNum: this.bargainGoodsDetail.targetNum,
        saleAmount: this.bargainGoodsDetail.saleAmount,
        saleCount: this.bargainGoodsDetail.saleCount,
        // 剩余库存
        stockLessNum: this.bargainGoodsDetail.stockLessNum
      }
    },
    priceData () {
      return this.bargainGoodsDetail ? this.bargainGoodsDetail.priceData : []
    },
    propertyData () {
      return this.bargainGoodsDetail ? this.bargainGoodsDetail.propertyData : []
    },
    topThreeGoodsList () {
      return this.bargainGoodsList ? _.take(this.bargainGoodsList, 3) : []
    },
    goodsList () {
      return this.bargainGoodsList ? _.takeRight(this.bargainGoodsList, this.bargainGoodsList.length - 3) : []
    }
  },
  created () { },
  mounted () {
  },
  onPullDownRefresh () {
    // 下拉刷新
    this.refresh()
  },
  watch: {},
  methods: {
    ...mapMutations('bargain', ['setIsSpecShow']),
    ...mapActions('bargain', ['getBargainIndexGoodsList', 'getUserAddressList']),
    // 获取首页商品列表
    async refresh () {
      await this.getBargainIndexGoodsList()
      wx.stopPullDownRefresh()
    },
    // 接收 选择规格组件值 / 确认按钮
    getSelectGoodsInfo (data) {
      if (data) {
        console.log(' getSelectGoodsInfo ', data)
        this.setIsSpecShow(false)
        this.getUserAddressList()
        maidian.click('kanjia_homepage_guige', data.goodsName, data.freeOrderGoodsId)
      }
    }
  },
  components: { userSwiper, goodsSwiper, goodsList, specModel, addressModel }
}
</script>

<style lang="less">
@import '../../style/index.less';
body {
  overflow-x: hidden;
}
.ala-bargain-view {
  background-color: @color-bg;
  padding-bottom: 48px;
  .abv-title__bgimg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 250px;
    background-color: @color-index-bg;
    img {
      width: 100%;
      height: 180px;
    }
  }
}
</style>
