import curry from 'lodash/fp/curry'
import compose from 'lodash/fp/compose'

const tabbarNames = ['首页', '领金币', '分类', '我的', '购物车']
// 默认Tabbar
const defaultTabbarConfigs = [
  {
    index: 0,
    visible: true,
    key: 'Home'
  },
  {
    index: 1,
    visible: false,
    key: 'GoldCoin',
    checkVisible: true
  },
  {
    index: 2,
    visible: true,
    key: 'Category'
  },
  {
    index: 4,
    visible: true,
    key: 'ShoppingCart'
  },
  {
    index: 3,
    visible: true,
    key: 'Mine'
  }
]

// 返回是否为购物车
const isShoppingCart = key => key === 'ShoppingCart'

const filterKeys = curry((keys, key) => keys.filter(k => k.indexOf(key) >= 0))
const headUpper = str => str.substr(0, 1).toUpperCase() + str.substr(1)
const minix = curry((source, obj, key, keys) => {
  if (!keys.length) return []
  let filterKey = headUpper(key)
  let findKeys = filterKeys(keys, filterKey)
  if (findKeys.length) obj[key] = source[findKeys[0]]
  return keys
})
const toCheckVisible = curry((obj, keys) => {
  if (obj.checkVisible) {
    obj.visible = keys.length > 0
  }
  return keys
})

const getTabbarConfigs = (configs, infor) => {
  if (!configs.length) {
    configs = [...defaultTabbarConfigs]
  }

  let minixSource = minix(infor)
  let findConfig = compose(
    filterKeys,
    Object.keys
  )
  let toFindKeys = findConfig(infor)

  configs.map(item => {
    item.desc = tabbarNames[item.index]
    let minixObj = minixSource(item)
    let minixStatus = compose(
      minixObj('selected'),
      minixObj('nomal')
    )
    let toMinix = compose(
      minixStatus,
      toCheckVisible(item),
      toFindKeys
    )
    toMinix(item.key)
  })
  return configs
}

export default {
  tabbarNames,
  isShoppingCart,
  getTabbarConfigs
}
