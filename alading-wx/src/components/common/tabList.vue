/**
* Created by xiejun on 2019/03/21.
* tab list
*/
<template>
  <div class="tab-list">
    <div
    class="tab-node"
    v-for="(tab, index) in tabs"
    @tap="onTap(index)"
    :class="{'select': index === select}"
    :key="index">
      {{ tab }}
    </div>
    <div class="tab-line" :style="{ 'left': tabLineLeft + 'px' }"></div>
  </div>
</template>

<script>
import wx from 'wx'
export default {
  name: '',
  components: {},
  data() {
    return {
      tabLineOffset: 0,
      nodeWidth: 0
    }
  },
  props: {
    tabs: {
      type: Array,
      default: function() {
        return []
      }
    },
    select: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tabLineLeft() {
      return this.tabLineOffset + this.select * this.nodeWidth
    }
  },
  created() {},
  mounted() {
    this.calcData()
  },
  watch: {
    tabs() {
      this.calcData()
    }
  },
  methods: {
    onTap(index) {
      if (this.select === index) return
      this.$emit('indexChange', index)
    },
    calcData() {
      let query = wx.createSelectorQuery()
      query
        .select('.tab-list')
        .boundingClientRect()
        .select('.tab-line')
        .boundingClientRect()
        .exec(res => {
          if (res) {
            if (res[0] && res[1]) {
              this.nodeWidth = Math.floor(res[0].width / this.tabs.length)
              let tabLineWidth = res[1].width
              this.tabLineOffset = (this.nodeWidth - tabLineWidth) / 2
            }
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

@tab-height: 40px;
.tab-list {
  position: relative;
  height: @tab-height;
  background: white;
  .flex-hor-center();
  .tab-node {
    height: @tab-height;
    line-height: @tab-height;
    font-size: 15px;
    text-align: center;
    color: @color-txt-2;
    .flex-n();
    &.select {
      color: @color-txt;
    }
  }
  .tab-line {
    @line-height: 2px;
    position: absolute;
    top: @tab-height - @line-height;
    left: 0;
    width: 45px;
    height: @line-height;
    background: @color-btn;

    transition: all 0.2s ease 0s;
  }
}
</style>