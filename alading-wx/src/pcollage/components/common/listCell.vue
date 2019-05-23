/**
* Created by xiejun on 2018/11/22.
* 列表项
*/
<template>
  <div :class="['collage-list-cell', { 'border':hasBorder }]" @tap="onTap">
    <span v-if="title0" class="title0">{{title0}}</span>
    <span class="title1">{{title1}}</span>
    <span v-if="title2" class="title2">{{title2}}</span>
    <span v-if="iconVisible" class="icon"></span>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    title0: {
      type: String,
      default: ''
    },
    title1: {
      type: String,
      default: ''
    },
    title2: {
      type: String,
      default: ''
    },
    iconVisible: {
      type: Boolean,
      default: true
    },
    hasBorder: {
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
@import '~@/styles/base/fn.less';

.collage-list-cell {
  position: relative;

  .flex-hor-center();
  .padding-h(@padding-h);
  height: 40px;
  background: white;

  font-size: @font-size-txt;
  color: @color-txt-2;

  &.border {
    .border-1px-top();
  }

  .title0 {
    margin-right: 15px;
  }
  .title1 {
    .flex-n();
    color: @color-txt;
    .show-one-line();
  }
  .title2 {
    .show-line();
  }
  .icon {
    .icon-arrow();
  }
}
</style>