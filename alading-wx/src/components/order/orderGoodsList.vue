/**
* Created by xiejun on 2018/11/3.
* 订单商品列表
*/
<template>
  <div class="ala-order-goods-list">
    <ala-order-goods-item 
    v-for="goodsData in showGoodsList"
    @clickGoods="onClickGoods"
    :goodsInfoData="goodsData"
    :key="goodsData.goodsId"/>
    <div v-if="isNeedCollapse" @tap="onCollapseTap" class="collapse-tip">
      <span>{{ tip }}</span>
      <span :class="['icon', { 'collapse':isCollapse }]" ></span>
    </div>
  </div>
</template>

<script>
import alaOrderGoodsItem from './orderGoodsItem'

const COLLAPSE_SIZE = 3
export default {
  name: '',
  data() {
    return {
      // 标记是否展开
      isCollapse: true
    }
  },
  props: {
    // 商品列表
    goodsList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    goodsSize() {
      return this.goodsList.length
    },
    isNeedCollapse() {
      return this.goodsSize > COLLAPSE_SIZE
    },
    showGoodsList() {
      let list = []
      if (this.isCollapse && this.isNeedCollapse) {
        // 收起来了且需要收起
        list = this.goodsList.slice(0, COLLAPSE_SIZE)
      } else {
        list = this.goodsList
      }
      return list
    },
    tip() {
      let info = '点击收起'
      if (this.isNeedCollapse && this.isCollapse) {
        info = `共计${this.goodsSize}件商品，点击展开更多`
      }
      return info
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClick() {
      this.$emit('click')
    },
    onClickGoods(data) {
      this.$emit('clickGoods', data)
    },
    onCollapseTap() {
      this.isCollapse = !this.isCollapse
    }
  },
  components: { alaOrderGoodsItem }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-order-goods-list {
  width: 100%;
  .collapse-tip {
    margin-top: 10px;
    margin-bottom: 10px;
    .flex-hor-center();
    justify-content: center;
    color: @color-txt-2;
    font-size: 13px;
    .icon {
      margin-left: 10px;
      .icon('icon_collapse', 9px, 10px);
      transform: rotateX(180deg);
      &.collapse {
        transform: rotateX(0);
      }
    }
  }
}
</style>