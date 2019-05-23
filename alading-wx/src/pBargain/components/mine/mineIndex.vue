/**
* Created by huangyilu on 2018/11/15.
* 我的砍价
*/
<template>
  <div class="bargain-mine-view">
    <!-- tab -->
    <ala-tabs :tabTitles="tabTitles" @sendTabIndex="getTabIndex"/>

    <!-- 全部 -->
    <my-goods-list v-if="tabIndex===1" :goodsList="allBargainList"/>
    <!-- 砍价中 -->
    <my-goods-list v-if="tabIndex===2" :goodsList="bargainingList"/>
    <!-- 已成功 -->
    <my-goods-list v-if="tabIndex===3" :goodsList="successBargainList"/>

    <!-- 全部 订单为空 -->
    <div class="bmv-empty" v-if="emptyShow">
      <img src="https://img.51fanbei.com/h5/weChat/cj_order_empty.png" alt>
      <div>{{ emptyTxt }}</div>
      <div @click="bindGoHomeFn">前往砍价</div>
    </div>
  </div>
</template>

<script>
import myGoodsList from './myGoodsList'
import alaTabs from '../tabs/index'
import { mapActions, mapState, mapMutations } from 'vuex'
import maidian from 'utils/maidian'

const tabMD = {
  1: 'kanjia_my_all',
  2: 'kanjia_my_ing',
  3: 'kanjia_my_completed'
}

export default {
  name: '',
  data () {
    return {
      tabIndex: 1,
      tabTitles: ['全部', '砍价中', '已成功']
    }
  },
  props: {},
  computed: {
    ...mapState('bargain', ['bargainOrderList']),
    emptyTxt () {
      switch (this.tabIndex) {
        case 1:
          return '您暂时没有砍价订单'
        case 2:
          return '您暂时没有砍价中的订单'
        case 3:
          return '您暂时没有砍价成功的订单'
      }
    },
    emptyShow () {
      switch (this.tabIndex) {
        case 1:
          return this.allBargainList.length <= 0
        case 2:
          return this.bargainingList.length <= 0
        case 3:
          return this.successBargainList.length <= 0
      }
    },
    allBargainList () {
      return this.bargainOrderList ? this.bargainOrderList : []
    },
    bargainingList () {
      return this.bargainOrderList ? this.bargainOrderList.filter(item => {
        return item.helpStatus === 0
      }) : []
    },
    successBargainList () {
      return this.bargainOrderList ? this.bargainOrderList.filter(item => {
        return item.helpStatus === 1
      }) : []
    }
  },
  created () { },
  mounted () {
    this.getUserBargainOrderList()
  },
  watch: {},
  methods: {
    ...mapActions('bargain', ['getUserBargainOrderList']),
    ...mapMutations('bargain', ['setBargainTabIndex']),
    getTabIndex (data) {
      this.tabIndex = data.tabIndex
      maidian.click(tabMD[this.tabIndex])
    },
    bindGoHomeFn () {
      this.setBargainTabIndex(1)
    }
  },
  components: { myGoodsList, alaTabs }
}
</script>

<style lang="less">
@import '../../style/index.less';
.bargain-mine-view {
  background-color: #f8f8f8;
  padding-top: 50px;
  .my-bargain-goods-list {
    padding-bottom: 60px;
  }
  .bmv-empty {
    background-color: #f8f8f8;
    font-size: 15px;
    color: #999999;
    text-align: center;
    padding-top: 40px;
    img {
      width: 90px;
      height: 90px;
      margin: auto;
    }
    :nth-child(2) {
      padding: 20px 0 35px;
    }
    :nth-child(3) {
      width: 325px;
      height: 45px;
      margin: 0 auto;
      line-height: 45px;
      color: #ffffff;
      background: linear-gradient(121deg, rgba(255, 120, 67, 1) 0%, rgba(255, 60, 57, 1) 100%);
      border-radius: 22.5px;
    }
  }
}
</style>
