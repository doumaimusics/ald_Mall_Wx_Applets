/**
* Created by xiejun on 2018/10/22.
* 频道列表
*/
<template>
  <div v-if="channelList.length" class="ala-channel">
    <list-hor
    @indexChange="onIndexChange"
    :list="listData"
    :select="currentChannelIndex"/>
    <div class="ala-channel__icon-spread" @click="onSpreadClick">
      <span v-if="!isDotHide" class="icon-spread__dot"></span>
    </div>
  </div>
</template>

<script>
import listHor from 'components/list/listHor'

import { mapState, mapGetters, mapActions } from 'vuex'
import storage from 'utils/storage'
import maidian from 'utils/maidian'
export default {
  name: '',
  data() {
    return {
      isDotHide: false
    }
  },
  props: {},
  computed: {
    ...mapState(['currentChannelIndex']),
    ...mapGetters(['channelList']),
    listData() {
      return this.channelList.map(value => value.tabName)
    }
  },
  created() {
    this.isDotHide = storage.props.dotHide
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(['setCurrentChannelIndex']),
    onIndexChange(index) {
      let tabId = this.channelList[index].tabId
      maidian.index2(tabId, maidian.spm.pindao_id)
      this.setCurrentChannelIndex(index)
    },
    // click-展开
    onSpreadClick() {
      if (!this.isDotHide) {
        this.isDotHide = true
        storage.props.dotHide = true
      }
      this.$emit('spread')
    }
  },
  components: { listHor }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-channel {
  .flex-hor-center();
  width: 100%;
  height: @channel-height;
  background: white;

  .ala-list-hor {
    width: 345px;
    height: @channel-height;
    .list-node {
      height: @channel-height;
      color: @color-txt;
      padding-bottom: 0;
    }
    .sub-line {
      bottom: 2px;
    }
  }

  .ala-channel__icon-spread {
    position: relative;
    .icon('icon_spread', 30px, 32px);

    .icon-spread__dot {
      position: absolute;
      left: 18.5px;
      top: 7px;
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #f55252;
    }
  }
}
</style>