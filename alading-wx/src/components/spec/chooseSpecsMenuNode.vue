/**
* Created by xiejun on 2018/11/27.
* 菜单节点
*/
<template>
  <div class="choose-specs-menu-node" :class="['n'+ type, radiusType]">
    <div class="title">{{ title }}</div>
    <!-- 埋 formId -->
    <form class="form-container" @submit="onFormSubmit" report-submit="true" >
      <button formType="submit" class="form-btn"></button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: '1'
    },
    radiusType: {
      type: String,
      default: 'all'
    },
    title: {
      type: String,
      default: '立即购买'
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['formIdListPush']),
    onFormSubmit(event) {
      this.formIdListPush(event.target.formId)
      this.$emit('tap')
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.choose-specs-menu-node {
  position: relative;
  height: 42px;
  line-height: 42px;
  .flex-n();
  border-radius: 20px;
  &.n1 {
    background: #fff0a7;
  }
  &.n2 {
    background: @color-btn;
  }
  &.n3 {
    background: @color-btn-3;
  }
  &.n4 {
    background: @color-btn-4;
  }
  &.left {
    .radius-right(0);
  }
  &.right {
    .radius-left(0);
  }

  .title {
    text-align: center;
    width: 100%;
    font-size: 17px;
  }

  .form-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .form-btn {
      opacity: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>