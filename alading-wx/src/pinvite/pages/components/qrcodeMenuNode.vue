/**
* Created by xiejun on 2019/03/15.
* menu node
*/
<template>
  <div class="menu-node" @tap="onTap" :class="{ 'select':isSelect }">
    <span>{{ title }}</span>
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
    index: {
      type: Number,
      default: 0
    },
    select: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isSelect() {
      return this.index === this.select
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      this.$emit('tap', this.index)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.menu-node {
  margin: 0 5px;
  padding: 5px 10px;
  background: @color-bg;
  &.select {
    background: @color-btn;
  }
}
</style>