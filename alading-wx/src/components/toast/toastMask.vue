/**
* Created by xiejun on 2018/12/05.
* 弹窗遮罩
*/
<template>
  <div v-if="visible" class="ala-mask" @tap="onTap"></div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      this.$emit('tap')
    }
  },
  components: {}
}
</script>

<style lang="less">
.ala-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: black;
  opacity: 0.6;
  z-index: 15;
}
</style>