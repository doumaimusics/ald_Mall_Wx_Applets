/**
* Created by huangyilu on 2018/11/22.
* 砍价商品详情 头部轮播
*/
<template>
  <div class="bargain-goods-detail-swiper">
    <swiper
      class="bgd-swiper"
      :style="{ 'height' : windowWidth + 'px' }"
      :autoplay="false"
      :interval="2000"
      :indicator-dots="false"
      @change="bindIndexChange"
    >
      <swiper-item v-for="(item,i) in goodsImgs" :key="i">
        <img :src="item" alt>
      </swiper-item>
      <!-- 左下角标 -->
      <div class="bgd__doc">{{ swiperIndex }}/{{ goodsImgs.length }}</div>
    </swiper>
  </div>
</template>

<script>
import systemInfo from 'utils/systemInfo'

export default {
  name: '',
  data () {
    return {
      windowWidth: systemInfo.windowWidth,
      swiperIndex: 1
    }
  },
  props: {
    goodsImgs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {
    bindIndexChange (index) {
      this.swiperIndex = index + 1
    }
  },
  components: {}
}
</script>

<style lang="less">
@import "../../style/index.less";
.bargain-goods-detail-swiper {
  width: 100%;
  .bgd__doc {
    position: absolute;
    right: 30 / @px;
    bottom: 30 / @px;
    width: 80 / @px;
    height: 40 / @px;
    line-height: 40 / @px;
    border-radius: 20 / @px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #ffffff;
    font-size: 24 / @px;
    text-align: center;
  }
  .bgd-swiper {
    img {
      width: 100%;
    }
  }
}
</style>
