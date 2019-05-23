// 配置

// 版本, 用于小程序内部版本控制
const VERSION = 218
// app的版本号
const VERSION_APP = 441

// url -- base
// const URL_BASE = 'https://app.51fanbei.com'
const URL_BASE = 'https://yapp.51fanbei.com'
// const URL_BASE = 'http://172.20.54.206:80'
// const URL_BASE = 'https://atestapp.51fanbei.com'
// const URL_BASE = 'http://testapp.51fanbei.com'
// const URL_BASE = 'https://dtestapp.51fanbei.com'

// 注意！！！ ctestapp 是 http

// const h5Host = 'https://h5.51fanbei.com'
const h5Host = 'https://yh5.51fanbei.com'
// const h5Host = 'https://atesth5.51fanbei.com'
// const h5Host = 'https://btesth5.51fanbei.com'
// const h5Host = 'https://dtesth5.51fanbei.com'
// const h5Host = 'http://172.25.63.33:8080'

// h5 -- search
const H5_SEARCH = `${h5Host}/h5/searchRoute/searchRoute.html`
// h5 -- add bank card
const H5_ADD_BANK_CARD = `${h5Host}/asj/outH5/addBank'`
// h5 -- shopping cart
const H5_SHOPPING_CART = `${h5Host}/asj/shoppingCart/`

// 超时 -- token
const TIMEOUT_TOKEN = 1

// 拼团假数据最大次数
const COLLAGE_FAKE_MAX_COUNT = 5

export default {
  VERSION,
  VERSION_APP,
  URL_BASE,
  H5_SEARCH,
  H5_ADD_BANK_CARD,
  H5_SHOPPING_CART,
  TIMEOUT_TOKEN,
  COLLAGE_FAKE_MAX_COUNT
}
