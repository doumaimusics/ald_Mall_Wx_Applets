/**
* Created by xiejun on 2018/11/28.
* 规格类别节点
*/
<template>
  <div class="collage-specs-choose-node">
    <div class="title">{{nodeData.propertyName}}</div>
    <div class="choose-list">
      <specs-choose-node-item
      v-for="property in nodeData.propertyValues"
      @tap="onNodeTap"
      :enableIds="enableIds"
      :chooseId="chooseId"
      :property="property"
      :key="property.propertyValueId"/>
    </div>
  </div>
</template>

<script>
import specsChooseNodeItem from './specsChooseNodeItem'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    enableIds: {
      type: Object,
      default: function() {
        return {}
      }
    },
    chooseId: {
      type: Number,
      default: -1
    },
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
    onNodeTap(data) {
      this.$emit('tap', { id: this.nodeData.propertyId, ...data })
    }
  },
  components: { specsChooseNodeItem }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-specs-choose-node {
  margin-bottom: 15px;
  color: @color-txt;
  .padding-h(@padding-h);
  .title {
    font-size: @font-size-txt;
    margin-bottom: 12px;
  }
  .choose-list {
    margin-top: 12px;
  }
}
</style>