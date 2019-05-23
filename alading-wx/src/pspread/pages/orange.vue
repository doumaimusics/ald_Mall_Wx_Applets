/**
* Created by xiejun on 2019/01/16.
* 砂糖桔 推广页
*/
<template>
  <div v-if="visible" class="spread-orange">
    <div class="info">
      <img v-for="(url, index) in infoImgHeadList" :src="url" mode="widthFix" :key="index">
      <img @tap="onPlayTap" :src="mediaPicUrl" mode="widthFix">
      <img v-for="(url, index) in infoImgDetailList" :src="url" mode="widthFix" :key="index">
    </div>
    <div class="menu">
      <btn-simple @tap="onBuyTap" title="尝鲜价：券后16.9元5斤"></btn-simple>
      <div class="share-box">
        <btn-ver-icon-text :isShare="true" title="微信" icon="wxfriend"/>
        <btn-ver-icon-text @tap="onWXGroupTap" title="朋友圈" icon="wxgroup"/>
        <btn-ver-icon-text @tap="onCopyClipboardTap" title="复制链接" icon="paste"/>
      </div>
    </div>
    <video
    src="https://f.51fanbei.com/h5/app/activity/2019/01/video_orange.mp4"
    id="orange-video"/>
  </div>
</template>

<script>
import btnSimple from '@/pspread/components/btnSimple'
import btnVerIconText from '@/pspread/components/btnVerIconText'

import { mapMutations } from 'vuex'
import wx from 'wx'
import basis from 'utils/basis'
import storage from 'utils/storage'
import { saveImg } from 'utils/saveImg'
import Tips from 'utils/tip'

import maidian from 'utils/maidian'
import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      visible: false,
      // 头部图片列表
      infoImgHeadList: [
        'https://f.51fanbei.com/h5/vdian/image_orange_01.jpg',
        'https://f.51fanbei.com/h5/vdian/image_orange_02.jpg'
      ],
      mediaPicUrl: 'https://f.51fanbei.com/h5/vdian/image_orange_03.jpg',
      // 商品详情图片列表
      infoImgDetailList: [
        'https://f.51fanbei.com/h5/vdian/image_orange_04.jpg',
        'https://f.51fanbei.com/h5/vdian/image_orange_05.jpg',
        'https://f.51fanbei.com/h5/vdian/image_orange_06.jpg',
        'https://f.51fanbei.com/h5/vdian/image_orange_07.jpg',
        'https://f.51fanbei.com/h5/vdian/image_orange_08.jpg',
        'https://f.51fanbei.com/h5/vdian/image_orange_09.jpg',
        'https://f.51fanbei.com/h5/vdian/image_orange_10.jpg',
        'https://f.51fanbei.com/h5/vdian/image_orange_11.jpg'
      ]
    }
  },
  props: {},
  computed: {},
  created() {},
  onShow() {
    if (storage.props.launchStatus === 1) return
    this.visible = true
    maidian.view('orangepage_wechat')
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  mounted() {
    if (this.visible) {
      this.videoContext = wx.createVideoContext('orange-video')
    }
  },
  watch: {},
  onShareAppMessage(res) {
    let title = '香甜爽口，入口即化的广东砂糖桔来啦'
    let path = '/pspread/pages/orange'
    let imageUrl = 'https://f.51fanbei.com/h5/vdian/image_orange_01.jpg'
    maidian.click('orangepage_share_wechat')
    maidian.click('orangepage_sharesuccss_wechat')
    return {
      title,
      path,
      imageUrl
    }
  },
  methods: {
    ...mapMutations(['setGoodsIdsData']),
    onPlayTap() {
      // 开始播放视频
      if (this.videoContext) {
        this.videoContext.requestFullScreen({ direction: 0 })
        this.videoContext.play()
        this.videoContext.seek(0)
      } else {
        Tips.toast('视频播放失败')
      }
    },
    onBuyTap() {
      this.setGoodsIdsData(203232)
      basis.toGoodsDetail()
      maidian.click('orangepage_buy_wechat')
    },
    onWXGroupTap() {
      saveImg('https://f.51fanbei.com/h5/vdian/image_orange_share.jpg')
      maidian.click('orangepage_share_wechat')
      maidian.click('orangepage_savepic_wechat')
    },
    onCopyClipboardTap() {
      wx.setClipboardData({
        data: 'https://btesth5.51fanbei.com/asj/spread/orange?channel=outter',
        success: res => {},
        fail: res => {
          Tips.toast('复制失败，请重新尝试')
        }
      })
    }
  },
  components: { btnSimple, btnVerIconText }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.spread-orange {
  .fill-page(@color-bg);
  #orange-video {
    height: 0;
  }
  .info {
    padding-bottom: 100px;
  }
  .menu {
    position: fixed;
    left: 0;
    bottom: 0;
    .image-single('image_bottom_bg.png', 375px, 108px);

    .spread-btn-simple {
      margin-top: -3px;
    }
    .share-box {
      margin-top: 15px;
      .padding-h(55px);
      .flex-hor-center();
      .spread-btn-ver-icon-text {
        .flex-n();
      }
    }
  }
}
</style>
