/**
* Created by xiejun on 2019/03/24.
* 规格数量选择
*/
<template>
  <div class="choose-specs-count">
    <span class="title">购买数量</span>
    <span class="limit"></span>
    <span class="btn-sub" :class="{ 'disable':!isSubEnable || disable }" @tap="onSubTap">-</span>
    <span class="num" :class="{ 'disable':disable }">{{ count }}</span>
    <span class="btn-add" :class="{ 'disable':!isAddEnable || disable }" @tap="onAddTap">+</span>
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
    count: {
      type: Number,
      default: 1
    },
    disable: {
      type: Boolean,
      default: false
    },
    isAddEnable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isSubEnable() {
      return this.count > 1
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onSubTap() {
      if (this.disable) return
      this.sendChange(-1)
    },
    onAddTap() {
      if (this.disable) return
      this.sendChange(1)
    },
    sendChange(value) {
      this.$emit('change', this.count + value)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.choose-specs-count {
  margin-top: 30px;
  margin-bottom: 26px;
  .flex-hor-center();
  .padding-h(@padding-h);
  color: @color-txt;
  .title {
    font-size: 13px;
  }
  .limit {
    .flex-n();
  }
  .btn() {
    font-size: @font-size-btn-1;
    width: 34px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    border: 1px solid @color-border;
    box-sizing: border-box;

    &.disable {
      color: @color-txt-2;
    }
  }
  @btn-radius: 1px;
  .btn-sub {
    .btn();
    .radius-left(@btn-radius);
  }
  .btn-add {
    .btn();
    margin-left: -1px;
    .radius-right(@btn-radius);
  }
  .num {
    margin-left: -1px;
    width: 38px;
    height: 30px;
    line-height: 28px;
    border: 1px solid @color-border;
    box-sizing: border-box;

    text-align: center;
    font-size: @font-size-btn;

    &.disable {
      color: @color-txt-2;
    }
  }
}
</style>