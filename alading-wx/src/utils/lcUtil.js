// 1.首页频道 mini_pindao_01-xx
const channel = data => 'mini_pindao_' + data.tabId
// 2.首页信息流 mini_ihome_feeds
const homes = 'mini_ihome_feeds'
// 3.分类页 mini_category_id
const category = id => 'mini_category_' + id
// 4.订单详情 mini_myorder
const order = 'mini_myorder'
// 5.我的页面推荐 mini_myfeeds
const mine = 'mini_myfeeds'
// 6.搜索结果 mini_search
const search = 'mini_search'
// 7.可视化
const visualization = id => 'mini_' + id

export default { channel, homes, category, order, mine, search, visualization }
