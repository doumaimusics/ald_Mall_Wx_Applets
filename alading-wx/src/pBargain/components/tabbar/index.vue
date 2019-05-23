/**
* Created by huangyilu on 2018/11/15.
* tabbar
*/
<template>
  <div class="ala-tabbar" :class="{ 'iphonex-bottom' : isIphoneX }">
    <div class="at-tab__item" v-for="(tab, i) in tabList" :key="i" @click="bindTabClick(i)">
      <img v-if="tab.selected" :src="tab.selectIcon" alt>
      <img v-if="!tab.selected" :src="tab.selectedIcon" alt>
      <div>{{ tab.name }}</div>
    </div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'
import systemInfo from 'utils/systemInfo'

export default {
  name: '',
  data () {
    return {}
  },
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isIphoneX () {
      return systemInfo.isIphoneX
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {
    bindTabClick (index) {
      if (this.tabList[index].isNeedLogin) {
        navigate.push({ url: '/pages/common/login' })
        return
      }
      this.tabList.forEach(item => {
        item.selected = false
      })
      this.tabList[index].selected = true
      this.$emit('sendTabIndexFn', index + 1)
    }
  },
  components: {}
}
</script>

<style lang="less">
@import "../../style/index.less";
.ala-tabbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 96 / @px;
  background-color: #ffffff;
  font-size: @font-size-txt;
  .flex-hor-center();
  .at-tab__item {
    .flex-hor-center();
    .flex-n();
    img {
      width: 44 / @px;
      height: 44 / @px;
      margin-right: 10 / @px;
    }
  }
}
</style>
