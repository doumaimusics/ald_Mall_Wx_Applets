/**
* Created by xiejun on 2019/02/28.
* 列表为空
*/
<template>
  <div class="list-empty">
    <div class="icon"></div>
    <div class="tip">亲，暂时没有你的还款信息哦</div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@icon-size: 250px;
.list-empty {
  margin-top: 84px;
  width: 100%;
  .icon {
    margin: auto;
    .icon('image_empty_2', @icon-size, @icon-size);
  }
  .tip {
    margin-top: 15px;

    font-size: 15px;
    color: @color-txt-1;
    text-align: center;
  }
}
</style>