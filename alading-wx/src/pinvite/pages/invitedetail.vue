/**
* Created by liuguangqing on 2018/12/04.
* 邀请有礼明细
*/
<template>
  <div class="earnpage">
    <div class="earncontain">
      <div class="earncontainch">
        <div class="earntab">
          <dl>
            <dd
              v-if="!nullinviteData"
              class="earntabItem clearfix"
              v-for="(inviteUseItem,inviteUseIndex) in initDataList"
              :key="inviteUseIndex"
            >
              <div>
                <div>{{inviteUseItem.mobile}}</div>
                <div>{{inviteUseItem.userCreateTime}}</div>
              </div>
              <div>
                <div>{{inviteUseItem.type}}</div>
              </div>
              <div>
                <div>+{{inviteUseItem.money}}</div>
                <div
                  :class="inviteUseItem.isCanExchangeCoin==true?'Arrive':'notArrive'"
                >{{inviteUseItem.isCanExchangeCoin==true?'':'次月10号可提现'}}</div>
              </div>
            </dd>
            <div v-if="!nullinviteData" class="loadFont" v-text="upla"></div>
            <dd v-if="nullinviteData" class="showDefault">
              <img src="https://img.51fanbei.com/h5/app/activity/2018/09/GroupCopy9.png">
              暂无邀请好友~
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import wx from 'wx'
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
      nullinviteData: false,
      sendParams: {}
    }
  },
  computed: {
    ...mapState('invite', ['detailData'])
  },
  mounted() {},
  onLoad(options) {
    // this.isAppFn()
  },
  onUnload() {},
  onShow() {
    this.pageNo = 1
    this.initDataList = []
    this.noMoreData = false
    this.nullinviteData = false
    this.upla = '上拉显示更多'
    this.sendParams = { pageNo: this.pageNo, pageSize: this.pageSize }
    console.log(this.$root.$mp.query)
    if (this.$root.$mp.query.userId) {
      this.sendParams.userId = this.$root.$mp.query.userId
    }
    this.toGetIndexData(this.sendParams)
    maidian.view('invite_invitedetail')
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onReachBottom() {
    if (!this.noMoreData) {
      this.pageNo++
      this.upla = '正在加载....'
      this.sendParams.pageNo = this.pageNo
      this.sendParams.pageSize = this.pageSize
      this.toGetIndexData(this.sendParams)
      console.log('到底了')
    } else {
    }
  },
  methods: {
    ...mapActions('invite', ['getDetailDataFn']),
    jumpPage(jumpurl) {
      navigate.push({ url: '/pinvite/pages/' + jumpurl })
    },
    async toGetIndexData(param) {
      await this.getDetailDataFn(param)
      console.log(this.detailData)
      // this.initData = this.reveData
      if (this.detailData.list.length === 0 && this.pageNo === 1) {
        // 第一页 空
        this.nullinviteData = true
        this.upla = ''
        this.noMoreData = true
      } else {
        // 正常上拉
        if (this.initDataList.length < this.detailData.total) {
          this.detailData.list.forEach(element => {
            element.mobile = formateTelNum(element.mobile)
            element.userCreateTime = formatDate(element.userCreateTime, 'minute')
          })
          // 添加数据
          this.initDataList.push(...this.detailData.list)
        } else {
          console.log('下拉没有数据')
        }
        // 没有更多
        if (this.detailData.list.length < this.pageSize || this.initDataList.length === this.detailData.total) {
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
@import '../compoments/css/invitedetail.less';
</style>
