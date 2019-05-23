/**
* Created by xiejun on 2018/11/27.
* 菜单节点
*/
<template>
  <div class="detail-goods-menu-node" :class="'n' + type">
    <div class="container">
      <div class="price">¥{{price}}</div>
      <div class="title">{{title}}</div>
    </div>
    <!-- 埋 formId -->
    <form class="form-container" @submit="onFormSubmit" report-submit="true" >
      <button formType="submit" class="form-btn"></button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: '1'
    },
    price: {
      type: String,
      default: '0.00'
    },
    title: {
      type: String,
      default: '立即购买'
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['formIdListPush']),
    onFormSubmit(event) {
      this.formIdListPush(event.target.formId)
      this.$emit('tap')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.detail-goods-menu-node {
  position: relative;
  .flex-hor-center();
  width: 115px;
  height: 100%;
  text-align: center;
  &.n1 {
    background: #fff0a7;
  }
  &.n2 {
    background: @color-btn;
  }
  &.n3 {
    background: @color-btn-3;
  }
  &.n4 {
    background: @color-btn-4;
  }
  .container {
    position: relative;
    .flex-n();
    .price {
      font-size: 15px;
    }
    .title {
      font-size: @font-size-tip;
    }
  }

  .form-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .form-btn {
      opacity: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>