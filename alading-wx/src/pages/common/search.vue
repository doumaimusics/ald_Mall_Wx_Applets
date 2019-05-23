/**
* Created by xiejun on 2018/10/12.
* 搜索
*/
<template>
  <div class="ala-search">
    <ala-search-tag :isSearch="true"></ala-search-tag>
    <div class="ala-search__content">
      <ala-search-hot-node
      title="热门搜索"
      v-if="hotNodeList.length"
      :nodeList="hotNodeList"/>
      <ala-search-hot-node
      v-if="historyList.length"
      title="历史搜索"
      :nodeList="historyList"
      :hasClear="true"/>
    </div>
  </div>
</template>

<script>
import alaSearchTag from 'components/search/searchTag'
import alaSearchHotNode from 'components/search/searchHotNode'

import { mapState, mapActions } from 'vuex'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['searchData']),
    hotNodeList() {
      let list = this.searchData.searchList
      if (list && list.length) {
        list = list.filter(value => value.isHot === 'Y')
      } else {
        list = []
      }
      return list
    },
    historyList() {
      let list = this.searchData.historyList
      if (!list) {
        list = []
      }
      return list
    }
  },
  created() {},
  onShow() {
    this.isHistoryVisible = true
    this.getSearchData()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(['getSearchData'])
  },
  components: { alaSearchTag, alaSearchHotNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-search {
  .fill-page();
  .ala-search__content {
    margin-top: @search-height;
  }
}
</style>
