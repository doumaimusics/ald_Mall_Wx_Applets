/**
* Created by xiejun on 2018/11/22.
* 主页
* 包括拼团主页及我的拼团订单列表
*/
<template>
  <div v-if="channelData" class="collage-index">
    <div class="content">
      <my-collage v-if="isIndexCollage"/>
      <my-order v-else :isLoad="isLoadOrderList"/>
    </div>
    <!-- 底部菜单 -->
    <my-menu></my-menu>
  </div>
</template>

<script>
import myCollage from './collage/myCollage'
import myOrder from './order/myOrder'
import myMenu from './menu/myMenu'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import storage from 'utils/storage'
import basis from 'utils/basis'
import maidian from 'utils/maidian'
import Tips from 'utils/tip'
import wx from 'wx'
import Monitor from 'utils/monitor'

export default {
  name: '',
  mixins: [],
  data() {
    return {
      isLoadOrderList: false
    }
  },
  props: {},
  computed: {
    ...mapState(['isLogin', 'isToLogin']),
    ...mapState('collage', ['index', 'channelIndex', 'indexData']),
    ...mapGetters('collage', ['isIndexCollage', 'channelData'])
  },
  created() {},
  onShow() {
    this.toShow()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  mounted() {},
  onUnload() {
    this.resetIndex()
  },
  onPullDownRefresh() {
    this.refresh()
  },
  watch: {
    index() {
      this.toShow()
    }
  },
  methods: {
    ...mapMutations(['setIsToLogin']),
    ...mapMutations('collage', ['setIndex']),
    ...mapActions('collage', ['resetIndex', 'getIndexData', 'getMyOrderList']),

    toShow() {
      if (storage.props.launchStatus === 1) return

      if (this.isIndexCollage) {
        this.toGetIndexData()
        maidian.view('pintuan_home')
      } else {
        maidian.view('pintuan_orderlist')
        // 拼团订单列表
        if (!this.isLogin) {
          if (this.isToLogin) {
            // 去登录了，结果还是没有登录
            this.setIndex(1)
            this.setIsToLogin(false)
            this.toGetIndexData()
            return
          }
          this.setIsToLogin(true)
          basis.toLogin()
          return
        }
        this.toGetMyOrderList()
      }
    },

    async toGetIndexData() {
      await this.getIndexData()
    },
    async toGetMyOrderList() {
      this.isLoadOrderList = true
      Tips.loading()
      await this.getMyOrderList()
      Tips.loaded()
      this.isLoadOrderList = false
    },
    async refresh() {
      if (this.isIndexCollage) {
        await this.toGetIndexData()
      } else {
        await this.toGetMyOrderList()
      }
      wx.stopPullDownRefresh()
    }
  },
  components: {
    myCollage,
    myOrder,
    myMenu
  }
}
</script>

<style lang="less">
</style>
