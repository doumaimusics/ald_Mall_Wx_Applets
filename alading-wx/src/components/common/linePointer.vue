/**
* Created by xiejun on 2019/03/21.
* 点线
*/
<template>
  <div class="line-pointer">
    <div v-if="left" class="line"></div>
    <div class="point"></div>
    <div v-if="!left" class="line"></div>
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
    left: {
      type: Boolean,
      default: true
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
@point-size: 5px;
@line-point-color: @color-border-1;
.line-pointer {
  .flex-hor-center();
  .line {
    width: 38px;
    height: 1px;
    background: @line-point-color;
  }
  .point {
    width: @point-size;
    height: @point-size;
    border-radius: 50%;
    background: @line-point-color;
  }
}
</style>