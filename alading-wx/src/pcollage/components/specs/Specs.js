export default class Specs {
  _specs = []
  _nodes = {}
  _specsKeys = []
  _emptyPrice = []

  // 有库存的规格
  _hasStockSpec = []
  // 用户选择
  _choose = {}
  // 规格类别数量
  _keySize = 0

  constructor(priceData, propertyData) {
    this.priceData = priceData
    this.propertyData = propertyData
  }

  get choose() {
    return this._choose
  }

  get isOnlyOne() {
    return this._hasStockSpec.length === 1
  }

  get isAllset() {
    return this._specsKeys.every(key => this._choose[key] !== -1)
  }

  _parsePriceData() {
    let result = {}
    this.priceData.forEach(value => {
      let { propertyValueIds, stock } = value
      stock = +stock
      let ids = propertyValueIds.split(',').filter(value => {
        if (value) return value
      })
      if (stock) {
        ids.forEach(id => (this._nodes[id] = 1))
        this._hasStockSpec.push(ids)
      }
      ids = ids.join(',')
      result[ids] = stock
    })
    return result
  }

  _mapPrice(list, deep) {
    if (deep < this._keySize) {
      let ids = this._specs[deep]
      let newList = []
      ids.forEach(id => {
        list.forEach(value => {
          newList.push(value + ',' + id)
        })
      })
      return this._mapPrice(newList, deep + 1)
    } else {
      return list
    }
  }

  init() {
    this._specs = []
    this._choose = {}
    this._specsKeys = []
    this._keySize = this.propertyData.length
    this.propertyData.forEach(value => {
      let ids = value.propertyValues.map(value => value.propertyValueId)
      this._specs.push(ids)

      let choose = -1
      if (ids.length === 1) {
        choose = ids[0]
      }
      this._choose[value.propertyId] = choose
      this._specsKeys.push(value.propertyId)
    })

    this._emptyPrice = []
    this._nodes = {}
    this._hasStockSpec = []
    let ppdata = this._parsePriceData()
    let apdata = this._mapPrice(this._specs[0], 1)
    apdata.forEach(value => {
      if (!ppdata[value]) {
        // 库存小于0或不存在的规格
        this._emptyPrice.push((value + '').split(','))
      }
    })

    if (this.isOnlyOne) {
      let specs0 = this._hasStockSpec[0]
      this._specsKeys.forEach((key, index) => {
        this._choose[key] = +specs0[index]
      })
    }
  }

  update(data = null) {
    let result = { ...this._nodes }
    if (!data) return result

    this._choose[data.id] = data.valueId

    let selectIds = []
    this._specsKeys.forEach(key => {
      if (this._choose[key] >= 0) {
        selectIds.push(this._choose[key])
      }
    })

    if (selectIds.length) {
      // 过滤掉无库存的规格项
      this._emptyPrice.forEach(value => {
        selectIds.forEach(id => {
          let sid = id + ''
          if (value.indexOf(sid) >= 0) {
            // 找到了
            value.forEach(valueId => {
              if (valueId !== sid) {
                result[valueId] = 0
              }
            })
          }
        })
      })
    }

    return result
  }
}
