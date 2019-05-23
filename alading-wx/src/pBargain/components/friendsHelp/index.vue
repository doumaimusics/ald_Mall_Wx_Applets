/**
* Created by huangyilu on 201/12/05.
* 好友帮砍列表
*/
<template>
  <div class="friend-help-view">
    <ala-tabs :tabTitles="tabTitles" @sendTabIndex="getTabIndex"/>

    <!-- 成功 帮砍列表 -->
    <help-list
      v-if="tabIndex === 1 && !isMoreListShow"
      :successList="successList"
      @bindMoreBtnFn="bindMoreBtnFn"
    />

    <!-- 未完成 帮砍列表 -->
    <un-help-list
      v-if="tabIndex === 2 && !isMoreListShow"
      :isMySelf="isMySelf"
      :freeOrderId="freeOrderId"
      :failList="failList"
      :helpingList="helpingList"
      @bindMoreBtnFn="bindMoreBtnFn"
    />

    <!-- 更多帮砍列表 弹窗 -->
    <div class="bdr-model" v-if="isMoreListShow" @click.stop="isMoreListShow=false">
      <help-list-model
        :isMySelf="isMySelf"
        :freeOrderId="freeOrderId"
        :tabIndexData="tabIndex"
        :successList="successList"
        :failList="failList"
        :helpingList="helpingList"
      />
    </div>
  </div>
</template>

<script>
import alaTabs from '../tabs/index'
import helpList from './helpList'
import unHelpList from './unHelpList'
import helpListModel from './helpModel'
import { mapState } from 'vuex'

export default {
  name: '',
  data () {
    return {
      tabTitles: ['帮砍成功', '未完成帮砍'],
      tabIndex: 1,
      isMoreListShow: false
    }
  },
  props: {
    freeOrderId: {
      type: Number,
      default: 0
    },
    isMySelf: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('bargain', ['friendsHelpList']),
    successList () {
      return this.friendsHelpList ? this.friendsHelpList.slist : []
    },
    failList () {
      return this.friendsHelpList ? this.friendsHelpList.failList : []
    },
    helpingList () {
      return this.friendsHelpList ? this.friendsHelpList.flist : []
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {
    getTabIndex (data) {
      this.tabIndex = data.tabIndex
    },
    bindMoreBtnFn () {
      this.isMoreListShow = true
    }
  },
  components: { alaTabs, helpList, unHelpList, helpListModel }
}
</script>

<style lang="less">
@import '../../style/index.less';
.friend-help-view {
  background-color: #ffffff;
  margin: 20px 15px;
  padding: 0 45 / @px;
  border-radius: 8 / @px;
  overflow: hidden;
  .bdr-model {
    left: 0;
  }
  .fhl-check-more {
    font-size: 26 / @px;
    color: @color-txt-999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
    .arrow-bottom {
      .icon('cj_arrow_douber', 12.5px, 10px, 0deg);
    }
    .arrow-top {
      .icon('cj_arrow_douber', 20px, 20px, 270deg);
    }
  }
  .ala-tabs-view {
    position: relative;
    font-size: 28 / @px;
    z-index: 1000;
    .border-bottom(#e2e2e2);
    .ala-tab__line {
      width: 66 / @px;
      height: 6 / @px;
      background: #ff513d;
      border-radius: 3 / @px;
      bottom: 5 / @px;
    }
    .ala-tab__title {
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
        left: 145 / @px;
      }
      &.to2 {
        left: 388 / @px;
      }
    }
  }
}
</style>
