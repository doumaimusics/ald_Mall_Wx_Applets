/**
* Created by xiejun on 2019/02/28.
* list page 列表单页
*/
<template>
  <div class="list-page">
    <list-month 
    v-for="(monthData, index) in listMonthData" 
    :monthData="monthData"
    :key="index"/>
  </div>
</template>

<script>
import listMonth from './listMonth'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    listMonthData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  onLoad() {},
  onShow() {},
  watch: {},
  methods: {},
  components: { listMonth }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.list-page {
  margin-top: 15px;
}
</style>