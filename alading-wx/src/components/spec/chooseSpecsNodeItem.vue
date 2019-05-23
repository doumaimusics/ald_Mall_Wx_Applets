/**
* Created by xiejun on 2018/11/30.
* 规格选择项
*/
<template>
  <div
  v-if="property"
  class="choose-specs-node-item"
  @tap="onTap"
  :class="{'select':isSelect, 'disable':isDisable}">
    <span>{{property.propertyValueName}}</span>
  </div>
</template>

<script>
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
    disabale: {
      type: Boolean,
      default: false
    },
    property: {
      type: Object,
      default: null
    }
  },
  computed: {
    isSelect() {
      return this.chooseId === this.property.propertyValueId
    },
    isDisable() {
      return !this.enableIds[this.property.propertyValueId]
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      if (this.isDisable) return
      let valueId = this.property.propertyValueId
      if (this.chooseId === valueId) {
        valueId = -1
      }
      this.$emit('tap', { valueId })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.choose-specs-node-item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  min-width: 55px;
  height: 28px;
  line-height: 28px;
  .padding-h(14px);
  border-radius: 4px;
  box-sizing: border-box;

  font-size: @font-size-txt;
  color: @color-txt;
  text-align: center;

  background: @color-bg;
  .linear(0.1s);

  &.select {
    background: @color-btn;
  }
  &.disable {
    background: #dfdfdf;
    color: white;
  }
}
</style>