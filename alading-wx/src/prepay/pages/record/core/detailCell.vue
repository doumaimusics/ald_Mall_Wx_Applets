/**
* Created by xiejun on 2019/02/28.
* 详情 cell
*/
<template>
  <div class="detail-cell" :class="cellClsName">
    <div class="info0">{{ info0 }}</div>
    <div class="info1">{{ info1 }}</div>
  </div>
</template>

<script>
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
    info0: {
      type: String,
      default: ''
    },
    info1: {
      type: String,
      default: ''
    }
  },
  computed: {
    cellClsName() {
      return 't' + this.type
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.detail-cell {
  .flex-hor-center();
  .padding-h(16px);

  padding-top: 14px;
  padding-bottom: 4px;

  font-size: 14px;
  color: @color-txt-1;

  .info0 {
    .flex-n();
  }

  &.t0 {
    .info1 {
      color: @color-txt;
    }
  }

  &.t1 {
    padding-top: 35px;
    padding-bottom: 14px;
    .info0 {
      font-size: 15px;
      color: @color-txt;
    }
    .info1 {
      font-size: 16px;
      color: @color-price;
    }
  }

  &.t3 {
    .info1 {
      width: 180px;
      .show-one-line();
      color: @color-txt;
    }
  }
}
</style>