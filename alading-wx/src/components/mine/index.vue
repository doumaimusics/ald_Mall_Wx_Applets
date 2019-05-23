/**
* 我的
*/
<template>
  <div class="ala-mine">
    <!-- 用户信息 -->
    <ala-user-info></ala-user-info>
    <!-- 全部订单 -->
    <ala-order-menu></ala-order-menu>
    <!-- 账单 -->
    <ala-bill-mine v-if="guideShow"></ala-bill-mine>
    <!-- 收获地址及账号切换 -->
    <ala-menu-mine></ala-menu-mine>
    <!-- 为你推荐 -->
    <div :class="['ala-mine__recommend', {'iphonex-bottom': isIphoneX }]">
      <h3 class="recommend-title">为你推荐</h3>
      <ala-goods-info-list
      @listGoodsClick="onListGoodsClick"
      :goodsInfoListData="goodsInfoFlow"/>
      <!-- 底部加载中 -->
      <ala-loadding-bottom :status="loadingBottomStatus"/>
    </div>
  </div>
</template>

<script>
import alaUserInfo from './userInfo'
import alaOrderMenu from './orderMenu'
import alaMenuMine from './menuMine'
import alaBillMine from './billMine'
import alaGoodsInfoList from 'components/goodsInfo/goodsInfoList'
import alaLoaddingBottom from 'components/loadding/loaddingBottom'

import { mapMutations, mapActions, mapState } from 'vuex'
import cache from 'utils/cache'
import lcUtil from 'utils/lcUtil'
import systemInfo from 'utils/systemInfo'
import wx from 'wx'
import maidian from 'utils/maidian'

export default {
  name: '',
  data() {
    return {
      pageNum: 1,
      pageFlag: 'VDIAN_WECHAT_MINE_YOU_LIKE_GOODS',
      // 商品信息流
      goodsInfoFlow: [],
      // 底部加载
      loadingBottomStatus: 0
    }
  },
  props: {},
  computed: {
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    ...mapState(['guideShow'])
  },
  created() {
    this.getMineInfo()
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
    ...mapMutations(['setLocationCode']),
    ...mapActions(['getMineInfo', 'getBottomMoreGoods']),
    onListGoodsClick() {
      // 添加来源
      this.setLocationCode(lcUtil.mine)

      maidian.my(maidian.spm.my_product)
    },
    async refresh() {
      await this.getMineInfo()
      wx.stopPullDownRefresh()
    },
    // 取得商品信息流
    async getGoods() {
      if (this.pageNum > 0) {
        let data = await cache.list('mineGoods', this.pageNum, this.toGetGoods, cache.TIMEOUT)
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
      this.loadingBottomStatus = this.pageNum < 0 ? 1 : 0
      this.isReachBottomLoadding = false
    },
    async toGetGoods() {
      let params = { pageNum: this.pageNum, pageFlag: this.pageFlag }
      let data = await this.getBottomMoreGoods(params)
      return data
    }
  },
  components: { alaUserInfo, alaOrderMenu, alaMenuMine, alaGoodsInfoList, alaLoaddingBottom, alaBillMine }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-mine {
  .fill-page(@color-bg);

  .ala-mine__recommend {
    margin-top: 25px;
    margin-bottom: @tabbar-height;
    .recommend-title {
      margin-bottom: 7.5px;

      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: @color-txt-1;
      text-align: center;
    }
  }
}
</style>
