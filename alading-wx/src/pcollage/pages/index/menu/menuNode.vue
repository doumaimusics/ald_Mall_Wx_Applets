/**
* Created by xiejun on 2018/11/30.
* 首页菜单节点
*/
<template>
  <div class="collage-index-menu-node" @tap="onTap">
    <span :class="iconClassName"></span>
    <span class="title" :class="{ 'active':isActive }">{{title}}</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    type: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('collage', ['index']),
    isActive() {
      return this.type === this.index
    },
    iconClassName() {
      let clsName = 'icon t' + this.type
      if (this.isActive) clsName += ' active'
      return clsName
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations('collage', ['setIndex']),
    onTap() {
      if (this.isActive) return
      this.setIndex(this.type)
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-index-menu-node {
  .flex-n();
  .flex-hor-center();
  justify-content: center;
  height: 100%;
  .menu-icon(@name) {
    .icon(@name, 22px, 22px);
    &.active {
      .icon('@{name}_active', 22px, 22px);
    }
  }
  .icon {
    &.t1 {
      .menu-icon('icon_collage_01');
    }
    &.t2 {
      .menu-icon('icon_collage_02');
    }
  }
  .title {
    margin-left: 10px;
    color: @color-txt-2;
    font-size: @font-size-btn-1;
    &.active {
      color: @color-txt;
    }
  }
}
</style>