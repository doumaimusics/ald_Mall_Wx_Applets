/**
* Created by xiejun on 2019/01/04.
* 我的拼团订单列表订单项用户列表
*/
<template>
  <div v-if="userListSize" class="collage-my-order-node-user-list">
    <div class="list-node" :class="'s' + userListSize" v-for="(userInfo, index) in showUserInfoList" :key="index">
      <div v-if="userInfo" class="user">
        <img v-if="userInfo.headimgUrl" :src="userInfo.headimgUrl" mode="aspectFill"/>
        <div v-else class="user-defalut-icon"></div>
      </div>
      <div v-else class="user-empty"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    userInfoList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    showUserInfoList() {
      let list = this.userInfoList.slice(0, 6)
      return list
    },
    userListSize() {
      return this.showUserInfoList.length
    }
  },
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
.collage-my-order-node-user-list {
  .flex-n();
  .flex-hor-center();
  .list-node {
    &.s1 {
      margin-right: 4px;
      z-index: 6;
    }
    &.s2 {
      margin-right: 2px;
      z-index: 5;
    }
    &.s3 {
      margin-right: 0px;
      z-index: 4;
    }
    &.s4 {
      margin-right: -2px;
      z-index: 3;
    }
    &.s5 {
      margin-right: -8px;
      z-index: 2;
    }
    &.s6 {
      margin-right: -10px;
      z-index: 1;
    }

    .user-image() {
      border-radius: 50%;
      // box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    }

    .user {
      width: @size;
      height: @size;
      .user-defalut-icon {
        .icon('icon_avatar_default_light', @size, @size);
        .user-image();
      }
      & > img {
        .user-image();
      }
    }
    .user-empty {
      .icon('icon_avatar_empty', @size, @size);
      .user-image();
    }
  }
}
</style>