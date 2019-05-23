/**
* Created by xiejun on 2018/10/22.
* 频道展开节点
*/
<template>
  <div
  class="ala-channel-spread-node"
  :class="{'ala-channel-spread-node-select':isSelect}"
  @click="onClick">
    <span :class=" {'active':isSelect} ">{{channel.tabName}}</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import basis from 'utils/basis'
import maidian from 'utils/maidian'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    channel: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    ...mapState(['currentChannelIndex']),
    // 是否选中
    isSelect() {
      return this.index === this.currentChannelIndex
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(['setCurrentChannelIndex']),
    onClick(event) {
      if (!this.isSelect) {
        maidian.index2(this.channel.tabId, maidian.spm.pindao_id)
        this.setCurrentChannelIndex(this.index)
        basis.delay(100, () => {
          this.$emit('change')
        })
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@node-height: 42.5px;
.ala-channel-spread-node {
  display: inline-block;
  margin-right: @padding-h;
  margin-bottom: @padding-h;
  width: 75px;
  height: @node-height;
  line-height: @node-height;
  font-size: 0;
  border-radius: 3px;
  background: @color-btn-2;
  text-align: center;
  span {
    font-size: 15px;
    color: @color-txt;
  }
  // .active {
  // }
}
.ala-channel-spread-node-select {
  background: @color-main;
}
</style>