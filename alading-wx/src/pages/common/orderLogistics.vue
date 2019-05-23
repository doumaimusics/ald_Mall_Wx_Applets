/**
* Created by huangyilu on 2018/10/22.
* 物流信息
*/
<template>
  <div class="logistics-sec-view">

    <div class="logistics-sec__top">
      <div class="logistics-top__state">
        <text class="state-txt">物流状态</text>
        <text class="state-info">{{ logisticsData.stateDesc || '暂无相关信息' }}</text>
      </div>
      <div class="logistics-top__info-item">承运来源： {{ logisticsData.shipperName || '暂无相关信息' }}</div>
      <div class="logistics-top__info-item">运单编号： {{ logisticsData.shipperCode || '暂无相关信息' }}</div>
    </div>

    <div class="logistics-sec__list">
      <div class="list-item" v-for="(item, index) in logisticsData.tracesInfo" :key="index">
        <div class="list-item-content">{{ item.acceptStation }}</div>
        <div class="list-item-time">{{ item.acceptTime }}</div>
        <div class="active_icon" v-if="index === 0"></div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Tips from 'utils/tip'
import util from 'utils/index'
import cache from 'utils/cache'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      logisticsData: {}
    }
  },
  props: {},
  computed: {
    ...mapState(['currentOrderId'])
  },
  created() {},
  onShow() {
    this.toGetOrderLogisticsData()
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
    ...mapActions(['getOrderLogisticsData']),
    async toGetOrderLogisticsData() {
      Tips.loading()
      let cacheKey = 'orderLogistics1'
      let cacheData = cache.mapGet(cacheKey, this.currentOrderId)
      if (cacheData) {
        this.logisticsData = cacheData
      } else {
        this.logisticsData = {}
      }

      let data = await this.getOrderLogisticsData({ traces: 1 })
      if (data) {
        this.logisticsData = data

        let infos = this.logisticsData.tracesInfo
        infos.forEach(data => (data.acceptTime = util.formatDate2(data.acceptTime)))

        cache.mapPush(cacheKey, this.currentOrderId, this.logisticsData, cache.TIME_LONG)
        cache.mapPush('orderLogistics0', this.currentOrderId, this.logisticsData.newestInfo, cache.TIME_LONG)
      }
      Tips.loaded()
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

.logistics-sec__top {
  background-color: #fff;
  height: 1.58rem;
  padding: 0 22.5px;
  padding-top: 21px;
  .logistics-top__state {
    display: flex;
    height: 0.48rem;
    align-items: center;
    margin-bottom: 4px;
    .state-txt {
      font-size: 0.34rem;
      color: @color-txt;
    }
    .state-info {
      font-size: 0.34rem;
      color: #feae25;
      margin-left: 22.5px;
    }
  }
  .logistics-top__info-item {
    margin-top: 2px;
    color: #bababa;
    font-size: 0.24rem;
  }
}
.logistics-sec__list {
  background-color: #fff;
  padding: 0 35px;
  margin-top: 10px;
  .list-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 1.75rem;
    padding-left: 20px;
    position: relative;
    .list-item-content {
      font-size: 0.26rem;
      color: @color-txt;
      margin-bottom: 4px;
      .show-line(3);
    }
    .list-item-time {
      font-size: 0.24rem;
      color: #bebebe;
    }
  }
  .list-item:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: #e7e7e7;
  }
  .list-item:first-child:before {
    height: 50%;
    top: 50%;
  }
  .list-item:last-child:before {
    height: 50%;
  }
  .list-item:after {
    content: '';
    position: absolute;
    left: -3px;
    top: 50%;
    margin-top: -3px;
    width: 0.13rem;
    height: 0.13rem;
    border-radius: 50%;
    background-color: #c7c7c7;
  }
  .list-item .active_icon {
    position: absolute;
    left: -5.5px;
    top: 50%;
    margin-top: -5.5px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: @color-btn;
    z-index: 2;
  }
  .list-item .active_icon:before {
    content: '';
    position: absolute;
    left: -3px;
    top: -3px;
    width: 17.5px;
    height: 17.5px;
    border-radius: 50%;
    background-color: @color-btn;
    opacity: 0.46;
  }
}
</style>
