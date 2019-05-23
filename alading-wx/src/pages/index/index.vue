/**
* Created by xiejun on 2018/10/12.
* 首页
*/
<template>
  <div class="ala-index">
    <ala-home v-if="currentTabbarIndex === 0"></ala-home>
    <ala-coin v-else-if="currentTabbarIndex === 1"></ala-coin>
    <ala-classify v-else-if="currentTabbarIndex === 2"></ala-classify>
    <ala-mine v-else-if="currentTabbarIndex === 3"></ala-mine>
    <ala-tabbar></ala-tabbar>
    <ala-guide v-if="guideShow"></ala-guide>
  </div>
</template>

<script>
import alaHome from 'components/home/index'
import alaCoin from 'components/coin/index'
import alaClassify from 'components/classify/index'
import alaMine from 'components/mine/index'
import alaTabbar from 'components/tabbar/index'
import alaGuide from 'components/guide/index'
import alaGuideMine from 'components/guide/mine'

import { mapState, mapActions, mapMutations } from 'vuex'
import tabbarConfig from '@/store/tabbarConfig'
import storage from 'utils/storage'
import wx from 'wx'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      isNeedUpdate: false
    }
  },
  props: {},
  computed: {
    ...mapState(['currentTabbarIndex', 'guideShow'])
  },
  created() {
    this.getTabbarInfo()
    this.getGuideShow()
  },
  mounted() {
    this.updateNavTitle()
  },
  onLoad(options) {
    if (options.index) {
      this.setCurrentTabbarIndex(+options.index)
    }
  },
  onShow() {
    if (storage.props.launchStatus === 1) return
    this.updateUserGoodsNumber()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {
    currentTabbarIndex() {
      this.updateNavTitle()
    }
  },
  methods: {
    ...mapMutations(['setCurrentTabbarIndex']),
    ...mapActions(['getTabbarInfo', 'getGuideShow']),
    ...mapActions('shoppingCart', ['getUserGoodsNumber']),
    updateNavTitle() {
      let title = ''
      if (this.currentTabbarIndex > 0) {
        let titles = tabbarConfig.tabbarNames
        title = titles[this.currentTabbarIndex]
      }
      if (!title) title = '爱上街'
      wx.setNavigationBarTitle({ title })
    },
    updateUserGoodsNumber() {
      if (!this.isNeedUpdate) return
      this.isNeedUpdate = false
      this.getUserGoodsNumber()
    }
  },
  components: { alaHome, alaCoin, alaClassify, alaMine, alaTabbar, alaGuide, alaGuideMine }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-index {
  .fill-page();
}
</style>
