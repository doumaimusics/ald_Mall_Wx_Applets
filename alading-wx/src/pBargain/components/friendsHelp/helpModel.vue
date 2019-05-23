/**
* Created by huangyilu on 2018/11/21.
* 好友帮砍列表 弹窗
*/
<template>
  <div class="friend-help-model" @click.stop>
    <ala-tabs :tabTitles="tabTitles" :tabIndexData="tabIndex" @sendTabIndex="getTabIndex"/>

    <!-- 成功 帮砍列表 -->
    <help-list v-if="tabIndex===1" :successList="successList" :isShowMoreBtn="false"/>

    <!-- 未完成 帮砍列表 -->
    <un-help-list
      v-if="tabIndex===2"
      :isMySelf="isMySelf"
      :freeOrderId="freeOrderId"
      :isShowMoreBtn="false"
      :failList="failList"
      :helpingList="helpingList"
    />
  </div>
</template>

<script>
import alaTabs from '../tabs/index'
import helpList from './helpList'
import unHelpList from './unHelpList'

export default {
  name: '',
  data () {
    return {
      tabTitles: ['帮砍成功', '未完成帮砍'],
      tabIndex: 1
    }
  },
  props: {
    isMySelf: {
      type: Boolean,
      default: false
    },
    tabIndexData: {
      type: Number,
      default: 1
    },
    successList: {
      type: Array,
      default: () => {
        return []
      }
    },
    failList: {
      type: Array,
      default: () => {
        return []
      }
    },
    helpingList: {
      type: Array,
      default: () => {
        return []
      }
    },
    freeOrderId: {
      type: Number,
      default: 0
    }
  },
  computed: {},
  created () {
    this.tabIndex = this.tabIndexData
    console.log(' help model tabindex ', this.tabIndex)
  },
  mounted () { },
  watch: {},
  methods: {
    getTabIndex (data) {
      this.tabIndex = data.tabIndex
      console.log(' gettabindex = ', this.tabIndex)
    }
  },
  components: { alaTabs, helpList, unHelpList }
}
</script>

<style lang="less">
@import '../../style/index.less';
.friend-help-model {
  margin: 0;
  position: fixed;
  height: 900 / @px;
  width: 100%;
  bottom: 0;
  overflow-y: scroll;
  background-color: #ffffff;
  .ala-tabs-view {
    position: relative;
    font-size: 28 / @px;
    z-index: 1000;
    padding: 15px 10px;
    .border-bottom(#e2e2e2);
    .ala-tab__line {
      width: 66 / @px;
      height: 6 / @px;
      background: #ff513d;
      border-radius: 3 / @px;
      bottom: 5 / @px;
    }
    .ala-tab__title {
      display: flex;
      width: 300 / @px;
      & > div {
        font-size: 28 / @px;
        &.active {
          font-size: 28 / @px;
          font-weight: 500;
          color: #ff513d;
        }
      }
    }
    .ala-tab__two-line {
      &.to1 {
        left: 60 / @px;
      }
      &.to2 {
        left: 208 / @px;
      }
    }
  }
  .friend-help-list {
    padding: 0 30 / @px;
    .help-price span {
      color: #ff513d;
    }
  }
}
</style>
