/**
* Created by huangyilu on 2018/11/15.
* 头部商品 item
*/
<template>
  <div class="ags-swiper__item" @click.stop="bindGoodsItemFn">
    <!-- 主图 -->
    <div class="ags__img">
      <div class="stock-empty" v-if="goodsData.stockLessNum === 0">已抢光</div>
      <img :src="goodsData.goodsIcon" alt>
    </div>
    <div class="ags__info">
      <!-- 商品名 -->
      <div class="ags-info__tit">{{ goodsData.goodsName }}</div>
      <!-- 砍价信息 -->
      <div class="ags-info__need">
        <span>￥0</span>
        需{{ goodsData.targetNum }}人助力
      </div>
      <!-- 价钱信息 -->
      <div class="ags-info__price">￥{{ goodsData.saleAmount }}</div>
      <div
        class="ags-info__btn"
        v-if="goodsData.stockLessNum !== 0"
        @click.stop="bindInitBargainFn"
      >发起砍价</div>
      <!-- <div
        class="ags-info__btn"
        v-if="goodsData.isFreeIng === 1"
        @click.stop="bindBargainDetailFn"
      >砍价中</div>-->
      <div
        :class="[ 'ags-info__btn', { 'stock-empty' : goodsData.stockLessNum === 0 }]"
        v-if="goodsData.stockLessNum === 0"
      >已抢光</div>
    </div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'
import { mapMutations, mapActions, mapState } from 'vuex'
import Tips from 'utils/tip'
import conf from '../../util/conf'
import maidian from 'utils/maidian'

export default {
  name: '',
  data() {
    return {}
  },
  props: {
    goodsData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    goodsIndex: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapActions('bargain', ['getBargainGoodsLimitInfo']),
    ...mapMutations('bargain', [
      'setBargainTabIndex',
      'setBargainGoodsIndex',
      'setIsSpecShow',
      'setBargainGoodsIdsData',
      'setIsBargainHomeSped'
    ]),
    // 前往 商品详情 / 砍价详情
    bindGoodsItemFn() {
      maidian.click(
        'kanjia_homepage_banner_' + this.goodsIndex,
        this.goodsData.goodsName,
        this.goodsData.freeOrderGoodsId
      )
      // 是否正在砍价中 1 是
      if (this.goodsData.isFreeIng === 1) {
        this.bindBargainDetailFn()
      } else {
        this.setBargainGoodsIndex(this.goodsIndex)
        navigate.push({ url: '/pBargain/pages/bargainGoodsDetail?freeOrderGoodsId=' + this.goodsData.freeOrderGoodsId })
      }
    },
    // 前往 砍价详情
    bindBargainDetailFn() {
      navigate.push({
        url:
          '/pBargain/pages/bargainDetail?freeOrderId=' +
          this.goodsData.freeOrderId +
          '&recommendId=' +
          this.goodsData.userId
      })
    },
    // 发起砍价
    bindInitBargainFn() {
      // 是否登录
      if (!this.isLogin) {
        navigate.push({ url: '/pages/common/login' })
        return
      }
      // 是否正在砍价中 1 是
      if (this.goodsData.isFreeIng === 1) {
        this.bindBargainDetailFn()
        return
      }
      // 是否还能发起砍价
      this.getBargainGoodsLimitInfoData()
    },
    // 获取 商品限购信息
    getBargainGoodsLimitInfoData() {
      Tips.loading()
      this.getBargainGoodsLimitInfo({
        freeOrderGoodsId: this.goodsData.freeOrderGoodsId
      }).then(res => {
        let msgcode = conf.GOODSLIMITINFO[res.userGoodsStatus]
        switch (msgcode) {
          case 1:
            // 最终 可以发起砍价
            this.setBargainGoodsIdsData(this.goodsData.freeOrderGoodsId)
            this.setIsBargainHomeSped(true)
            this.setIsSpecShow(true)
            Tips.loaded()
            break
          case 2:
            Tips.loaded()
            Tips.confirm(res.msg).then(() => {
              // 前往我的砍价
              this.setBargainTabIndex(3)
            })
            break
          case 3:
            Tips.loaded()
            Tips.toast(res.msg)
            break
          default:
            Tips.loaded()
        }
        return msgcode
      })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.ags-swiper__item {
  margin: 15 / @px 0 15 / @px 20 / @px;
  width: 680 / @px;
  height: 320 / @px;
  border-radius: 12 / @px;
  display: flex;
  box-shadow: 0 / @px 8 / @px 20 / @px 0 / @px rgba(0, 0, 0, 0.1);
  border-radius: 16 / @px;
  overflow: hidden;
  background-color: #ffffff;
  .ags__img {
    img {
      vertical-align: middle;
      width: 320 / @px;
      height: 320 / @px;
    }
    .stock-empty {
      position: absolute;
      width: 160px;
      height: 160px;
      line-height: 160px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 18px;
    }
  }
  .ags__info {
    margin: 20 / @px;
    .flex-n();
    .ags-info__tit {
      .show-line(2);
      color: @color-txt-666;
      height: 80 / @px;
      line-height: 40 / @px;
    }
    .ags-info__need {
      margin-top: 10 / @px;
      margin-bottom: 10 / @px;
      span {
        font-size: @font-size-price;
        color: #de1414;
        font-weight: 500;
        font-family: PingFangSC-Medium;
      }
    }
    .ags-info__price {
      color: @color-txt-999;
      .line-through();
      margin-top: 6 / @px;
      margin-bottom: 18 / @px;
    }
    .ags-info__btn {
      width: 294 / @px;
      height: 70 / @px;
      line-height: 70 / @px;
      text-align: center;
      background: linear-gradient(128deg, rgba(255, 233, 121, 1) 0%, rgba(255, 201, 76, 1) 100%);
      border-radius: 35 / @px;
      color: #975f00;
      font-size: 30 / @px;
      font-weight: 600;
      &.stock-empty {
        background: #cccccc;
        color: #999999;
      }
    }
  }
}
</style>
