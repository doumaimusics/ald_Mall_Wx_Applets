/**
 * 邀请路由
 */
// 主页
const Index = {
  path: '/pinvite/pages/index',
  name: 'invite',
  subPackage: true,
  config: {
    navigationBarTitleText: '邀请有礼'
  }
}

// 邀请有礼收益
const invitereve = {
  path: '/pinvite/pages/invitereve',
  name: 'invitereve',
  subPackage: true,
  config: {
    navigationBarTitleText: '邀请有礼收益'
  }
}

// 邀请有礼排行榜
const inviterank = {
  path: '/pinvite/pages/inviterank',
  name: 'inviterank',
  subPackage: true,
  config: {
    navigationBarTitleText: '邀请排行榜'
  }
}

// 邀请有礼明细
const invitedetail = {
  path: '/pinvite/pages/invitedetail',
  name: 'invitedetail',
  subPackage: true,
  config: {
    navigationBarTitleText: '邀请明细'
  }
}

// 邀请有礼注册
const invitereg = {
  path: '/pinvite/pages/invitereg',
  name: 'invitereg',
  subPackage: true,
  config: {
    navigationBarTitleText: '邀请有礼注册'
  }
}

// 邀请有礼注册
const showqrcode = {
  path: '/pinvite/pages/showqrcode',
  name: 'showqrcode',
  subPackage: true,
  config: {
    navigationBarTitleText: '生成二维码'
  }
}

// 生成邀请二维码
const createInviterQrcode = {
  path: '/pinvite/pages/createInviterQrcode',
  name: 'createInviterQrcode',
  subPackage: true,
  config: {
    navigationBarTitleText: '生成邀请二维码'
  }
}
// 测试合并图片
// const joinImg = {
//   path: '/pinvite/pages/joinImg',
//   name: 'joinImg',
//   subPackage: true,
//   config: {
//     navigationBarTitleText: '测试'
//   }
// }
module.exports = [Index, invitereve, inviterank, invitedetail, invitereg, showqrcode, createInviterQrcode]
