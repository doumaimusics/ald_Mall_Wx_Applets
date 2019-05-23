/**
* Created by xiejun on 2018/12/04.
* 拼团用户列表
*/
<template>
  <div class="collage-user-list" :class="{ 'oneline':onlyOneLine }">
    <div class="list-node" v-for="(userInfo, index) in userInfoList" :key="index">
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
    // 用户信息列表
    userInfoList: {
      type: Array,
      default: []
    }
  },
  computed: {
    onlyOneLine() {
      return this.userInfoList.length < 6
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
@import 'userList.less';
.collage-user-list {
  .flex-hor-center();
  flex-wrap: wrap;
  .padding-h(80px);
  &.oneline {
    justify-content: center;
  }
  // .list-node {
  //   .user-list-node(15px, 15px, 30px);
  // }
}
</style>