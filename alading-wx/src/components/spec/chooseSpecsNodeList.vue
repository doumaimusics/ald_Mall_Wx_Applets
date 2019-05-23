/**
* Created by xiejun on 2019/03/19.
* 规格选择项列表
*/
<template>
  <div class="choose-specs-node-list">
    <choose-specs-node 
    v-for="nodeData in propertyData"
    @tap="onNodeTap"
    :enableIds="enableIds"
    :chooseId="chooseIds[nodeData.propertyId]"
    :nodeData="nodeData"
    :key="nodeData.propertyId"/>
  </div>
</template>

<script>
import chooseSpecsNode from './chooseSpecsNode'
export default {
  name: '',
  components: { chooseSpecsNode },
  data() {
    return {}
  },
  props: {
    chooseIds: {
      type: Object,
      default: function() {
        return {}
      }
    },
    enableIds: {
      type: Object,
      default: function() {
        return {}
      }
    },
    propertyData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onNodeTap(data) {
      this.$emit('tap', data)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.choose-specs-node-list {
}
</style>