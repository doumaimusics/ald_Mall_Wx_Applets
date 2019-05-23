<template>
  <div class="revenue">
    <div class="revecontain">
      <div class="revetop clearfix">
        <span class="fl">您当前为第
          <i>55</i> 名
        </span>
        <span class="fr">提升我的收益？</span>
      </div>
    </div>
    <div class="userList">
      <dl class="userContain">
        <dt class="tableTitle">
          <div>名次</div>
          <div>用户</div>
          <div>累计邀请收益</div>
        </dt>
        <dd class="tableItem">
          <div>1</div>
          <div>
            <div>186****9887</div>
            <div class="pick">2018.09.09 09:30</div>
          </div>
          <div>999,999</div>
        </dd>
        <dd class="tableItem">
          <div>1</div>
          <div>
            <div>186****9887</div>
            <div class="pick">2018.09.09 09:30</div>
          </div>
          <div>999,999</div>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import Monitor from 'utils/monitor'
export default {
  data() {
    return {}
  },
  onShow() {
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  }
}
</script>
<style lang="less">
@import '../compoments/css/inviterank.less';
</style>

