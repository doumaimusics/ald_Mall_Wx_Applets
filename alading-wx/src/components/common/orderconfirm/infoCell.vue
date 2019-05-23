/**
* Created by xiejun on 2019/03/28.
* info cell
*/
<template>
  <div class="info-cell">
    <span class="title">{{ title }}</span>
    <span class="amount">{{ amount }}</span>
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
    title: {
      type: String,
      default: ''
    },
    amount: {
      type: String,
      default: ''
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.info-cell {
  margin-bottom: 10px;
  .flex-hor-center();
  .padding-h(@padding-h);
  color: @color-txt-1;
  .title {
    .flex-n();
    font-size: 14px;
  }
  .amount {
    font-size: 13px;
  }
}
</style>