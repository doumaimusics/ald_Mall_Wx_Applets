/**
 * 拼团路由
 */

// 主页
const index = {
  path: '/pcollage/pages/index/index',
  // name: 'index',
  subPackage: true,
  config: {
    navigationBarTitleText: '爱上街拼团',
    enablePullDownRefresh: true
  }
}

// 商品详情
const detailGoods = {
  path: '/pcollage/pages/detail/goods/detailGoods',
  name: 'detailGoods',
  subPackage: true,
  config: {
    navigationBarTitleText: '商品详情',
    enablePullDownRefresh: true
  }
}

// 确认订单
const orderConfirm = {
  path: '/pcollage/pages/order/orderConfirm',
  name: 'orderConfirm',
  subPackage: true,
  config: {
    navigationBarTitleText: '确认订单'
  }
}

// 团购去分享
const collageToShare = {
  path: '/pcollage/pages/collage/collageToShare',
  name: 'collageToShare',
  subPackage: true,
  config: {
    navigationBarTitleText: '团购',
    enablePullDownRefresh: true
  }
}
// 打开分享页
const share = {
  path: '/pcollage/pages/collage/share',
  name: 'share',
  subPackage: true,
  config: {
    navigationBarTitleText: '爱上街',
    enablePullDownRefresh: true
  }
}

// 订单详情
const detailOrder = {
  path: '/pcollage/pages/detail/order/detailOrder',
  name: 'detailOrder',
  subPackage: true,
  config: {
    navigationBarTitleText: '订单详情'
  }
}

module.exports = [index, detailGoods, orderConfirm, collageToShare, share, detailOrder]
