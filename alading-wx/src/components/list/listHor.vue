/**
* Created by xiejun on 2018/11/22.
* 水平滑动列表
*/
<template>
  <scroll-view 
  class="ala-list-hor"
  @scroll="onScroll"
  :scroll-left="scrollLeft"
  scroll-x
  scroll-with-animation="true">
    <div
    class="list-node"
    v-for="(title, index) in list"
    @tap="onNodeTap(index)"
    :class="{'is-select': index === select}"
    :index="index"
    :key="index">
      <span>{{title}}</span>
      <div v-if="index === select" class="sub-line"></div>
    </div>
  </scroll-view>
</template>

<script>
import wx from 'wx'
import basis from 'utils/basis'
export default {
  name: '',
  data() {
    return {
      scrollLeft: 0
    }
  },
  props: {
    // 列表项数据
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 选中项
    select: {
      type: Number,
      default: 0
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.updatePosition()
  },
  watch: {
    select() {
      this.updatePosition()
    }
  },
  methods: {
    onNodeTap(index) {
      this.$emit('indexChange', index)
    },
    // 更新
    onScroll(event) {
      basis.delay(100, this.onScrollDelay, event)
    },
    onScrollDelay(event) {
      this.scrollLeft = event.target.scrollLeft
    },
    updatePosition() {
      basis.delay(120, this.toUpdatePosition)
    },
    // 更新位置
    toUpdatePosition() {
      let query = wx.createSelectorQuery()
      query
        .select('.ala-list-hor')
        .boundingClientRect()
        .selectAll('.list-node')
        .boundingClientRect()
        .exec(res => {
          let listRect = res[0]
          if (!listRect) return
          let nodeRect = res[1][this.select]

          // 计算出对应的scrollLeft
          let halfWidth = listRect.width / 2
          let offset = nodeRect.left + nodeRect.width / 2 + this.scrollLeft - halfWidth
          if (offset > 0) {
            this.scrollLeft = Math.floor(offset)
          } else {
            this.scrollLeft = 0
          }
        })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.ala-list-hor {
  .flex-hor-center();

  white-space: nowrap;
  width: 100%;
  font-size: 0;
  background: white;

  .list-node {
    position: relative;
    display: inline-block;
    font-size: 15px;
    color: @color-txt-2;
    .padding-h(14px);
    padding-top: 7px;
    padding-bottom: 10px;
    box-sizing: border-box;
    &.is-select {
      font-family: PingFangSC-Medium;
      font-size: @font-size-label;
      color: @color-txt;
      .padding-h(15px);
    }

    &:first-child {
      padding-left: @padding-h;
    }
    &:last-child {
      padding-right: @padding-h;
    }
  }

  .sub-line {
    position: absolute;
    bottom: 4px;
    left: 50%;

    width: 20px;
    height: 3px;
    background: @color-main;
    border-radius: 1.5px;

    transform: translateX(-50%);
  }
}
</style>