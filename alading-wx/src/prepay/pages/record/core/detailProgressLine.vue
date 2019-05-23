/**
* Created by xiejun on 2019/02/28.
* 进度直线
*/
<template>
  <div class="detail-progress-line">
    <div class="progress" :style="{ 'height': percent }"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    percent: {
      type: String,
      default: '0'
    }
  },
  computed: {},
  created() {},
  mounted() {},
  onLoad() {},
  onShow() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.detail-progress-line {
  margin-top: -2px;
  margin-bottom: -2px;
  margin-left: 145px;
  width: 2px;
  height: 46px;
  background: @color-border-1;
  .progress {
    width: 100%;
    background: @color-status;
  }
}
</style>