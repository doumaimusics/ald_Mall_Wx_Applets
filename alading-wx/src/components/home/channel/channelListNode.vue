/**
* Created by xiejun on 2018/10/22.
* 频道节点
*/
<template>
  <div class="ala-channel-list-node" @click="onClick">
    <span v-if="isSelect" class="ala-channel-list-node__value-select">{{channel.tabName}}</span>
    <span v-else class="ala-channel-list-node__value">{{channel.tabName}}</span>
    <div class="ala-channel-list-node__subline" v-if="isSelect"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-channel-list-node {
  position: relative;
  display: inline-block;
  font-size: 0;
  height: @channel-height;
  line-height: @channel-height;
  .ala-channel-list-node__value {
    .padding-h(13.5px);
    font-size: 15px;
    color: @color-txt;
  }
  .ala-channel-list-node__value-select {
    .padding-h(9.5px);
    font-family: PingFangSC-Medium;
    font-size: @font-size-label;
    color: @color-txt;
  }
  .ala-channel-list-node__subline {
    position: absolute;
    bottom: 2px;
    // bottom: -5px;
    left: 50%;
    width: 20px;
    height: 3px;
    background: @color-main;
    border-radius: 1.5px;

    transform: translateX(-50%);
  }
}
</style>