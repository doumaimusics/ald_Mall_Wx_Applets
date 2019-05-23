/**
* Created by xiejun on 2018/10/16.
* 快捷导航
*/
<template>
  <div v-if="navigationList.length" class="ala-quick-nav">
    <block v-for="(nav, index) in navigationList" :key="index">
      <div class="nav-node" @click="onClick" :data-current="index">
        <img class="nav-node__icon" :src="nav.imageUrl" mode="aspectFill">
        <span class="nav-node__name">{{nav.titleName}}</span>
      </div>
    </block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import basis from 'utils/basis'
import webview from 'utils/webview'
import maidian from 'utils/maidian'

export default {
  name: '',
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters(['navigationList'])
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {
    onClick (event) {
      let current = basis.getClickCurrent(event)
      maidian.index2(current, maidian.spm.icon_n)

      let url = this.navigationList[current].content
      webview.openOpeNav(url)
    }
  },
  components: {}
}
</script>

<style lang="less">
@import "~@/styles/base/fn.less";
@nav-icon-size: 47px;
.ala-quick-nav {
  .flex-hor-center();
  flex-wrap: wrap;
  .padding-h(@padding-h);
  padding-top: 15px;
  background: white;

  .nav-node {
    .flex-ver-center();

    width: @nav-icon-size;
    margin-right: 27.5px;
    margin-bottom: 20px;
    &:nth-child(5n + 5) {
      margin-right: 0;
    }

    .nav-node__icon {
      width: @nav-icon-size;
      height: @nav-icon-size;
      border-radius: 50%;
    }
    .nav-node__name {
      font-size: @font-size-tip;
      color: #404040;
      margin-top: 8.5px;
      .show-one-line();
    }
  }
  .fill-node {
    .flex-n();
  }
}
</style>
