/**
* Created by xiejun on 2018/10/11.
* 分类
*/
<template>
  <div class="ala-classify">
    <!-- search tag -->
    <ala-search-tag @navigateClick="onNavigateClick"></ala-search-tag>

    <!-- 一级分类 -->
    <ala-classify-level1 
    :classifyList="categoryList"/>
    
    <scroll-view
    :class="['ala-classify__content', {'ala-classify__content-iphonex': isIphoneX }]"
    scroll-with-animation="true"
    scroll-y>
      <!-- 二级三级分类 -->
      <ala-classify-level2 
      v-for="(classifyData, index) in level2List" 
      :classifyData="classifyData" 
      :key="index">
      </ala-classify-level2>
    </scroll-view>
  </div>
</template>

<script>
import alaSearchTag from '../search/searchTag'
import alaClassifyLevel1 from './classifyLevel1'
import alaClassifyLevel2 from './classifyLevel2'

import { mapState, mapActions } from 'vuex'
import systemInfo from 'utils/systemInfo'
import wx from 'wx'
import maidian from 'utils/maidian'
export default {
  name: '',
  data() {
    return {
      // 一级分类
    }
  },
  props: {},
  computed: {
    ...mapState(['currentCategoryIndex', 'categoryList']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    // 对应一级分类的子级分类
    level2List() {
      if (this.categoryList.length) {
        return this.categoryList[this.currentCategoryIndex].secondLevelList
      }
      return []
    }
  },
  created() {},
  mounted() {
    this.getCategoryList()
  },
  onPullDownRefresh() {
    this.refresh()
  },
  watch: {
    currentCategoryIndex() {
      wx.pageScrollTo({ scrollTop: 0, duration: 0 })
    }
  },
  methods: {
    ...mapActions(['getCategoryList']),
    onNavigateClick() {
      maidian.classify(maidian.spm.classify_search)
    },
    async refresh() {
      await this.getCategoryList(true)
      wx.stopPullDownRefresh()
    }
  },
  components: { alaSearchTag, alaClassifyLevel1, alaClassifyLevel2 }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-classify {
  .fill-page(@color-bg);
  .ala-search-tag {
    .border-1px-bottom;
  }
  .ala-classify__content {
    .fill-page();
    // position: absolute;
    // top: @search-height;
    left: @classify-level1-width;
    right: 0;
    width: auto;
    // min-height: 100%;
    // background: white;

    // padding-left: @classify-level1-width;
    padding-top: @search-height;
    padding-bottom: @tabbar-height;
    box-sizing: border-box;
  }
  .ala-classify__content-iphonex {
    padding-bottom: @tabbar-height + @padding-iphonex;
  }
}
</style>