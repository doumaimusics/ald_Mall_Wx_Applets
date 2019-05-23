/**
* Created by xiejun on 2018/10/22.
* 频道-展开
*/
<template>
  <div class="ala-channel-spread">
    <div class="ala-channel-spread__icon-cancle" @click="onCancleClick"></div>
    <div class="ala-channel-spread__title">
      <span class="title">所有频道</span>
      <span class="title-desc">点击进入频道</span>
    </div>
    <div class="ala-channel-spread__channel-list">
      <!-- 列表 -->
      <ala-channel-spread-node 
      v-for="(channel, index) in channelList"
      @change="onNodeChange"
      :index="index"
      :channel="channel"
      :key="index"/>
    </div>
  </div>
</template>

<script>
import alaChannelSpreadNode from './channelSpreadNode'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters(['channelList'])
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onCancleClick() {
      this.$emit('close')
    },
    onNodeChange() {
      this.$emit('close')
    }
  },
  components: { alaChannelSpreadNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-channel-spread {
  position: fixed;
  top: 2px;
  bottom: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  background: white;
  box-shadow: 0 -0.5px 4.5px 0 rgba(125, 125, 125, 0.22);
  border-radius: 6px 6px 0px 0px;

  padding: @padding-h;
  box-sizing: border-box;

  .ala-channel-spread__icon-cancle {
    .icon('icon_cancle', 22px, 22px);
  }

  .ala-channel-spread__title {
    margin-top: 22.5px;
    .title {
      font-size: 19px;
      color: @color-txt;
    }
    .title-desc {
      margin-left: 9px;
      font-size: @font-size-tip;
      color: @color-txt-2;
    }
  }
  .ala-channel-spread__channel-list {
    margin-top: 20px;

    .ala-channel-spread-node:nth-child(4n + 4) {
      margin-right: 0;
    }
  }
}
</style>