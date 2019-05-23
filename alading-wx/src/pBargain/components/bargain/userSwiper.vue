/**
* Created by huangyilu on 2018/11/15.
* tabbar
*/
<template>
  <div class="ala-user-swiper">
    <!-- 用户购买信息 轮播 -->
    <swiper
      class="aus-swiper"
      circular="true"
      autoplay="true"
      vertical="true"
      :interval="2000"
      :indicator-dots="false"
    >
      <swiper-item v-for="(item,i) in userList" :key="i">
        <div class="aus-swiper__item">
          <img :src="item.avatar" alt>
          <div>{{ item.userName }}</div>
          <div class="txt">{{ item.text }}</div>
        </div>
      </swiper-item>
    </swiper>
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
  props: {},
  computed: {},
  created () { },
  mounted () {
    // console.log(' mock == ', this.userList)
  },
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.ala-user-swiper {
  height: 33px;
  position: absolute;
  top: 10px;
  width: 100%;
  .aus-swiper {
    width: 100%;
    height: 33px;
    color: #ffffff;
    font-size: 12px;
    margin-left: 10px;
    .aus-swiper__item {
      width: 243px;
      height: 33px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 6px;
      display: flex;
      overflow: hidden;
      img {
        width: 33px;
        height: 33px;
      }
      div {
        .flex-ver-center();
        .flex-n();
        &.txt {
          align-items: left;
        }
      }
    }
  }
}
</style>
