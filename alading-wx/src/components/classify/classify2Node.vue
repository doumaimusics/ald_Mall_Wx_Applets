/**
* Created by xiejun on 2018/10/17.
* 分类节点
*/
<template>
  <div class="ala-classify2-node" @click="onClick">
    <img class="acn__icon" :src="nodeData.imgUrl" mode="aspectFill"/>
    <span class="acn__name">{{nodeData.name}}</span>
  </div>
</template>

<script>
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import maidian from 'utils/maidian'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    nodeData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClick() {
      maidian.classify(maidian.spm.classify_3)

      let params = { categoryId: this.nodeData.id, categoryName: this.nodeData.name }
      navigate.push({ url: '/pages/common/classifyResult?' + basis.urlencoded(params) })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@node-width: 50px;
@icon-size: 50px;
.ala-classify2-node {
  .flex-ver-center();
  width: @node-width;
  margin-right: 42.5px;
  margin-bottom: 25px;

  &:nth-child(3n + 3) {
    margin-right: 0;
  }

  .acn__icon {
    width: @icon-size;
    height: @icon-size;
    // border-radius: 50%;
    border-radius: 4px;
    background: @color-bg;
  }
  .acn__name {
    font-size: @font-size-list;
    color: @color-txt-1;
    margin-top: 10px;
    text-align: center;
    .show-line();
    width: 180%;
  }
}
</style>