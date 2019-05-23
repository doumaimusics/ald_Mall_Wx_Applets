/**
* Created by huangyilu on 2018/11/29.
* 好友帮砍列表
*/
<template>
  <div class="friend-help-list">
    <div v-if="helpListData.length > 0" v-for="(item, i) in helpListData" :key="i">
      <help-item :helpItem="item"/>
    </div>

    <!-- 暂无 -->
    <div v-if="successList.length <= 0" class="fhl-none">暂时还没有帮砍成功的好友～</div>

    <!-- 查看更多 -->
    <div class="fhl-check-more" v-if="helpListData.length > 1 && isMore" @click="bindMoreBtnFn">
      <div>查看更多</div>
      <div :class="['arrow-bottom']"></div>
    </div>
  </div>
</template>

<script>
import helpItem from './helpItem'
import _ from 'lodash'

export default {
  data () {
    return {
      isMore: false
    }
  },
  props: {
    successList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    helpListData () {
      if (!this.isMore) {
        return _.take(this.successList, 2)
      } else {
        return _.take(this.successList, this.successList.length)
      }
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {
    bindMoreBtnFn () {
      this.$emit('bindMoreBtnFn')
      this.isMore = true
    }
  },
  components: { helpItem }
}
</script>

<style lang="less">
@import '../../style/index.less';
.friend-help-list {
  .fhl-none {
    padding: 25px 0;
    text-align: center;
    font-size: 26 / @px;
    color: @color-txt-999;
  }
}
</style>
