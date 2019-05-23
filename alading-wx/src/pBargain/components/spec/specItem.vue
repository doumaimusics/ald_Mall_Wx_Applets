/**
* Created by huangyilu on 2018/11/23.
* 选择规格 item
*/
<template>
  <div class="bar-detail-rule">
    <!-- 商品规格 -->
    <div class="cs-spec" @click="bindSetSpecShowFn">
      <div class="cs-spec__item">
        <div class="item-left">选择</div>
        <div class="item-center">请选择规格</div>
        <div class="item-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import navigate from 'utils/navigate'

export default {
  name: '',
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['isLogin'])
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {
    ...mapMutations('bargain', ['setIsSpecShow', 'setIsBargainHomeSped']),
    bindSetSpecShowFn () {
      if (this.isLogin) {
        this.setIsBargainHomeSped(false)
        this.setIsSpecShow(true)
      } else {
        navigate.push({ url: '/pages/common/login' })
      }
    }
  },
  components: { mapMutations }
}
</script>

<style lang="less">
@import "../../style/index.less";
.cs-spec {
  .cs-spec__item {
    font-size: 13px;
    display: flex;
    align-items: center;
    padding: 11px 14px;
    background-color: #ffffff;
    .item-left {
      color: @color-txt-999;
      margin-right: 15px;
    }
    .item-center {
      flex: 1;
    }
    .item-right {
      .icon("icon_arrow", 20px, 20px);
    }
  }
}
</style>
