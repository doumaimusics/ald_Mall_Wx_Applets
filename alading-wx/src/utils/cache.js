/**
 * 列表缓存
 */
import curry from 'lodash/fp/curry'
import basis from 'utils/basis'

const TIMEOUT = 60
const TIME_LONG = 60 * 60
let pool = {}

/**
 * 生成一个新值
 * @param {Object} data 数据
 * @param {Number} timeout 过期时间，以s为单位(若为-1，表示没有过期时间)
 */
const _create = (data, timeout) => {
  let timeStart = basis.getTimer()
  return { data, timeStart, timeout }
}

/**
 * 判断是否过期(true为过期)
 * @param {Object} node 缓存数据项
 */
const _checkTimout = node => {
  if (node.timeout >= 0) {
    let current = basis.getTimer()
    let cost = (current - node.timeStart) / 1000
    return cost > node.timeout
  }
  return false
}

const _clearProp = curry((f, key, propKey) => {
  if (pool[key]) {
    let d = pool[key]
    f(d, propKey)
  }
})
const _clearMapProp = _clearProp((d, propKey) => delete d[propKey])
const _clearListProp = _clearProp((d, propKey) => (d[propKey] = null))

const _getByKey = curry((f, k) => {
  let d = pool[k]
  if (!d) {
    d = f()
    pool[k] = d
  }
  return d
})
const _getMap = _getByKey(() => {
  return {}
})
const _getList = _getByKey(() => [])

const _getProp = curry((fget, fclear, key, propKey) => {
  let d = fget(key)
  let node = d[propKey]
  if (node) {
    if (_checkTimout(node)) {
      fclear(key, propKey)
      return null
    }
    return node.data
  }
  return null
})
const _getMapProp = _getProp(_getMap, _clearMapProp)
const _getListProp = _getProp(_getList, _clearListProp)

const _pushProp = curry((f, key, propKey, data, timeout) => {
  let node = _create(data, timeout)
  let d = f(key)
  d[propKey] = node
})
const _pushMapProp = _pushProp(_getMap)
const _pushListProp = _pushProp(_getList)

const _cache = curry(async (fget, fpush, key, keyProp, fdata, timeout) => {
  let d = fget(key, keyProp)
  if (!d) {
    d = await fdata()
    fpush(key, keyProp, d, timeout)
  }
  return d
})
const _cacheList = _cache(_getListProp, _pushListProp)
const _cacheMap = _cache(_getMapProp, _pushMapProp)

export default {
  TIMEOUT,
  TIME_LONG,
  list: _cacheList,
  listPush: _pushListProp,
  listGet: _getListProp,
  listClear: _clearListProp,
  map: _cacheMap,
  mapPush: _pushMapProp,
  mapGet: _getMapProp,
  mapClear: _clearMapProp
}
