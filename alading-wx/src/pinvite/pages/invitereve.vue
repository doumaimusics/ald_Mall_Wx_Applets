/**
* Created by liuguangqing on 2018/12/05.
* 邀请有礼收益
*/
<template>
  <div class="revenue">
    <!-- divlist -->
    <div class="revecon_child">
      <div class="revecontain">
        <div class="revetop clearfix">
          <span class="fl">
            已邀请
            <i>{{initData.userSum}}</i>人，累计
            <i>{{initData.coinSum}}</i>金币
          </span>
          <span @click="jumpPage('invitedetail')" class="fr">
            查看收益明细
            <i></i>
          </span>
        </div>
      </div>
    </div>
    <!-- v-else -->
    <div class="userList">
      <div
        v-if="!nullinviteData"
        class="userItem"
        v-for="(byitem, byind) in initDataList"
        @click="gotopage(byitem)"
        :key="byind"
      >
        <div class="usermsg clearfix">
          <div class="fl">
            <div class="mobile">{{byitem.mobile}}</div>
            <div class="picker">
              <span>{{byitem.userCreateTime}}</span>
              <!-- <span>09:30</span> -->
            </div>
          </div>
          <div
            class="fr status"
            :class="byitem.userStatus == 1?'active':''"
          >{{byitem.userStatus == 1?'登录成功':'邀请未登录'}}</div>
        </div>
        <div class="countBox">
          <div>
            <div>累计奖励</div>
            <div>{{byitem.coinSum}}</div>
          </div>
          <div>
            <div>累计订单数</div>
            <div>{{byitem.orderSum}}</div>
          </div>
          <div>
            <div>
              次月可提现金币
              <i @click.stop="ruleDes()" class="questionBox"></i>
            </div>
            <div>{{byitem.canotExchangeCoinSum}}</div>
          </div>
        </div>
      </div>

      <div class="loadFont" v-if="!nullinviteData">{{upla}}</div>
      <div class="nulluser" v-if="nullinviteData">
        <img src="https://f.51fanbei.com/h5/app/activity/11/Group Copy 5.png" alt>
        <div>暂无邀请好友～</div>
      </div>
    </div>
    <div :class="'altwin '+boxmsg.className" v-if="showWinAlt">
      <div class="altcontain">
        <!-- 关闭 -->
        <div class="altclose" @click="closealt"></div>
        <!-- 头部 -->
        <div class="althead" v-html="boxmsg.title">{{boxmsg.title}}</div>
        <!-- 内容 -->
        <div class="altcon" v-html="boxmsg.content">{{boxmsg.content}}</div>
        <!-- 按钮 -->
        <!-- <div class="altbtn">altbtn</div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import wx from 'wx'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import { mapState, mapActions } from 'vuex'
import maidian from 'utils/maidian'
import Monitor from 'utils/monitor'
export default {
  data() {
    return {
      initData: {},
      initDataList: [],
      pageNo: 1,
      pageSize: 20,
      noMoreData: false,
      upla: '上拉显示更多',
      showWinAlt: false,
      nullinviteData: false,
      boxmsg: {
        title: '',
        content: '',
        className: ''
      }
    }
  },
  computed: {
    ...mapState('invite', ['reveData'])
  },
  mounted() {},
  onLoad(options) {},
  onUnload() {},
  onShow() {
    this.pageNo = 1
    this.initDataList = []
    this.noMoreData = false
    this.nullinviteData = false
    this.upla = '上拉显示更多'
    this.toGetIndexData({ pageNo: this.pageNo, pageSize: this.pageSize })
    maidian.view('invite_invitereve')
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  // 滚动到底部的方法
  onReachBottom() {
    if (!this.noMoreData) {
      this.pageNo++
      this.upla = '正在加载....'
      this.toGetIndexData({ pageNo: this.pageNo, pageSize: this.pageSize })
      console.log('到底了')
    } else {
    }
  },
  methods: {
    ...mapActions('invite', ['getreveData']),
    // 去明细
    jumpPage(jumpurl) {
      navigate.push({ url: '/pinvite/pages/' + jumpurl })
      maidian.view('invite_invitereve_goto' + jumpurl)
    },
    gotopage(item) {
      let params = { userId: item.userId }
      navigate.push({ url: '/pinvite/pages/invitedetail?' + basis.urlencoded(params) })
      maidian.view('invite_invitereve_gotoinvitedetail' + '_userId' + item.userId)
    },
    // 弹窗
    ruleDes() {
      this.boxmsg.title = '规则说明'
      var str = ''
      for (let i = 0; i < this.reveData.canotExchangeCoinRule.length; i++) {
        str += '<p>' + this.reveData.canotExchangeCoinRule[i] + '</p>'
      }
      this.boxmsg.content = str
      this.showAlt()
    },
    // 关闭弹窗
    closealt() {
      this.boxmsg.className = ''
      this.showWinAlt = false
    },
    // //弹窗展示
    showAlt() {
      this.showWinAlt = true
    },
    async toGetIndexData(param) {
      await this.getreveData(param)
      console.log(this.reveData.rewardList)
      this.initData = this.reveData
      if (this.reveData.rewardList.length === 0 && this.pageNo === 1) {
        // 第一页 空
        this.nullinviteData = true
        this.upla = ''
        this.noMoreData = true
      } else {
        // 正常上拉
        console.log(this.initDataList.length === this.reveData.total)
        if (this.initDataList.length < this.reveData.total) {
          this.reveData.rewardList.forEach(element => {
            element.mobile = formateTelNum(element.mobile)
            element.userCreateTime = formatDate(element.userCreateTime, 'minute')
          })
          // 添加数据
          this.initDataList.push(...this.reveData.rewardList)
        } else {
          console.log('下拉没有数据')
        }
        // 没有更多
        if (this.reveData.rewardList.length < this.pageSize || this.initDataList.length === this.reveData.total) {
          this.upla = '没有更多'
          this.noMoreData = true
        }
      }
    }
  }
}
// 时间戳转换
function formatDate(now, type) {
  now = new Date(parseInt(now))
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  var str = year + '-' + month + '-' + date
  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  if (type === 'minute') {
    str = year + '-' + month + '-' + date + ' ' + hour + ':' + minute
  } else if (type === 'second') {
    str = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  } else {
    str = year + '-' + month + '-' + date
  }
  // return "20"+year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
  return str
}

// 隐藏电话号码的中间四位
function formateTelNum(tel) {
  if (tel) {
    var telLength = tel.length
    if (telLength < 11) {
      // tel = tel
    } else if (telLength >= 11) {
      var telNum = tel.substring(3, 7)
      tel = tel.replace(telNum, '****')
    }
    return tel
  } else {
    return ''
  }
}
</script>
<style lang="less">
@import '../compoments/css/invitereve.less';
</style>
