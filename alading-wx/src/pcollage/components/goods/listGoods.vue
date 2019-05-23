/**
* Created by xiejun on 2018/11/23.
* 商品列表
*/
<template>
  <div class="collage-list-goods">
    <list-goods-node 
    @tap="onTap"
    v-for="(goodsData, index) in goodsList" 
    :goodsData="goodsData"
    :key="index"/>
  </div>
</template>

<script>
import listGoodsNode from './listGoodsNode'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    goodsList: {
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
    onTap(data) {
      this.$emit('goodsTap', data)
    }
  },
  components: { listGoodsNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-list-goods {
  .padding-v(@padding-h);
  background: white;
  .collage-list-goods-node {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>