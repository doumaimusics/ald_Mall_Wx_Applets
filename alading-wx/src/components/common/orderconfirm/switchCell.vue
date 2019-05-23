/**
* Created by xiejun on 2019/03/25.
* switch cell
*/
<template>
  <div class="switch-cell">
    <span class="title">{{ title }}</span>
    <div class="info">
      <span>{{ info }}</span>
      <span @tap="onTipTap" class="btn-tip"></span>
    </div>
    <switch v-if="isEnable" @change="onChange" :checked="isCheck"></switch>
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
    isCheck: {
      type: Boolean,
      default: false
    },
    isEnable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onChange(event) {
      let target = event.target
      if (target) {
        let checked = target.value
        this.$emit('change', checked)
      }
    },
    onTipTap() {
      this.$emit('tipTap')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.switch-cell {
  position: relative;
  .border-1px-bottom();
  .flex-hor-center();
  padding-left: @padding-h;
  padding-right: 10px;
  height: 47px;
  color: @color-txt;
  font-size: 14px;
  .title {
    margin-right: 17px;
  }
  .info {
    margin-right: 10px;
    .flex-n();
    .flex-hor-center();
    .btn-tip {
      margin-left: 10px;
      .icon('icon_ques', 14px, 14px);
    }
  }
  /deep/.wx-switch-input {
    width: 42px;
    height: 25px;
  }
  /deep/.wx-switch-input::before {
    width: 40px;
    height: 23px;
  }
  /deep/.wx-switch-input::after {
    width: 22.5px;
    height: 22.5px;
  }
}
</style>