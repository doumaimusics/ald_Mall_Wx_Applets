/**
* Created by xiejun on 2019/01/25.
* 浮动头部
*/
<template>
  <div class="float-head">
    <!-- banner -->
    <banner-head @tap="onBannerTap" :bannerList="bannerList"></banner-head>
    <!-- icon nav -->
    <icon-nav></icon-nav>
    <!-- today collage -->
    <today-buy v-if="featured.length" :goodsList="featured"></today-buy>
  </div>
</template>

<script>
import bannerHead from 'components/alaUI/bannerHead'
import iconNav from './iconNav'
import todayBuy from './todayBuy'

import { mapGetters } from 'vuex'
import webview from 'utils/webview'
// import maidian from 'utils/maidian'
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters('collage', ['featured', 'bannerList'])
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onBannerTap(index) {
      let url = this.bannerList[index].content
      webview.openOpeNav(url)
    }
  },
  components: { bannerHead, iconNav, todayBuy }
}
</script>

<style lang="less" scoped>
.float-head {
  background: white;
  /deep/.banner-head {
    padding-bottom: 17px;
  }
}
</style>
