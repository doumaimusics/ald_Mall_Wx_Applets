/**
* Created by xiejun on 2018/10/16.
* goods info node 商品信息节点
*/
<template>
  <div class="ala-goods-info-node" @click="onClick">
    <!-- 商品图片 -->
    <div class="goods-info__icon">
      <img :src="goodsInfoData.goodsIcon" mode="aspectFill">
    </div>
    <div class="goods-info__detail">
      <!-- 商品名称 -->
      <h3 class="goods-info__name">{{goodsInfoData.goodsName}}</h3>
      <!-- 商品标签 -->
      <div class="goods-info__tag-list">
        <span
        class="tag-list-node"
        v-for="(tag, index) in tagList"
        :key="index">{{ tag }}</span>
      </div>
      <!-- 商品价格 -->
      <div class="goods-info__price">
        <span class="price-icon">¥</span>
        <span class="price-sale">{{goodsPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import { mapMutations } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    // 商品信息数据
    goodsInfoData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    // 商品价格
    goodsPrice() {
      let activity = this.goodsInfoData.activityAmount
      let sale = this.goodsInfoData.saleAmount
      if (activity) sale = Math.min(activity, sale)
      return sale
    },
    // 标签组
    tagList() {
      return this.goodsInfoData.tagList
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['setGoodsIdsData']),
    onClick() {
      this.$emit('goodsClick')
      this.setGoodsIdsData(this.goodsInfoData.goodsId)
      basis.toGoodsDetail()
    }
  },
  components: {}
}
</script>

<style lang="less">
</style>
