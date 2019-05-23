/**
* Created by huangyilu on 20190121.
* 切换服务器
*/
<template>
<div class="change-server-view">
  <div class="csv-current">当前服务器：{{ currentServer }}</div>

  <div class="csv-item" @click="changeFn('atestapp')">
    <div>atestapp.51fanbei.com</div>
    <div>切换</div>
  </div>
  <div class="csv-item" @click="changeFn('btestapp')">
    <div>btestapp.51fanbei.com</div>
    <div>切换</div>
  </div>
  <div class="csv-item" @click="changeFn('ctestapp')">
    <div>ctestapp.51fanbei.com</div>
    <div>切换</div>
  </div>
  <div class="csv-item" @click="changeFn('dtestapp')">
    <div>dtestapp.51fanbei.com</div>
    <div>切换</div>
  </div>
  <div class="csv-item" @click="changeFn('testapp')">
    <div>testapp.51fanbei.com</div>
    <div>切换</div>
  </div>
  <div class="csv-item" @click="changeFn('yapp')">
    <div>yapp.51fanbei.com</div>
    <div>切换</div>
  </div>
  <div class="csv-item" @click="changeFn('app')">
    <div>app.51fanbei.com</div>
    <div>切换</div>
  </div>
</div>
</template>

<script>
import storage from 'utils/storage'
import conf from '@/conf'

export default {
  name: '',
  data() {
    return {
      currentServer: storage.props.baseURL ? storage.props.baseURL : conf.URL_BASE
    }
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    changeFn(data) {
      storage.props.baseURL = 'https://' + data + '.51fanbei.com'
      this.currentServer = storage.props.baseURL
      console.log(' changeFn ', storage.props.baseURL)
    }
  },
  components: {}
}
</script>

<style lang="less">
.change-server-view {
  background-color: #ffffff;
  .csv-current {
    padding: 20px;
    text-align: center;
  }
  .csv-item {
    display: flex;
    padding: 20px;
    border-bottom: 1px #eeeeee solid;
    font-size: 15px;
    color: #2e2e2e;
    :first-child {
      flex: 1;
    }
    :last-child {
      background-color: #ffd500;
      padding: 0 20px;
      border-radius: 10px;
    }
  }
}
</style>
