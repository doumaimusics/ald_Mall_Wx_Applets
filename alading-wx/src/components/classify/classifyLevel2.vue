/**
* Created by xiejun on 2018/10/16.
* 二级三级分类
*/
<template>
  <div class="ala-classify-level2">
    <h3 class="acl__title">{{classifyData.name}}</h3>
    <div class="acl__list">
      <ala-classify2-node 
      v-for="(nodeData, index) in nodeList" 
      :nodeData="nodeData"
      :key="index"/>
    </div>
    <div class="acl__line"></div>
  </div>
</template>

<script>
import alaClassify2Node from './classify2Node'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    classifyData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    nodeList() {
      let list = this.classifyData.thirdLevelList
      return list
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { alaClassify2Node }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

.ala-classify-level2 {
  padding-top: 14px;
  padding-left: @padding-h;
  padding-bottom: 6px;

  &:last-child {
    .acl__line {
      display: none;
    }
  }

  .acl__title {
    font-family: PingFangSC-Medium;
    font-size: @font-size-list;
    color: @color-txt;
  }
  .acl__list {
    margin-top: 20px;
    padding-left: 15px;
    padding-right: 30px;
    .flex-hor-center();
    flex-wrap: wrap;
  }
  .acl__line {
    position: relative;
    margin-left: 25px;
    margin-right: 39px;
    .border-1px-top();
  }
}
</style>