const commonRoutes = require('./commonRoutes')
const activityRoutes = require('./activityRoutes')
const inviteRoutes = require('./inviteRoutes')
const bargainRoutes = require('./bargainRoutes')
const collageRoutes = require('./collageRoutes')
const jumperRoutes = require('./jumperRoutes')
const spreadRoutes = require('./spreadRoutes')
const repayRoutes = require('./repayRoutes')

// 首页
const index = {
  path: '/pages/index/index',
  name: 'index',
  config: {
    navigationBarTitleText: '爱上街',
    enablePullDownRefresh: true
  }
}

// test vuex module
const test = {
  path: '/pages/test',
  name: 'test',
  config: {
    navigationBarTitleText: '测试'
  }
}

// 测试 更换服务器页面
const changeServer = {
  path: '/pages/changeServer',
  name: 'changeServer',
  config: {
    navigationBarTitleText: '更换服务器'
  }
}

module.exports = [
  index,
  test,
  changeServer,
  ...commonRoutes,
  ...activityRoutes,
  ...jumperRoutes,
  ...bargainRoutes,
  ...collageRoutes,
  ...inviteRoutes,
  ...spreadRoutes,
  ...repayRoutes
]
