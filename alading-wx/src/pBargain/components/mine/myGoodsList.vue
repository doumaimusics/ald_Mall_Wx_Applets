/**
* Created by huangyilu on 2018/11/21.
* 我的砍价 商品列表
*/
<template>
  <div class="my-bargain-goods-list">
    <div class="mbgl-view" v-for="(item, i) in goodsList" :key="i">
      <my-goods-item :goodsData="item"/>
      <my-goods-status-item
        :goodsInfo="item"
        :status="item.helpStatus"
        :endTime="item.endTime"
        :index="i"
      />
    </div>
  </div>
</template>

<script>
import myGoodsItem from './myGoodsItem'
import myGoodsStatusItem from './myGoodsStatusItem'

export default {
  name: '',
  data () {
    return {}
  },
  props: {
    goodsList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: { myGoodsItem, myGoodsStatusItem }
}
</script>

<style lang="less">
@import "../../style/index.less";
.mbgl-view {
  margin-bottom: 10px;
}
</style>
