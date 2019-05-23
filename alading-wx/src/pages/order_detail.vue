/**
* Created by xiejun on 2018/11/10.
* 兼容第一期小程序的消息推送跳转
*/
<template>
  <div></div>
</template>

<script>
import navigate from 'utils/navigate'
import Monitor from 'utils/monitor'
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  onLoad() {
    navigate.reLaunch({ url: '/pages/common/orderDetail' })
  },
  onShow() {
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
</style>
