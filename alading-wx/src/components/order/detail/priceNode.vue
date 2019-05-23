/**
* Created by xiejun on 2018/11/4.
* 价格项
*/
<template>
  <div v-if="isVisible" class="ala-price-node">
    <span :class="'ala-price-node__title-' + type">{{title}}</span>
    <span :class="'ala-price-node__price-' + type">{{showPrice}}</span>
  </div>
</template>

<script>
import basis from 'utils/basis'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: '0'
    },
    // 是否为优惠项显示
    isFav: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: ''
    }
  },
  computed: {
    // 是否显示
    isVisible() {
      if (this.isFav) {
        return this.price
      }
      return true
    },
    showPrice() {
      let result = basis.moneyPrefix(this.price)
      if (this.isFav) result = '-' + result
      return result
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@color-0: #bebebe;
.ala-price-node {
  .flex-hor-center();
  .padding-h(@padding-h);
  .ala-price-node__title-0 {
    .flex-n();
    font-size: @font-size-tip;
    color: @color-0;
  }
  .ala-price-node__price-0 {
    font-size: @font-size-tip;
    color: @color-0;
  }
  .ala-price-node__title-1 {
    .flex-n();
    font-size: 15px;
    color: @color-txt;
  }
  .ala-price-node__price-1 {
    font-size: 15px;
    color: @color-price;
  }
}
</style>