/**
* Created by xiejun on 2018/10/12.
* 搜索热点
*/
<template>
  <div v-if="isShow" class="ala-search-hot-node">
    <div class="hot-node-title">
      <span class="title">{{title}}</span>
      <span v-if="hasClear" class="btn-clear" @click="onClearClick">清空</span>
    </div>
    <div class="list-hot-node">
      <ala-hot-node v-for="(node, index) in nodeList" :node="node" :key="index"></ala-hot-node>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import alaHotNode from './hotNode'
import Tips from 'utils/tip'
export default {
  name: '',
  data() {
    return {
      isShow: true
    }
  },
  props: {
    title: {
      type: String,
      default: '热门搜索'
    },
    hasClear: {
      type: Boolean,
      default: false
    },
    nodeList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(['deletHistorySearch']),
    async onClearClick() {
      // 清空
      let accept = await Tips.confirm('确认清空历史记录？')
      if (accept) {
        let success = await this.deletHistorySearch()
        if (success) {
          Tips.success('已清空')
        } else {
          Tips.toast('清空失败')
        }
      }
    }
  },
  components: { alaHotNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

.ala-search-hot-node {
  padding: 21px @padding-h 9px;
  padding-right: 0;
  .hot-node-title {
    .flex-hor-center();
    .title {
      .flex-n();
      font-size: @font-size-list;
      color: @color-txt-1;
    }
    .btn-clear {
      font-size: @font-size-txt;
      color: @color-txt-2;
      margin-right: @padding-h;
    }
  }
  .list-hot-node {
    font-size: 0;
  }
}
</style>