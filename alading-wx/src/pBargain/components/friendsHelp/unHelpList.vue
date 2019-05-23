/**
* Created by huangyilu on 2018/11/29.
* 好友帮砍列表
*/
<template>
  <div class="friend-help-list">
    <!-- 未完成助力好友 -->
    <div class="fhl-title" v-if="helpingListData.length > 0">
      <div class="tit">未完成助力好友{{ helpingList.length }}人</div>
      <div class="btn" v-if="!isRemind && isMySelf" @click="bindRemindFriendFn">提醒好友</div>
      <div class="un-btn" v-if="isRemind && isMySelf">每位好友只可提醒一次</div>
    </div>
    <div v-for="(item, i) in helpingListData" :key="i">
      <un-help-item :helpItem="item"/>
    </div>

    <!-- 无效助力好友 -->
    <div class="fhl-title" v-if="failList.length > 0">
      <div class="tit">无效助力好友{{ failList.length }}人</div>
    </div>
    <div v-for="(item, i) in failListData" :key="i">
      <un-help-item :helpItem="item" :type="'invalid'"/>
    </div>

    <!-- 暂无 -->
    <div v-if="helpingList.length <= 0 && failList.length <= 0" class="fhl-none">暂时还没有未完成帮砍的好友～</div>

    <!-- 查看更多 -->
    <div
      class="fhl-check-more"
      v-if="(helpingList.length >= 2 || failList.length >= 2) && !isMore && isShowMoreBtn"
      @click="bindMoreBtnFn"
    >
      <div>查看更多</div>
      <div :class="['arrow-bottom']"></div>
    </div>
  </div>
</template>

<script>
import unHelpItem from './unHelpItem'
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      isMore: false
    }
  },
  props: {
    isMySelf: {
      type: Boolean,
      default: false
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
    },
    isShowMoreBtn: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    helpingListData () {
      if (!this.isMore && this.isShowMoreBtn) {
        return _.take(this.helpingList, 2)
      } else {
        return _.take(this.helpingList, this.helpingList.length)
      }
    },
    failListData () {
      if (!this.isMore && this.isShowMoreBtn) {
        return _.take(this.failList, 1)
      } else {
        return _.take(this.failList, this.failList.length)
      }
    },
    isRemind () {
      let remind = true
      this.helpingList.forEach(item => {
        if (item.remindStatus === 0) {
          remind = false
        }
      })
      return remind
    }
  },
  created () { },
  mounted () {
    console.log(' unhelplist == ', this.helpingList)
    console.log(' freeOrderId == ', this.freeOrderId)
  },
  watch: {},
  methods: {
    ...mapActions('bargain', ['sendRemindFriends']),
    async bindRemindFriendFn () {
      // 提醒好友
      this.sendRemindFriends({
        freeOrderId: this.freeOrderId
      })
    },
    bindMoreBtnFn () {
      this.$emit('bindMoreBtnFn')
      this.isMore = true
    }
  },
  components: { unHelpItem }
}
</script>

<style lang="less">
@import '../../style/index.less';
.friend-help-list {
  .fhl-title {
    display: flex;
    align-items: center;
    padding: 15px 0 7.5px;
    .tit {
      font-size: 28 / @px;
      .flex-n();
    }
    .btn {
      text-align: center;
      font-size: 26 / @px;
      width: 148 / @px;
      height: 52 / @px;
      line-height: 52 / @px;
      background: rgba(255, 213, 0, 1);
      border-radius: 26 / @px;
    }
    .un-btn {
      width: 300 / @px;
      height: 52 / @px;
      line-height: 52 / @px;
      font-size: 26 / @px;
      text-align: center;
      color: @color-txt-999;
      background: rgba(204, 204, 204, 1);
      border-radius: 26 / @px;
    }
  }
}
</style>
