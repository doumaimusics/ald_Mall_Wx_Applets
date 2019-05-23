/**
* Created by xiejun on 2019/03/21.
*/
<template>
  <div class="info-safe-goods-node">
    <div class="safe-icon"></div>
    <span>{{ info }}</span>
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
    info: {
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
.info-safe-goods-node {
  .flex-hor-center();
  justify-content: center;

  color: @color-txt-1;
  font-size: 11px;
  .flex-n();
  .safe-icon {
    margin-right: 4px;
    .icon('icon_qgou', 11px, 11px);
  }
}
</style>