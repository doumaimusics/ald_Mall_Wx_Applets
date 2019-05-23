/**
* Created by xiejun on 2019/03/22.
* page mask
*/
<template>
  <div class="page-mask" @tap="onTap"></div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      this.$emit('tap')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.page-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: black;
  opacity: 0.3;
  z-index: 15;
}
</style>