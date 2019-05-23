/**
* Created by xiejun on 2019/01/28.
* 差一个拼团订单
*/
<template>
  <div class="one-less">
    <div v-if="maskNodeLength" class="mask-box">
      <block v-for="n in maskNodeLength" :key="n">
        <div @tap="onMaskTap(n)" class="mask-node"></div>
      </block>
    </div>
    <swiper
      @change="onChange"
      :indicator-dots="false"
      :style="{ 'height': nodeHeight }"
      class="content"
      circular="true"
      duration="400"
      autoplay="true"
      interval="5000"
      vertical="true"
    >
      <block v-for="(orderSubList, index) in orderListShow" :key="index">
        <swiper-item>
          <one-less-node @timeout="onTimeout" :list="orderSubList"/>
        </swiper-item>
      </block>
    </swiper> 
  </div>
</template>

<script>
import oneLessNode from './oneless/oneLessNode'

import basis from 'utils/basis'
import wxBasis from 'utils/wxBasis'
import wx from 'wx'
export default {
  name: '',
  data() {
    return {
      maskNodeLength: 0,
      nodeCurrent: 0,
      nodeHeights: []
    }
  },
  props: {
    orderList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    orderListShow() {
      if (!this.orderList) return []
      let list = []
      let size = this.orderList.length
      if (size > 2) {
        let sublist = []
        this.orderList.forEach(value => {
          sublist.push(value)
          if (sublist.length === 2) {
            list.push(sublist)
            sublist = []
          }
        })
      } else {
        list.push(this.orderList)
      }
      return list
    },
    nodeHeight() {
      if (this.nodeHeights && this.nodeHeights.length) {
        return this.nodeHeights[this.nodeCurrent]
      }
      return 0
    },
    nodeList() {
      return this.orderListShow[this.nodeCurrent]
    }
  },
  created() {},
  mounted() {
    this.updateNodeHeights()
  },
  watch: {
    orderList() {
      this.nodeCurrent = 0
      this.nodeHeights = []
      this.updateNodeHeights()
    }
  },
  methods: {
    onMaskTap(index) {
      this.$emit('tap', this.nodeList[index - 1])
    },
    onChange(event) {
      let detail = wxBasis.getDetail(event)
      let index = detail.current
      this.nodeCurrent = index
    },
    onTimeout() {
      basis.delay(100, this.emitTimeout)
    },
    emitTimeout() {
      this.$emit('timeout')
    },
    updateNodeHeights() {
      this.maskNodeLength = this.nodeList.length
      basis.delay(120, this.getNodeHeights)
    },
    // 取得list goods的高度
    getNodeHeights() {
      let query = wx.createSelectorQuery()
      query
        .selectAll('.one-less-node')
        .boundingClientRect()
        .exec(res => {
          if (res) {
            this.nodeHeights = res[0].map(value => {
              if (value) return value.height + 'px'
              return 0
            })
          }
        })
    }
  },
  components: { oneLessNode }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.one-less {
  position: relative;
  margin-bottom: 10px;
  .mask-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    .mask-node {
      height: 80px;
    }
  }
  .content {
    .linear(0.4s);
  }
}
</style>