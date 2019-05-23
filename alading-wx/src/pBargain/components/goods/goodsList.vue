/**
* Created by huangyilu on 2018/11/21.
* 商品列表
*/
<template>
  <div class="bargain-goods-list">
    <div class="bgl-view" v-for="(item, i) in goodsList" :key="i">
      <goods-item :goodsData="item" :goodsIndex="i" :isCanBargain="isCanBargain"/>
    </div>
  </div>
</template>

<script>
import goodsItem from './goodsItem'
export default {
  name: '',
  data () {
    return {}
  },
  props: {
    isCanBargain: {
      type: Boolean,
      default: true
    },
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
  components: { goodsItem }
}
</script>

<style lang="less">
@import "../../style/index.less";
</style>
