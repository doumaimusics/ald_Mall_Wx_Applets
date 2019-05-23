/**
* Created by xiejun on 2019/03/25.
* shop goods list
*/
<template>
  <div class="shop-goods-list">
    <goods-simple-info
    v-for="(goodsData, index) in showGoodsList"
    :goodsData="goodsData"
    :key="index"/>
    <div v-if="isNeedCollapse" @tap="onCollapseTap" class="collapse-tip">
      <span>{{ tip }}</span>
      <span :class="['icon', { 'collapse':isCollapse }]" ></span>
    </div>
  </div>
</template>

<script>
import goodsSimpleInfo from '../goodsSimpleInfo'

const COLLAPSE_SIZE = 3
export default {
  name: '',
  components: { goodsSimpleInfo },
  data() {
    return {
      // 标记是否展开
      isCollapse: true
    }
  },
  props: {
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
    onCollapseTap() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.shop-goods-list {
  /deep/.goods-simple-info {
    margin-bottom: 5px;
  }
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