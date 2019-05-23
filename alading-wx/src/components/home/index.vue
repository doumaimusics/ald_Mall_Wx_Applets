/**
* 首页
*/
<template>
  <div class="ala-home">
    <div 
    :class="{ 'ala-home__head-shrink':isShrink }"
    class="ala-home__head">
      <ala-search-tag @navigateClick="onNavigateClick"/>
      <ala-channel @spread="onSpreadClick"></ala-channel>
    </div>
    <!-- 展开的频道 -->
    <ala-channel-spread v-if="isChannelSpread" @close="onSpreadClose"/>
    <div v-else
    class="node-container"
    :class="[{ 'node-container__all': channelList.length}, { 'iphonex-bottom': isIphoneX }]">
      <ala-recommend-node v-if="currentChannelIndex === 0"></ala-recommend-node>
      <ala-common-node v-if="currentChannelIndex > 0" :channel="currentChannelIndex"></ala-common-node>
    </div>
  </div>
</template>

<script>
// import api from 'utils/api'
import alaSearchTag from '../search/searchTag'
import alaChannel from './channel/index'
import alaChannelSpread from './channel/channelSpread'
import alaRecommendNode from './node/recommendNode'
import alaCommonNode from './node/commonNode'
import alaLoaddingTop from 'components/loadding/loaddingTop'

import { mapState, mapGetters, mapActions } from 'vuex'
import systemInfo from 'utils/systemInfo'
import maidian from 'utils/maidian'

export default {
  data() {
    return {
      // 频道是否展开了
      isChannelSpread: false,
      // 返回是否收缩, true为收缩
      isShrink: false
    }
  },
  computed: {
    ...mapState(['currentChannelIndex']),
    ...mapGetters(['hasHomePageInfo', 'channelList']),
    isIphoneX() {
      return systemInfo.isIphoneX
    }
  },
  created() {
    // 取得home的数据
    this.getHomePageInfo()
  },
  mounted() {},
  onLoad() {},
  onShow() {},
  onPullDownRefresh() {
    // 刷新首页
    if (this.currentChannelIndex === 0) {
      // 推荐首页
      this.getHomePageInfo(true)
    }
  },
  onPageScroll(object) {
    let scrollTop = object.scrollTop
    this.isShrink = scrollTop > 40
  },
  methods: {
    ...mapActions(['getHomePageInfo']),
    onNavigateClick() {
      maidian.index(maidian.spm.home_search)
    },
    onSpreadClick() {
      this.isChannelSpread = true
    },
    onSpreadClose() {
      this.isChannelSpread = false
    }
  },
  components: {
    alaSearchTag,
    alaChannel,
    alaChannelSpread,
    alaRecommendNode,
    alaCommonNode,
    alaLoaddingTop
  }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-home {
  .fill-page(@color-bg);
  .flex-ver-center();

  .ala-home__head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    // margin-top: @search-height;

    transition: all 0.4s ease 0s;

    .ala-search-tag {
      position: relative;
    }
  }

  .ala-home__head-shrink {
    margin-top: -@search-height;
  }

  .node-container {
    position: relative;
    .flex-n();
    width: 100%;
    margin-top: @search-height;
    margin-bottom: @tabbar-height;
  }

  .node-container__all {
    margin-top: @search-height + @channel-height;
  }
}
</style>
