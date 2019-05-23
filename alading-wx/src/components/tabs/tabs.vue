/**
* Created by huangyilu on 2018/10/18.
* tabs 标签页 导航
*/
<template>
  <div class="ala-tabs-view">
    <div
      :class="['ala-tab__title', { 'ala-tab__two-title': tabTitles.length === 2, 'ala-tab__three-title': tabTitles.length === 3 }]"
    >
      <block v-for="(item,index) in tabTitles" :key="index">
        <div @click="handletab(index)">{{ item }}</div>
      </block>
    </div>
    <div
      :class="['ala-tab__line', { 'ala-tab__two-line': tabTitles.length === 2, 'ala-tab__three-line': tabTitles.length === 3 }, 'to' + tabIndex]"
    ></div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      // tabIndex: 1,
      centerurl: ''
    }
  },
  props: {
    tabTitles: {
      type: Array,
      defaults: []
    },
    tabIndex: {
      type: Number,
      defaults: 1
    }
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {
    handletab (index) {
      this.tabIndex = index + 1
      this.$emit('sendTabIndex', { tabIndex: this.tabIndex })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import "~@/styles/base/fn.less";
.ala-tabs-view {
  width: 100%;
  height: 0.8rem;
  background: #fff;
  box-sizing: border-box;
  padding: 0 0.5rem;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #dddddd;
  overflow: hidden;
  z-index: 99999;
  .ala-tab__title {
    display: flex;
    align-items: center;
    height: 100%;
    & > div {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.28rem;
      color: #2e2e2e;
      text-align: center;
    }
  }
  .ala-tab__two-title {
    & > div {
      flex: 1;
    }
  }
  .ala-tab__three-title {
    & > div {
      width: 1.6rem;
      margin-right: 0.9rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .ala-tab__line {
    position: absolute;
    width: 1.5rem;
    height: 0.1rem;
    background: #ffe110;
    border-radius: 0.1rem;
    bottom: -0.05rem;
    transition: left linear 0.2s;
  }
  .ala-tab__two-line {
    &.to1 {
      left: 140px;
    }
    &.to2 {
      left: 460px;
    }
  }
  .ala-tab__three-line {
    &.to1 {
      left: 50px;
    }
    &.to2 {
      left: 172.5px;
    }
    &.to3 {
      left: 295px;
    }
  }
}
</style>
