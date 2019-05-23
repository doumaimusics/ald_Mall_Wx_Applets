// common pages

// 第一步
const tologin = {
  path: '/pages/common/tologin',
  name: 'tologin',
  config: {
    navigationBarTitleText: '自动登录'
  }
}

// 登录
const login = {
  path: '/pages/common/login',
  name: 'login',
  config: {
    navigationBarTitleText: '登录注册'
  }
}
// 注册协议
// const protocal = {
//   path: '/pages/common/protocal',
//   name: 'protocal',
//   config: {
//     navigationBarTitleText: '注册协议'
//   }
// }

// 搜索
const search = {
  path: '/pages/common/search',
  name: 'search',
  config: {
    navigationBarTitleText: '爱上街'
  }
}

// 我的订单
const order = {
  path: '/pages/common/order',
  name: 'order',
  config: {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true
  }
}

// 地址管理
const address = {
  path: '/pages/common/address',
  name: 'address',
  config: {
    navigationBarTitleText: '我的收货地址',
    enablePullDownRefresh: true
  }
}

// 地址编辑
const addressEdit = {
  path: '/pages/common/addressEdit',
  name: 'addressEdit',
  config: {
    navigationBarTitleText: '编辑收货地址'
  }
}

// 地址编辑
const addressAdd = {
  path: '/pages/common/addressAdd',
  name: 'addressAdd',
  config: {
    navigationBarTitleText: '新增收货地址'
  }
}

// 商品详情
const goodsDetail = {
  path: '/pages/common/goodsDetail',
  name: 'goodsDetail',
  config: {
    navigationBarTitleText: '商品详情',
    enablePullDownRefresh: true
  }
}
const goods_detail = {
  path: '/pages/goods_detail',
  name: 'goods_detail',
  config: {
    navigationBarTitleText: '商品详情'
  }
}

// 支付成功
const paySuccess = {
  path: '/pages/common/paySuccess',
  name: 'paySuccess',
  config: {
    navigationBarTitleText: '支付成功'
  }
}

// 确认订单
const orderConfirm = {
  path: '/pages/common/orderConfirm',
  name: 'orderConfirm',
  config: {
    navigationBarTitleText: '确认订单'
  }
}

// 选择优惠券
const couponChoose = {
  path: '/pages/common/couponChoose',
  name: 'couponChoose',
  config: {
    navigationBarTitleText: '选择优惠券'
  }
}

// 我的优惠券
const coupon = {
  path: '/pages/common/coupon',
  name: 'coupon',
  config: {
    navigationBarTitleText: '优惠券'
  }
}

// 订单详情
const orderDetailMine = {
  path: '/pages/common/orderDetailMine',
  name: 'orderDetailMine',
  config: {
    navigationBarTitleText: '订单详情'
  }
}
// 订单详情
const orderDetail = {
  path: '/pages/common/orderDetail',
  name: 'orderDetail',
  config: {
    navigationBarTitleText: '订单详情'
  }
}
// 订单详情
const order_detail = {
  path: '/pages/order_detail',
  name: 'order_detail',
  config: {
    navigationBarTitleText: '订单详情'
  }
}

// 物流信息
const orderLogistics = {
  path: '/pages/common/orderLogistics',
  name: 'orderLogistics',
  config: {
    navigationBarTitleText: '物流信息'
  }
}

/**
 * webview
 * 传入的URL需要经过base64编码，否则会被当成小程序的路由
 * navigate.push({ url: '/pages/webview/index?url=' + Base64.encoder(url) })
 */
const webView = {
  path: '/pages/webview/index',
  name: 'webView',
  config: {
    navigationBarTitleText: '爱上街'
  }
}

// 分类结果页
const classifyResult = {
  path: '/pages/common/classifyResult',
  name: 'classifyResult',
  config: {
    navigationBarTitleText: '分类'
  }
}

module.exports = [
  tologin,
  paySuccess,
  goodsDetail,
  goods_detail,
  orderConfirm,
  coupon,
  couponChoose,
  orderDetailMine,
  orderDetail,
  order_detail,
  webView,
  orderLogistics,
  login,
  search,
  order,
  address,
  addressEdit,
  addressAdd,
  classifyResult
]
