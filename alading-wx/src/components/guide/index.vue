<template>
  <div >
    <div class="shadow-box" v-show="type==1 && guideStatus.home">
      <div class="guide-1">
        <div class="box flex">
          <div class="icon-bill"></div>
          <div class="icon-arrow"></div>
          <div class="tip">分期账单<br>可以在小程序还款啦</div>
        </div>
        <div class="icon-next" @click="clickBtn(1)"></div>
      </div>
    </div>
    <div class="shadow-box" v-show="type==2 && guideStatus.home">
      <div class="guide-2" :class="{'iphonex': isIphoneX }">
        <div class="box">
          <div class="icon-know" @click="clickBtn(2)"></div>
          <div class="tip">我的里面同步了<br>账单功能~</div>
          <div class="icon-arrow"></div>
          <div class="icon-mine"></div>
        </div>
      </div>
    </div>
    <div class="shadow-box" v-show="type==3 && guideStatus.mine">
      <div class="guide-3">
        <div class="tip">我的账单<br>可以还款，查看明细啦~</div>
        <div class="box flex">
          <div class="icon-arrow"></div>
          <div class="icon-know" @click="clickBtn(3)"></div>
        </div>
        <div class="icon-bill-tab"></div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import { mapState } from 'vuex'
import systemInfo from 'utils/systemInfo'
export default {
  name: 'ala-guide',
  data() {
    return {
      type: 0,
      guideStatus: {}
    }
  },
  mounted() {
    this.type = this.currentTabbarIndex === 0 ? 1 : 3
    this.guideStatus = storage.props.guideStatus
  },
  computed: {
    ...mapState(['currentTabbarIndex']),
    isIphoneX() {
      return systemInfo.isIphoneX
    }
  },
  watch: {
    currentTabbarIndex() {
      const index = this.currentTabbarIndex
      if (index === 0) {
        this.type = 1
      }
      if (index === 3) {
        this.type = 3
      }
    }
  },
  methods: {
    clickBtn(type) {
      if (type === 1) {
        this.type = 2
      } else if (type === 2) {
        this.type = 0
        this.guideStatus.home = false
        storage.setProp('guideStatus', this.guideStatus)
      } else {
        this.type = 0
        this.guideStatus.mine = false
        storage.setProp('guideStatus', this.guideStatus)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

.shadow-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.guide-1 {
  padding-top: 220px;
  .box {
    padding-left: 13px;
  }
  .icon-arrow {
    margin-left: 13px;
    margin-top: 8px;
    transform: rotate(230deg);
  }
  .tip {
    margin-top: 12px;
  }
}

.iphonex {
  bottom: 32px!important;
}
.guide-2 {
  padding-top: 380.5px;
  position: absolute;
  bottom: 0;
  left: 154px;
  // .box {
  //   // left: 154px;
  // }
  .icon-arrow {
    margin-left: 105px;
    margin-top: 0px;
    transform: rotate(110deg);
  }
  .tip {
    margin-top: 21px;
    margin-left: 8px;
  }
}
.guide-3 {
  padding-top: 230.5px;
  .icon-arrow {
    margin-left: 31px;
    margin-top: 15.5px;
    transform: rotate(190deg);
  }
  .tip {
    margin-left: 52px;
  }
  .icon-know {
    margin-top: 5px;
    margin-left: 129px;
  }
}
.icon-bill {
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-image: url('https://f.51fanbei.com/h5/vdian/icon_bill@2x.png');
  background-size: 100% 100%;
}
.icon-arrow {
  width: 45px;
  height: 43.5px;
  background-repeat: no-repeat;
  background-image: url('https://f.51fanbei.com/h5/vdian/icon_arrow_guide@2x.png');
  background-size: 100% 100%;
}

.tip {
  font-size: 17px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
}

.icon-next {
  margin-left: 148px;
  margin-top: 22px;
  width: 115px;
  height: 44px;
  background-repeat: no-repeat;
  background-image: url('https://f.51fanbei.com/h5/vdian/icon_guide_next@2x.png');
  background-size: 100% 100%;
}
.icon-know {
  width: 115px;
  height: 44px;
  background-repeat: no-repeat;
  background-image: url('https://f.51fanbei.com/h5/vdian/icon_guide_know@2x.png');
  background-size: 100% 100%;
}
.icon-mine {
  margin-left: 150px;
  margin-top: 20px;
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-image: url('https://f.51fanbei.com/h5/vdian/icon_guide_mine@2x.png');
  background-size: 100% 100%;
}
.icon-bill-tab {
  margin-left: 8px;
  margin-top: 20px;
  width: 359px;
  height: 57.5px;
  background-repeat: no-repeat;
  background-image: url('https://f.51fanbei.com/h5/vdian/icon_guide_bill@2x.png');
  background-size: 100% 100%;
}

.flex {
  display: flex;
}
</style>