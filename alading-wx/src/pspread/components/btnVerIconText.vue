/**
* Created by xiejun on 2019/01/16.
* 按钮 图标文本
*/
<template>
  <div class="spread-btn-ver-icon-text" @tap="onTap">
    <div :class="iconClsName"></div>
    <div class="title">{{ title }}</div>
    <button v-if="isShare" class="wx-share-button" open-type="share"></button>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    isShare: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconClsName() {
      return 'icon-' + this.icon
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      if (this.isShare) return
      this.$emit('tap')
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

@icon-size: 35px;
.spread-btn-ver-icon-text {
  position: relative;
  width: @icon-size;
  .flex-ver-center();
  .node-icon(@name) {
    .icon(@name, @icon-size, @icon-size);
  }
  .icon-wxgroup {
    .node-icon('icon_share_wxgroup');
  }
  .icon-wxfriend {
    .node-icon('icon_share_wxfriend');
  }
  .icon-paste {
    .node-icon('icon_paste');
  }
  .title {
    margin-top: 2.5px;
    font-size: 10px;
    color: @color-txt-2;
    .show-one-line();
  }
  .wx-share-button {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
}
</style>