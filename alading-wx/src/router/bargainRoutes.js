/**
 * 砍价路由
 */

const index = {
  path: '/pBargain/pages/index',
  // name: 'help',
  subPackage: true,
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: '砍价免费拿'
  }
}
const bargainGoodsDetail = {
  path: '/pBargain/pages/bargainGoodsDetail',
  // name: 'bargainGoodsDetail',
  root: '/pBargain',
  subPackage: true,
  config: {
    navigationBarTitleText: '砍价免费拿'
  }
}
const bargainDetail = {
  path: '/pBargain/pages/bargainDetail',
  // name: 'bargainGoodsDetail',
  root: '/pBargain',
  subPackage: true,
  config: {
    navigationBarTitleText: '砍价免费拿'
  }
}

module.exports = [index, bargainGoodsDetail, bargainDetail]
