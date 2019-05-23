/**
* Created by xiejun on 2018/11/4.
* 订单详情——物流信息
*/
<template>
  <div class="ala-order-detail-logistics" @click="onClick">
    <div class="ala-order-detail-logistics__icon"></div>
    <div v-if="hasInfo" class="ala-order-detail-logistics__info">
      <div class="info-station">{{acceptStation}}</div>
      <div class="info-time">{{acceptTime}}</div>
    </div>
    <div v-else class="ala-order-detail-logistics__tip">{{tipInfo}}</div>
    <div class="ala-order-detail-logistics__icon-arrow"></div>
  </div>
</template>

<script>
import util from 'utils/index'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    tipInfo: {
      type: String,
      default: '正在全力读取物流信息...'
    },
    logisticsData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    hasInfo() {
      return basis.isObjNotNull(this.logisticsData)
    },
    acceptStation() {
      return this.logisticsData.acceptStation
    },
    acceptTime() {
      return util.formatDate2(this.logisticsData.acceptTime)
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClick() {
      navigate.push({ url: '/pages/common/orderLogistics' })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-order-detail-logistics {
  position: relative;
  .border-1px-bottom();
  &:after {
    left: @padding-h;
    right: @padding-h;
  }

  .flex-hor-center();
  width: 100%;
  .padding-v(23px);
  .padding-h(@padding-h);
  box-sizing: border-box;
  background: white;

  .ala-order-detail-logistics__icon {
    .icon('icon_logistics_car', 20px, 20px);
  }
  .ala-order-detail-logistics__info {
    .flex-n();
    margin-left: 13px;
    .info-station {
      font-family: PingFangSC-Medium;
      font-size: @font-size-list;
      color: #359a2b;
    }
    .info-time {
      margin-top: 10px;
      font-size: @font-size-txt;
      color: @color-txt-2;
    }
  }

  .ala-order-detail-logistics__tip {
    .flex-n();
    margin-left: 13px;
    color: @color-txt;
    font-size: @font-size-list;
  }

  .ala-order-detail-logistics__icon-arrow {
    margin-left: 10px;
    .icon-arrow();
  }
}
</style>