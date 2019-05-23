/**
* Created by xiejun on 2019/02/28.
* 进度信息项
*/
<template>
  <div class="detail-progress-info">
    <div class="info-box">
      <div :class="iconClsName"></div>
      <div class="title" :class="statusClsName">{{ progressData.title }}</div>
      <div class="date">{{ showDate }}</div>
    </div>
    <detail-progress-line v-if="progressData.hasLine" :percent="progressData.percent"/>
  </div>
</template>

<script>
import detailProgressLine from './detailProgressLine'

import util from 'utils/index'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    progressData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    parseStatus() {
      let s = 1
      if (this.progressData.percent === 0) {
        s = 0
      }
      if (this.progressData.status === 3) {
        s = 2
      }
      return s
    },
    statusClsName() {
      return 's' + this.parseStatus
    },
    iconClsName() {
      return 'icon-' + this.parseStatus
    },
    showDate() {
      return util.formatDate(this.progressData.gmtCreate, 'MM/DD HH:mm:ss')
    }
  },
  created() {},
  mounted() {},
  onLoad() {},
  onShow() {},
  watch: {},
  methods: {},
  components: { detailProgressLine }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@icon-size: 16px;
.detail-progress-info {
  .info-box {
    padding-left: 138px;
    padding-right: 16px;
    .flex-hor-center();
    .icon-0 {
      .icon('icon_wait', @icon-size, @icon-size);
    }
    .icon-1 {
      .icon('icon_complete', @icon-size, @icon-size);
    }
    .icon-2 {
      .icon('icon_repayProcess06', @icon-size, @icon-size);
    }
    .title {
      margin-left: 9px;
      .flex-n();
      font-size: 14px;
      color: @color-status;

      &.s0 {
        color: @color-txt-3;
      }
      &.s2 {
        color: @color-warn;
      }
    }
    .date {
      font-size: 12px;
      color: @color-txt-2;
    }
  }
}
</style>