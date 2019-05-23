export default class Specs {
  constructor(specsData) {
    this.priceData = specsData.priceData
    this.propertyData = specsData.propertyData
  }
  // 数据有变化
  get hasChange() {
    return this.isEmpty || this.isOnlyOne
  }

  get changeInfo() {
    if (this.isEmpty) return 'empty'
    if (this.isOnlyOne) return 'onlyOne'
    return 'nothing'
  }

  get choose() {
    return this._choose
  }

  get nodes() {
    return this._nodes
  }

  get isOnlyOne() {
    return this._hasStockSpec.length === 1
  }

  get isEmpty() {
    return this._hasStockSpec.length === 0
  }

  get specsInfo() {
    let info = {}
    if (this.isAllset) {
      // 全选了
      let keys = this._findUserChooseIds(false).join(',')
      info = this.priceData.find(value => {
        return value.propertyValueIds === keys
      })
    } else {
      // 选择了部分
      let tip = '请选择'
      this._specsKeys.forEach((value, index) => {
        if (this._choose[value] < 0) {
          tip += ' ' + this.propertyData[index].propertyName
        }
      })
      info.tip = tip
    }
    return info
  }
  // 已选的规格组名
  get selectSpecsInfo() {
    let info = []
    this._specsKeys.forEach((value, index) => {
      let selectId = this._choose[value]
      if (selectId >= 0) {
        let property = this.propertyData[index].propertyValues.find(value => value.propertyValueId === selectId)
        info.push(property.propertyValueName)
      }
    })
    let result = {}
    if (info.length) {
      result.title = '已选'
      result.specs = info.join(',')
    } else {
      result.title = '选择'
      result.specs = '请选择 规格'
    }
    return result
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
      if (stock) this._hasStockSpec.push(ids)
      ids = [...ids].join(',')
      value.propertyValueIds = ids
      result[ids] = stock
    })
    return result
  }

  _mapSpecs(list, deep) {
    if (deep < this._keySize) {
      let ids = this._specs[deep]
      let newList = []
      ids.forEach(id => {
        list.forEach(value => {
          if (typeof value === 'object') {
            value = [...value, id]
          } else {
            value = [value, id]
          }
          newList.push(value)
        })
      })
      return this._mapSpecs(newList, deep + 1)
    } else {
      return list.map(value => {
        if (typeof value === 'object') {
          return value.join(',')
        } else {
          return value
        }
      })
    }
  }
  _reset() {
    // 规格项id数组
    this._specs = []
    // 规格组id数组
    this._specsKeys = []
    // 用户选择
    this._choose = {}
    // 规格类别数量
    this._keySize = this.propertyData.length

    // 有效规格节点
    this._nodes = {}
    // 无库存的规格选择组
    this._emptyPrice = []
    // 有库存的规格
    this._hasStockSpec = []
  }

  _chooseOnlyOne() {
    if (this.isOnlyOne) {
      let specs = this._hasStockSpec[0]
      this._specsKeys.forEach((key, index) => {
        this._choose[key] = +specs[index]
      })
    }
  }

  _initEnableNodes() {
    this._hasStockSpec.map(value => {
      value.forEach(id => (this._nodes[id] = 1))
    })
  }

  _findUserChooseIds(isCheck = true) {
    let ids = []
    this._specsKeys.forEach(key => {
      let id = this._choose[key]
      if (isCheck) {
        if (id >= 0) ids.push(id)
      } else {
        ids.push(id)
      }
    })
    return ids
  }

  // 为propertyData排序
  _sortPropertyData() {
    if (!this.priceData.length) return
    if (this.propertyData.length < 2) return

    let list = this.propertyData.map(value => {
      let ids = value.propertyValues.map(value => value.propertyValueId)
      return { ids, value }
    })
    let firstPrice = this.priceData[0]
    let pricePropertyIds = firstPrice.propertyValueIds
    let ids = pricePropertyIds.split(',').filter(id => id)
    let newList = ids.map(id => {
      let property = list.find((data, index) => {
        let { ids, value } = data
        if (ids.indexOf(+id) >= 0) {
          list.splice(index, 1)
          return value
        }
      })
      return property.value
    })
    this.propertyData = newList
  }
  /**
   * 初始化
   */
  init() {
    this._reset()
    // 为propertyData排序
    this._sortPropertyData()
    // 初始化规格项id列表及用户选择、规格组id数组
    this.propertyData.forEach(value => {
      let ids = value.propertyValues.map(value => value.propertyValueId)
      this._specs.push(ids)
      this._specsKeys.push(value.propertyId)

      let choose = -1
      if (ids.length === 1) {
        choose = ids[0]
      }
      this._choose[value.propertyId] = choose
    })
    // 处理存在的规格选择组
    let ppdata = this._parsePriceData()
    this._initEnableNodes()
    if (this.isEmpty) {
      // 规格为空
    } else if (this.isOnlyOne) {
      // 只有一种规格
      this._chooseOnlyOne()
    } else {
      let apdata = this._mapSpecs(this._specs[0], 1)
      apdata.forEach(value => {
        if (!ppdata[value]) {
          // 库存小于0或不存在的规格
          this._emptyPrice.push((value + '').split(','))
        }
      })
    }
  }

  select(data) {
    this._choose[data.id] = data.valueId
    let result = { ...this._nodes }
    let selectIds = this._findUserChooseIds()
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
