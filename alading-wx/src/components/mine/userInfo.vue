/**
* Created by xiejun on 2018/10/17.
* user info 用户信息节点
*/
<template>
  <div class="ala-user-info">
    <div class="aui__banner"></div>
    <!-- 用户基本信息 -->
    <div class="aui__info-base">
      <div class="user-avatar" @click="onLoginClick">
        <img v-if="hasMinePageInfo" :src="userAvatar"/>
      </div>
      <div v-if="hasMinePageInfo" class="info-base">
        <div class="info-base__name">{{minePageInfo.nick}}</div>
        <div class="info-base__phone-code">{{mobileEncrypt}}</div>
      </div>
      <div v-else class="info-base-default" @click="onLoginClick">登录/注册</div>
    </div>
    <!-- 用户余额优惠券等信息 -->
    <div class="aui__info-more">
      <ala-info-node 
      v-for="(infoData, index) in infoMore" 
      :infoData="infoData"
      :index="index"
      :key="index">
      </ala-info-node>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import alaInfoNode from './infoNode'
import basis from 'utils/basis'
import maidian from 'utils/maidian'

const createData = name => {
  return { name, amount: 0 }
}

export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['isLogin', 'minePageInfo']),
    ...mapGetters(['hasMinePageInfo']),
    // 用户头像
    userAvatar() {
      if (this.hasMinePageInfo) return this.minePageInfo.avata
    },
    mobileEncrypt() {
      if (this.minePageInfo.mobile) return basis.phoneEncrypt(this.minePageInfo.mobile)
      return ''
    },
    // 更多的用户信息
    infoMore() {
      let d1 = createData('余额(元)')
      let d2 = createData('优惠券')
      let d3 = createData('金币')
      if (this.hasMinePageInfo) {
        d1.amount = this.minePageInfo.rebateAmount
        d2.amount = this.minePageInfo.couponCount
        d3.amount = this.minePageInfo.availableCoinAmount
      }
      return [d1, d2, d3]
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // click 登录
    onLoginClick(event) {
      if (this.isLogin) return
      maidian.my(maidian.spm.my_login)
      basis.toLogin()
    }
  },
  components: { alaInfoNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@user-avatar-size: 60px;
.ala-user-info {
  position: relative;
  width: 100%;
  padding-top: 38px;
  .aui__banner {
    position: absolute;
    top: 0;
    z-index: 1;
    .icon('banner_mine', 100%, 162.5px);
  }
  .aui__info-base {
    position: relative;
    z-index: 10;
    .flex-hor-center();
    width: auto;
    margin-left: 17px;

    color: @color-txt;
    .user-avatar {
      .icon('icon_avatar_default', @user-avatar-size, @user-avatar-size);
      border-radius: 50%;
      border: 2px solid white;

      overflow: hidden;

      img {
        border-radius: 50%;
      }
    }
    .info-base {
      margin-left: 18px;

      .info-base__name {
        font-family: PingFangSC-Medium;
        font-size: 15px;
      }
      .info-base__phone-code {
        margin-top: 4.5px;
        font-size: @font-size-txt;
      }
    }
    .info-base-default {
      margin-left: 18px;

      font-family: PingFangSC-Medium;
      font-size: 15px;
    }
  }
  .aui__info-more {
    position: relative;
    z-index: 11;

    height: 72.5px;
    margin: 28px @padding-h-mine 0;

    .flex-hor-center();

    background: white;
    border-radius: 5px;
    box-shadow: 0 4px 7.5px 0 rgba(148, 174, 247, 0.1);
  }
}
</style>  