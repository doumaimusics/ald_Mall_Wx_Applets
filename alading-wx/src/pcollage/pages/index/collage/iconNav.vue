/**
* Created by xiejun on 2019/01/25.
* icon nav
*/
<template>
  <div v-if="visible" class="icon-nav">
    <div class="node" v-for="(nav, index) in navList" @tap="onTap(index)" :key="index">
      <img class="icon" :src="nav.imageUrl" mode="aspectFill">
      <span class="title">{{nav.titleName}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import webview from 'utils/webview'
// import maidian from 'utils/maidian'
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters('collage', ['iconList']),
    visible() {
      return this.navList.length
    },
    navList() {
      return this.iconList.slice(0, 4)
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap(index) {
      let url = this.navList[index].content
      webview.openOpeNav(url)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.icon-nav {
  padding-bottom: 10px;

  width: 100%;
  .flex-hor-center();
  .padding-h(@padding-h);
  box-sizing: border-box;

  .node {
    @nav-icon-size: 44px;
    .flex-ver-center();
    .flex-n();
    width: @nav-icon-size;
    min-height: 64px;
    .icon {
      width: @nav-icon-size;
      height: @nav-icon-size;
      border-radius: 50%;
    }
    .title {
      font-size: @font-size-tip;
      color: @color-txt-1;
      margin-top: 4px;
      .show-one-line();
    }
  }
}
</style>