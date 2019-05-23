/**
* Created by xiejun on 2019/03/21.
* 商品活动信息
*/
<template>
  <div v-if="infoVisible" class="info-activity-goods">
    <span class="tip">促销</span>
    <div class="activity-msg-list">
      <info-activity-goods-node
      v-for="(msgData, index) in activityMsgList"
      :msgData="msgData"
      :key="index"/>
    </div>
  </div>
</template>

<script>
import infoActivityGoodsNode from './infoActivityGoodsNode'
export default {
  name: '',
  components: { infoActivityGoodsNode },
  data() {
    return {}
  },
  props: {
    goodsDetailData: {
      type: Object,
      default: function() {
        return null
      }
    }
  },
  computed: {
    hasGoodsDetailData() {
      return this.goodsDetailData !== null
    },
    activityMsgList() {
      if (!this.hasGoodsDetailData) return []
      let list = this.goodsDetailData.activityMessageList
      if (!list) list = []
      return list
    },
    activityType() {
      if (!this.hasGoodsDetailData) return 0
      return this.goodsDetailData.activityType
    },
    infoVisible() {
      let isVisible = this.activityMsgList.length || this.activityType === 3
      return isVisible
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.info-activity-goods {
  position: relative;
  .border-1px-top();
  .flex-hor-top();
  min-height: 36px;
  padding-right: @padding-h;
  padding-top: 8px;
  box-sizing: border-box;
  .tip {
    margin-right: 18px;
    font-size: 12px;
    color: @color-txt-2;
  }
  .activity-msg-list {
    .flex-n();
  }
  .icon {
    margin-left: 15px;
    .icon-arrow();
  }
}
</style>