/**
* Created by huangyilu on 2018/11/21.
* tabs 标签页 导航
*/
<template>
  <div class="ala-tabs-view">
    <div
      :class="['ala-tab__title', { 'ala-tab__two-title': tabTitles.length === 2, 'ala-tab__three-title': tabTitles.length === 3 }]"
    >
      <div
        v-for="(item,index) in tabTitles"
        :key="index"
        @click="handletab(index)"
        :class="{ 'active': index+1 === tabIndex }"
      >{{ item }}</div>
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
      tabIndex: 1,
      centerurl: ''
    }
  },
  props: {
    tabTitles: {
      type: Array,
      default: () => {
        return []
      }
    },
    tabIndexData: {
      type: Number,
      default: 1
    }
  },
  computed: {},
  created () { },
  mounted () {
    this.tabIndex = this.tabIndexData
  },
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
@import "../../style/index.less";
.ala-tabs-view {
  padding: 0 60 / @px;
  width: 100%;
  height: 80 / @px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 99999;
  .ala-tab__title {
    display: flex;
    align-items: center;
    height: 100%;
    & > div {
      .flex-n();
      font-size: 26 / @px;
      color: @color-txt-999;
      text-align: center;
      &.active {
        font-size: 32 / @px;
        font-weight: 600;
        color: @color-txt;
      }
    }
  }
  .ala-tab__two-title {
    & > div {
      flex: 1;
    }
  }
  .ala-tab__three-title {
    & > div {
      // width: 160 / @px;
      // margin-right: 90 / @px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .ala-tab__line {
    position: absolute;
    width: 20px;
    height: 3px;
    background: @color-main;
    border-radius: 1.5px;
    bottom: -0.05rem;
    transition: left linear 0.2s;
  }
  .ala-tab__two-line {
    &.to1 {
      left: 140 / @px;
    }
    &.to2 {
      left: 460 / @px;
    }
  }
  .ala-tab__three-line {
    &.to1 {
      left: 72.5px;
      width: 25px;
    }
    &.to2 {
      left: 345 / @px;
      width: 50 / @px;
    }
    &.to3 {
      left: 594 / @px;
      width: 50 / @px;
    }
  }
}
</style>
