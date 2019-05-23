/**
* Created by huangyilu on 2018/11/15.
* 头部商品 卡片
*/
<template>
  <div class="ala-goods-swiper">
    <!-- 头部商品 左右 轮播 -->
    <swiper
      class="ags-swiper"
      circular="true"
      :autoplay="false"
      :interval="2000"
      :indicator-dots="false"
    >
      <swiper-item v-for="(item,i) in goodsList" :key="i">
        <goods-swiper-item :goodsData="item" :goodsIndex="i"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import goodsSwiperItem from './goodsSwiperItem'

export default {
  name: '',
  data () {
    return {}
  },
  props: {
    goodsList: {
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
  methods: {},
  components: { goodsSwiperItem }
}
</script>

<style lang="less">
@import "../../style/index.less";
.ala-goods-swiper {
  height: 180px;
  width: 100%;
  margin-top: 172.5px;
  overflow: hidden;
  background-color: #ffffff;
  .vux-slider > .vux-swiper,
  .vux-slider {
    overflow: initial;
  }
  .ags-swiper {
    width: 100%;
    height: 175px;
    swiper-item {
      width: 350px !important;
    }
  }
}
</style>
