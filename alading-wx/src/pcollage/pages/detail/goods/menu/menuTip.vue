/**
* Created by xiejun on 2019/01/06.
* 提示
*/
<template>
  <div class="menu-tip">
    {{ title }}
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

<style lang="less" scope>
@import '~@/styles/base/fn.less';

@tip-height: 30px;
.menu-tip {
  position: absolute;
  top: -@tip-height;
  left: 0;

  height: @tip-height;
  line-height: @tip-height;
  width: 100%;
  background: rgba(93, 108, 140, 0.6);

  color: white;
  font-size: @font-size-list;
  text-align: center;
}
</style>