/**
* Created by xiejun on 2019/03/21.
* 商品的图片详情
*/
<template>
  <div class="info-detail-goods">
    <title-liner title="商品详情"></title-liner>
    <img v-for="url in goodsImgList" :src="url" mode="widthFix" :key="url">
  </div>
</template>

<script>
import titleLiner from './titleLiner'
export default {
  name: '',
  components: { titleLiner },
  data() {
    return {}
  },
  props: {
    goodsImgList: {
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
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.info-detail-goods {
}
</style>