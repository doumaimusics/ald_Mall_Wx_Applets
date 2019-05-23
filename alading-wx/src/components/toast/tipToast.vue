/**
* Created by xiejun on 2018/12/19.
* 支付提示
*/
<template>
  <div class="ala-pay-tip-toast">
    <div class="ala-pay-tip-toast__content">{{content}}</div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    content: {
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
.ala-pay-tip-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;

  max-width: 60%;
  padding: 20px;
  box-sizing: border-box;

  background: white;
  border-radius: 4px;

  .ala-pay-tip-toast__content {
    color: @color-txt;
    font-size: @font-size-list;
  }
}
</style>