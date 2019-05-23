/**
* Created by xiejun on 2018/10/16.
* 一级分类
*/
<template>
  <!-- @scroll="onScroll"
  :scroll-top="scrollTop" -->
  <div :class="['ala-classify-level1', {'iphonex-bottom': isIphoneX }]">
    <div 
    class="level1-node" 
    v-for="(classify, index) in categoryList" 
    @click="onClick"
    :data-current="index" 
    :class="{'level1-node__select': index === currentCategoryIndex}"
    :key="index">
      <span class="level1-node__title">{{classify.name}}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import wx from 'wx'
import basis from 'utils/basis'
import systemInfo from 'utils/systemInfo'
import maidian from 'utils/maidian'
export default {
  name: '',
  data() {
    return {
      scrollTop: 0
    }
  },
  props: {},
  computed: {
    ...mapState(['currentCategoryIndex', 'categoryList']),
    isIphoneX() {
      return systemInfo.isIphoneX
    }
  },
  created() {},
  mounted() {},
  watch: {
    current() {
      this.updatePosition()
    }
  },
  methods: {
    ...mapMutations(['setCurrentCategoryIndex']),
    onTouchStart() {
      console.log('on touch start')
    },
    onClick(event) {
      maidian.classify(maidian.spm.classify_1)
      let current = basis.getClickCurrent(event)
      if (current !== this.currentCategoryIndex) {
        this.setCurrentCategoryIndex(current)
      }
    },
    onTouchMove(event) {},
    // 更新
    onScroll(event) {
      basis.delay(100, this.onScrollDelay, event)
    },
    onScrollDelay(event) {
      this.scrollTop = event.target.scrollTop
    },
    updatePosition() {
      basis.delay(120, this.toUpdatePosition)
    },
    toUpdatePosition() {
      let query = wx.createSelectorQuery()
      query
        .select('.ala-classify-level1')
        .boundingClientRect()
        .selectAll('.level1-node')
        .boundingClientRect()
        .exec(res => {
          let listRect = res[0]

          let nodeList = res[1]
          let curNode = nodeList[this.current]

          // 计算出对应的scrollTop
          let halfHeight = listRect.height / 2
          let offset = curNode.top + curNode.height / 2 - halfHeight

          let firstNode = nodeList[0]
          offset -= firstNode.top
          if (offset > 0) {
            this.scrollTop = Math.floor(offset)
          } else {
            this.scrollTop = 0
          }
        })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

@node-txt-height: 26px;
.ala-classify-level1 {
  position: fixed;
  z-index: 9;
  top: @search-height;
  bottom: @tabbar-height;

  overflow-y: auto;
  .scroll();

  width: @classify-level1-width;
  padding-left: 6px;
  border-right: 1px solid @color-border;
  box-sizing: border-box;
  background: white;

  .level1-node {
    width: 68px;
    font-size: 0;
    text-align: center;
    .padding-v(12.5px);

    &:first-child {
      padding-top: 15px;
    }
    &:last-child {
      padding-bottom: 15px;
    }

    .level1-node__title {
      display: inline-block;
      width: 100%;
      height: @node-txt-height;
      line-height: @node-txt-height;
      .show-line();

      font-size: @font-size-list;
      color: @color-txt-2;
    }
  }

  .level1-node__select {
    .level1-node__title {
      background: @color-main;
      border-radius: 50px;
      color: @color-txt;
    }
  }
}
</style>