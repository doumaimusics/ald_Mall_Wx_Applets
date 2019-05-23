/**
* Created by xiejun on 2018/10/31.
* 列表为空
*/
<template>
  <div class="ala-list-empty">
    <div class="ala-list-empty__image"></div>
    <span class="ala-list-empty__title">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@image-width: 140px;
@image-height: 110px;
.ala-list-empty {
  .flex-ver-center();
  .ala-list-empty__image {
    .icon('image_empty', @image-width, @image-height);
  }
  .ala-list-empty__title {
    margin-top: 1.5px;
    font-size: @font-size-list;
    color: @color-txt-2;
  }
}
</style>