/**
* Created by huangyilu on 2018/11/21.
* 商品item
*/
<template>
  <div class="bargain-goods-item" @click.stop="bindGoodsItemFn">
    <!-- 主图 -->
    <div class="bgi__img">
      <div class="stock-empty" v-if="goodsData.stockLessNum === 0">已抢光</div>
      <img :src="goodsData.goodsIcon" alt>
    </div>
    <div class="bgi__info">
      <!-- 商品名 -->
      <div class="bgi-info__tit">{{ goodsData.goodsName }}</div>
      <!-- 砍价信息 -->
      <div class="bgi-info__need">
        <div class="need-txt">
          <span>￥0</span>
          需{{ goodsData.targetNum }}人助力
        </div>
        <div class="need-btn">
          <div class="txt" v-if="goodsData.stockLessNum !== 0" @click.stop="bindInitBargainFn">发起砍价</div>
          <!-- <div class="txt" v-if="goodsData.isFreeIng === 1" @click.stop="bindBargainDetailFn">砍价中</div> -->
          <div></div>
          <div
            :class="[ 'txt', { 'stock-empty' : goodsData.stockLessNum === 0 }]"
            v-if="goodsData.stockLessNum === 0"
          >已抢光</div>
        </div>
      </div>
      <!-- 原价 价钱信息 -->
      <div class="bgi-info__price">
        <div>￥{{ goodsData.saleAmount }}</div>
        <div>已领{{ goodsData.saleCount }}件</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import navigate from 'utils/navigate'
import Tips from 'utils/tip'
import conf from '../../util/conf'
import maidian from 'utils/maidian'

export default {
  name: '',
  data() {
    return {}
  },
  props: {
    isCanBargain: {
      type: Boolean,
      default: true
    },
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
    // 前往 商品详情
    bindGoodsItemFn() {
      // 是否正在砍价中 1 是
      if (this.goodsData.isFreeIng === 1) {
        this.bindBargainDetailFn()
      } else {
        this.setMaidianInfoFn()
        this.setBargainGoodsIndex(this.goodsIndex + 3)
        navigate.push({ url: '/pBargain/pages/bargainGoodsDetail?freeOrderGoodsId=' + this.goodsData.freeOrderGoodsId })
      }
    },
    // 前往 砍价详情
    bindBargainDetailFn() {
      this.setMaidianInfoFn()
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
      // 如果是砍价详情的列表 不需要直接发起砍价
      if (!this.isCanBargain) {
        this.setMaidianInfoFn()
        navigate.push({ url: '/pBargain/pages/bargainGoodsDetail?freeOrderGoodsId=' + this.goodsData.freeOrderGoodsId })
        return
      }
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
    },
    // 埋点
    setMaidianInfoFn() {
      if (this.isCanBargain) {
        // 首页商品点击 埋点
        let methods = 'kanjia_homepage_product_' + this.goodsIndex
        maidian.click(methods, this.goodsData.goodsName, this.goodsData.freeOrderGoodsId)
      } else {
        // 砍价详情 商品列表 点击 埋点
        let methods = 'kanjia_detail_tuijian_' + this.goodsIndex
        maidian.click(methods, this.goodsData.goodsName, this.goodsData.freeOrderGoodsId)
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.bargain-goods-item {
  background-color: #ffffff;
  margin: 20 / @px 0;
  padding: 30 / @px 20 / @px;
  display: flex;
  .bgi__img {
    position: relative;
    img {
      vertical-align: middle;
      width: 260 / @px;
      height: 260 / @px;
    }
    .stock-empty {
      position: absolute;
      width: 130px;
      height: 130px;
      line-height: 130px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 18px;
    }
  }
  .bgi__info {
    margin-left: 50 / @px;
    .flex-n();
    .bgi-info__tit {
      .show-line(2);
      color: @color-txt-666;
      height: 80 / @px;
      line-height: 40 / @px;
    }
    .bgi-info__need {
      display: flex;
      margin-top: 50 / @px;
      margin-bottom: 10 / @px;
      .need-txt {
        .flex-n();
        span {
          font-size: @font-size-price;
          color: @color-txt-price;
        }
      }
      .need-btn {
        .txt {
          width: 160 / @px;
          height: 60 / @px;
          line-height: 60 / @px;
          text-align: center;
          background: @color-btn-bg;
          border-radius: 30 / @px;
          &.stock-empty {
            background: #cccccc;
            color: #999999;
          }
        }
      }
    }
    .bgi-info__price {
      display: flex;
      color: @color-txt-999;
      :first-child {
        .flex-n();
        .line-through();
      }
      :last-child {
        min-width: 160 / @px;
        text-align: center;
      }
    }
  }
}
</style>
