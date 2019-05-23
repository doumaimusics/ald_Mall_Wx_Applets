/**
* Created by huangyilu on 2018/11/22.
* 砍价商品详情 用户砍价信息 轮播
*/
<template>
  <div class="bargain-user-swiper">
    <div class="bu-before">
      <div class="bu-lb__icon"></div>
      <div>
        {{ saleCount }}人正在砍
        <span>|</span>
      </div>
    </div>
    <div class="bu-swiper">
      <swiper
        circular="true"
        autoplay="true"
        vertical="true"
        :interval="2000"
        :indicator-dots="false"
      >
        <swiper-item v-for="(item,i) in userList" :key="i">
          <div class="bu-user-item">{{ item.userName }}砍至xx元购得</div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import userFakeData from '../../util/userFakeData'

export default {
  name: '',
  data () {
    return {
      userList: userFakeData.mockUserList
    }
  },
  props: {
    saleCount: {
      type: Number,
      default: 0
    }
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
@import "../../style/index.less";
.bargain-user-swiper {
  display: flex;
  line-height: 80 / @px;
  background-color: #fff8da;
  padding: 0 14px;
  color: #975f00;
  font-weight: 500;
  font-size: 26 / @px;
  .bu-before {
    display: flex;
    align-items: center;
    span {
      margin: 0 10 / @px;
    }
    .bu-lb__icon {
      .icon("cj_lb", 36 / @px, 36 / @px);
      margin-right: 15 / @px;
    }
  }
  .bu-swiper {
    flex: 1;
    swiper {
      height: 40px;
    }
    .bu-user-item {
      color: #a25c00;
      font-weight: 400;
    }
  }
}
</style>
