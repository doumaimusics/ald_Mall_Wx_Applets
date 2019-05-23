/**
* Created by huangyilu on 2018/11/09.
* 路由跳转
*/
<template>
  <div class="">
  </div>
</template>

<script>
import navigate from 'utils/navigate'
import basis from 'utils/basis'
import storage from 'utils/storage'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  onLaunch() {},
  onLoad() {
    let options = storage.props.launchOptions
    console.log(' goods_detail onshow options ', options)
    let goodsId = 0
    if (options.query.id) {
      goodsId = options.query.id
    }
    if (options.query.goodsId) {
      goodsId = options.query.goodsId
    }
    options.query = { goodsId: goodsId }
    storage.props.launchOptions = options
    this.pushNewPath(options)
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
  mounted() {},
  watch: {},
  methods: {
    pushNewPath(options) {
      let params = basis.urlencoded(options.query)
      let url = '/' + 'pages/common/goodsDetail' + '?' + params
      navigate.reLaunch({ url })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
</style>
