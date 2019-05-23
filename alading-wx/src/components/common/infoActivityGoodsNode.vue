/**
* Created by xiejun on 2019/03/21.
* 商品活动信息节点
*/
<template>
  <div class="info-activity-goods-node">
    <img :src="msgData.icon" alt="">
    <span class="describe">{{ msgData.describe }}</span>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  props: {
    msgData: {
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
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.info-activity-goods-node {
  .flex-hor-center();
  img {
    margin-right: 4px;
    width: 36px;
    height: 16px;
  }
  .describe {
    .show-line()
  }
}
</style>