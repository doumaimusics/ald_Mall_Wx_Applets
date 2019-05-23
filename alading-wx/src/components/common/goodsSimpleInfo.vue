/**
* Created by xiejun on 2019/03/26.
* 
*/
<template>
  <div class="goods-simple-info">
    <div class="icon">
      <img :src="goodsData.goodsIcon" mode="aspectFill">
    </div>
    <div class="info">
      <div class="name">{{ goodsData.goodsName }}</div>
      <div class="specs" :class="{ 'hasTags':tagsVisible }">{{ goodsData.propertyValueNames }}</div>
      <div v-if="tagsVisible" class="tags"></div>
      <div class="else">
        <span class="price"><span>￥</span>{{ goodsData.priceAmount }}</span>
        <span class="num">X{{ goodsData.goodsNum }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  props: {
    goodsData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    tagsVisible() {
      return false
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.goods-simple-info {
  // height: 100px;
  .flex-hor-top();
  background: @color-bg;
  padding: 8px @padding-h;
  box-sizing: border-box;
  .icon {
    margin-right: 12px;
    img {
      width: 70px;
      height: 70px;
    }
  }
  .info {
    color: @color-txt;
    .flex-n();
    .name {
      margin-bottom: 3px;
      font-size: 12px;
      .show-line();
    }
    .specs {
      margin-bottom: 12px;
      font-size: 12px;
      color: @color-txt-2;
      .show-line();

      &.hasTags {
        margin-bottom: 5px;
      }
    }
    .tags {
      margin-bottom: 5px;
      height: 16px;
    }
    .else {
      margin-bottom: 1px;
      .flex-hor-center();
      .price {
        .flex-n();
        font-size: 15px;
        span {
          font-size: 14px;
        }
      }
      .num {
        font-size: 11px;
      }
    }
  }
}
</style>