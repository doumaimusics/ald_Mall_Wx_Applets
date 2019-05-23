// 全部账单
const billAll = {
  path: '/prepay/pages/bill/billAll',
  name: 'billAll',
  subPackage: true,
  config: {
    navigationBarTitleText: '全部账单',
    enablePullDownRefresh: true
  }
}
// 账单详情
const billDetail = {
  path: '/prepay/pages/bill/billDetail',
  name: 'billDetail',
  subPackage: true,
  config: {
    navigationBarTitleText: '账单详情'
  }
}

// 还款流程
const repayProcess = {
  path: '/prepay/pages/repayProcess',
  name: 'repayProcess',
  subPackage: true,
  config: {
    navigationBarTitleText: '还款'
  }
}
// 还款成功
const repaySuccess = {
  path: '/prepay/pages/repaySuccess',
  name: 'repaySuccess',
  subPackage: true,
  config: {
    navigationBarTitleText: '还款'
  }
}

// 还款记录列表
const recordList = {
  path: '/prepay/pages/record/list',
  name: 'recordList',
  subPackage: true,
  config: {
    navigationBarTitleText: '还款记录',
    enablePullDownRefresh: true
  }
}
// 还款记录详情
const recordDetail = {
  path: '/prepay/pages/record/detail',
  name: 'recordDetail',
  subPackage: true,
  config: {
    navigationBarTitleText: '还款详情'
  }
}

module.exports = [billAll, billDetail, repayProcess, repaySuccess, recordList, recordDetail]
