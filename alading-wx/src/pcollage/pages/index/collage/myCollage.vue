/**
* Created by xiejun on 2019/01/22.
* 我的拼团主页
*/
<template>
  <div v-if="channelList.length" class="my-collage-index">
    <float-head></float-head>
    <div class="channel" :class=" { 'fixed': isChannelFixed } ">
      <list-hor @indexChange="onIndexChange" :list="channelList" :select="channelIndex"/>
    </div>
    <!-- <div class="list-goods" :class="{ 'iphonex':isIphoneX, 'fixed': isChannelFixed }"> -->
    <!-- </div> -->
    <swiper
    class="list-goods" 
    @change="onChange"
    :class="{ 'iphonex':isIphoneX, 'fixed': isChannelFixed }"
    :style="{ 'height': listGoodsHeight }"
    :current="listGoodsCurrent"
    interval="5000"
    duration="400">
      <swiper-item v-for="(data, index) in categoryList" :key="index">
        <list-goods @goodsTap="onGoodsTap" :goodsList="data['ordinary']"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import floatHead from './floatHead'
import listHor from 'components/list/listHor'
import listGoods from 'pcollagecomp/goods/listGoods'

import { mapState, mapGetters, mapMutations } from 'vuex'
import navigate from 'utils/navigate'
import maidian from 'utils/maidian'
import mixinsBase from 'mixins/mixinsBase'
import basis from 'utils/basis'
import wxBasis from 'utils/wxBasis'
import wx from 'wx'
export default {
  mixins: [mixinsBase],
  name: '',
  data() {
    return {
      isChannelFixed: false,
      listGoodsCurrent: 0,
      listGoodsHeights: []
    }
  },
  props: {},
  computed: {
    ...mapState('collage', ['index', 'channelIndex']),
    ...mapGetters('collage', ['channelList', 'channelData', 'categoryList']),
    listGoodsHeight() {
      if (this.listGoodsHeights.length) {
        return this.listGoodsHeights[this.channelIndex]
      }
      return 0
    }
  },
  created() {
    this.listGoodsCurrent = this.channelIndex
  },
  mounted() {
    this.updateListGoodsHeight()
  },
  onPageScroll(source) {
    this.scrollTop = source.scrollTop
    this.getFloatHeadHeight()
  },
  watch: {},
  methods: {
    ...mapMutations('collage', ['setChannelIndex', 'pushGoodsId']),
    onIndexChange(index) {
      this.listGoodsCurrent = index
      basis.delay(20, this.updateHeadHeight)
    },
    updateHeadHeight() {
      this.floatHeadHeight = -1
      this.setChannelIndex(this.listGoodsCurrent)
      this.getFloatHeadHeight()
    },
    onChange(event) {
      let detail = wxBasis.getDetail(event)
      let index = detail.current
      if (detail.source === 'touch') {
        this.listGoodsCurrent = index
        basis.delay(20, this.updateHeadHeight)
      }
    },
    onGoodsTap(data) {
      maidian.click('pintuan_home_click', data.name, data.goodsId)
      this.pushGoodsId(data.goodsId)
      navigate.push({ url: '/pcollage/pages/detail/goods/detailGoods' })
    },
    // 取得float head的高度
    getFloatHeadHeight() {
      let query = wx.createSelectorQuery()
      query
        .select('.float-head')
        .boundingClientRect()
        .select('.my-collage-index')
        .boundingClientRect()
        .exec(res => {
          if (res) {
            this.floatHeadHeight = res[0].height
            this.updateChannelState()
          }
        })
    },
    updateListGoodsHeight() {
      basis.delay(120, this.getListGoodsHeight)
    },
    // 取得list goods的高度
    getListGoodsHeight() {
      let query = wx.createSelectorQuery()
      query
        .selectAll('.collage-list-goods')
        .boundingClientRect()
        .exec(res => {
          if (res) {
            this.listGoodsHeights = res[0].map(value => value.height + 'px')
          }
        })
    },
    updateChannelState() {
      if (this.scrollTop) {
        this.isChannelFixed = this.scrollTop > this.floatHeadHeight
      } else {
        this.isChannelFixed = false
      }
    }
  },
  components: {
    floatHead,
    listHor,
    listGoods
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@import '../conf.less';

.my-collage-index {
  .channel {
    width: 100%;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
    }
    /deep/.ala-list-hor {
      height: @channel-height;
      .list-node {
        height: @channel-height;
      }
    }
  }
  .list-goods {
    .flex-n();
    &.fixed {
      padding-top: @channel-height;
    }
    .adapt-iphonex(@menu-height + @list-bottom);
  }
}
</style>