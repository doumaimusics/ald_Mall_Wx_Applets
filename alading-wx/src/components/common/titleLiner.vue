/**
* Created by xiejun on 2019/03/21.
* 一个带线的title
*/
<template>
  <div class="title-liner">
    <line-pointer></line-pointer>
    <div class="title">{{ title }}</div>
    <line-pointer :left="false"></line-pointer>
  </div>
</template>

<script>
import linePointer from './linePointer'
export default {
  name: '',
  components: { linePointer },
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
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.title-liner {
  .flex-hor-center();
  justify-content: center;
  height: 40px;
  font-size: 13px;
  background: white;
  .title {
    .padding-h(@padding-h);
  }
}
</style>