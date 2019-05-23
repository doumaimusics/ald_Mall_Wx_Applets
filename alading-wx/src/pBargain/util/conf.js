/**
 * Created by huangyilu on 2018/11/30.
 * icon 集合
 */

const baseImgUrl = 'https://img.51fanbei.com'

// 砍价主页头部图片
const indexBgImg = baseImgUrl + '/h5/weChat/cj_lit_bg_top.png'

// 砍价底部 tab 图片
const indexTabImg = {
  bargain: [baseImgUrl + '/h5/weChat/cj_tab_bargain_y.png', baseImgUrl + '/h5/weChat/cj_tab_bargain_g.png'],
  raiders: [baseImgUrl + '/h5/weChat/cj_tab_gl_y.png', baseImgUrl + '/h5/weChat/cj_tab_gl_g.png'],
  mine: [baseImgUrl + '/h5/weChat/cj_tab_mine_y.png', baseImgUrl + '/h5/weChat/cj_tab_mine_g.png']
}

// 商品限购提示 2 弹窗提示 3 toast提示
const GOODSLIMITINFO = {
  // 可以选购
  FO_BUY_YES: 1,
  // 同时最多发起N个
  FO_INT_LIMIT: 2,
  // 未登录
  FO_NOT_LOGIN: 3,
  // 每周最多发起N个
  FO_WEEK_LIMIT: 3,
  // 商品达到限购数量
  FO_QUOTA_NUM: 3,
  // 该商品正在助力中
  FO_INT_HELP: 3
}

export default {
  indexBgImg,
  indexTabImg,
  GOODSLIMITINFO
}
