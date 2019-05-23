/**
* Created by xiejun on 2019/01/06.
* 拼团成功滚动播放
*/
<template>
  <swiper
  class="user-scroll-show"
  autoplay="true"
  circular="true"
  vertical="true"
  interval="2000"
  duration="400">
    <swiper-item class="user-scroll-show-item" v-for="(user, index) in userList" :key="index">
      <img v-if="user.headimgUrl" :src="user.headimgUrl" mode="widthFix"> 
      <div v-else class="user-empty"></div>
      <div class="nick-name">{{ user.nickname }}</div>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 用户数据列表
    userList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@size: 30px;
.user-scroll-show {
  margin-left: 10px;
  .flex-n();
  height: 40px;
  .user-scroll-show-item {
    .flex-hor-center();
    img {
      width: @size;
      border-radius: 50%;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    }
    .user-empty {
      .icon('icon_avatar_empty', @size, @size);
      border-radius: 50%;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    }
    .nick-name {
      margin-left: 10px;
      .show-one-line();
    }
  }
}
</style>