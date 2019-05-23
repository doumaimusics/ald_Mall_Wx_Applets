/**
* Created by huangyilu on 2018/11/15.
* 助力砍价 主页
*/
<template>
  <div class="ala-help-bargain-view" :class="{ 'iphonex-bottom' : isIphoneX }">
    <!-- 砍价 -->
    <ala-bargain v-if="bargainTabIndex === 1"/>
    <!-- 砍价攻略 -->
    <ala-raiders v-if="bargainTabIndex === 2"/>
    <!-- 我的 -->
    <ala-mine v-if="bargainTabIndex === 3"/>
    <!-- tabbar -->
    <ala-tab-bar :tabList="bargainTabList" @sendTabIndexFn="getTabIndexFn"/>
  </div>
</template>

<script>
import conf from '../util/conf'

import alaShare from '../components/share/index'
import alaTabBar from '../components/tabbar/index'
import alaBargain from '../components/bargain/bargainIndex'
import alaRaiders from '../components/raiders/raidersIndex'
import alaMine from '../components/mine/mineIndex'

import { mapActions, mapMutations, mapState } from 'vuex'
import systemInfo from 'utils/systemInfo'

import maidian from 'utils/maidian'
import Monitor from 'utils/monitor'

const tabMD = {
  1: 'kanjia_tab_kanjia',
  2: 'kanjia_tab_strategy',
  3: 'kanjia_tab_my'
}

export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['isLogin']),
    ...mapState('bargain', ['bargainTabIndex', 'bargainTabList']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    tabList() {
      return [
        {
          name: '砍价',
          isNeedLogin: false,
          selected: this.bargainTabIndex ? this.bargainTabIndex === 1 : false,
          selectIcon: conf.indexTabImg.bargain[0],
          selectedIcon: conf.indexTabImg.bargain[1]
        },
        {
          name: '砍价攻略',
          isNeedLogin: false,
          selected: this.bargainTabIndex ? this.bargainTabIndex === 2 : false,
          selectIcon: conf.indexTabImg.raiders[0],
          selectedIcon: conf.indexTabImg.raiders[1]
        },
        {
          name: '我的',
          isNeedLogin: !this.isLogin,
          selected: this.bargainTabIndex ? this.bargainTabIndex === 3 : false,
          selectIcon: conf.indexTabImg.mine[0],
          selectedIcon: conf.indexTabImg.mine[1]
        }
      ]
    }
  },
  created() {},
  mounted() {},
  onShow() {
    this.setBargainTabList(this.tabList)
    switch (this.bargainTabIndex) {
      case 1:
        this.getBargainIndexGoodsList()
        break
      case 3:
        this.getUserBargainOrderList()
        break
    }
    maidian.view('kanjia_homepage')
    Monitor.pageShow()
  },
  onUnload() {
    this.setBargainTabIndex(1)
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onShareAppMessage(res) {
    maidian.click('kanjia_homepage_share')
    return {
      imageUrl: 'https://img.51fanbei.com/h5/weChat/cj_share_img.png',
      path: '/pBargain/pages/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  watch: {},
  methods: {
    ...mapActions('bargain', ['getBargainIndexGoodsList', 'getUserBargainOrderList']),
    ...mapMutations('bargain', ['setBargainTabIndex', 'setBargainTabList']),
    // 接收tabindex
    getTabIndexFn(index) {
      this.setBargainTabIndex(index)
      maidian.click(tabMD[index])
      console.log(' bargainTabIndex == ', this.bargainTabIndex)
    }
  },
  components: {
    alaTabBar,
    alaBargain,
    alaRaiders,
    alaMine,
    alaShare
  }
}
</script>

<style lang="less">
@import '../style/index.less';
.ala-help-bargain-view {
  .bdr-model {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 999991;
    .model-title {
      height: 40px;
      line-height: 40px;
      width: 100%;
      background-color: #ffffff;
      position: absolute;
      bottom: 350px;
      display: flex;
      align-items: center;
      div {
        margin: 0 15px;
      }
      :first-child {
        .flex-n();
      }
      .model-delete-icon {
        .icon-cancel();
      }
    }
    .model-txt {
      bottom: 0;
      overflow-y: scroll;
      height: 350px;
      position: absolute;
      .ala-raiders-view {
        padding-bottom: 0;
      }
    }
  }
}
</style>
