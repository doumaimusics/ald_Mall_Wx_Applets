/**
* Created by xiejun on 2019/01/06.
* 按钮列表项
*/
<template>
  <div class="ala-button-list-item" @click="onClick" :class="className">
    {{ btnData.name }}
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    btnData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    className() {
      let clsName = 'c2'
      let type = this.btnData.type
      if (type === 1) {
        let actionType = this.btnData.actionType
        let list = [1, 3]
        if (list.indexOf(actionType) >= 0) clsName = 'c1'
      } else {
        if (this.btnData.name === '邀请好友') clsName = 'c1'
      }
      return clsName
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClick() {
      this.$emit('tap', this.btnData)
    }
  },
  components: {}
}
</script>

<style lang="less" scope>
@import '~@/styles/base/fn.less';
.ala-button-list-item {
  width: 84px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 3px;
  margin-left: 10px;
  box-sizing: border-box;

  &.c1 {
    background: @color-btn;
  }
  &.c2 {
    line-height: 26px;
    color: @color-txt-1;
    border: 1px solid @color-btn-1;
  }
}
</style>