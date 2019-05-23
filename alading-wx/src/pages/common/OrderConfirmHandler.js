import goodsTool from 'utils/goodsTool'

const FULL_SUB_TYPE = {
  AMOUNT: 'AMOUNT', // 满N元减M元,
  AMOUNTCOUNT: 'AMOUNTCOUNT', // N元任选M件,
  COUNTDISCOUNT: 'COUNTDISCOUNT', // 满N件打M折,
  AMOUNTDISCOUNT: 'AMOUNTDISCOUNT', // 满N元打M折,
  COUNTAMOUNT: 'COUNTAMOUNT', // 满N件减M件,
  COUNT: 'COUNT', // 满N件减M元,
  PERAMOUNT: 'PERAMOUNT' // 每满N元减M元
}

function sum(a, b) {
  return a + b
}

function merge(a, b) {
  return [...a, ...b]
}

export default class OrderConfirmHandler {
  constructor(data) {
    this._shopData = {}
    this._shopDataList = []
    this._dataHandler(data)
  }

  get shopDataList() {
    return this._shopDataList
  }

  /**
   * 商品数量总和
   */
  get goodsTotalNum() {
    let list = this.shopDataList.map(shopData => shopData.totalNum)
    return list.reduce(sum)
  }

  /**
   * 商城价格总和
   */
  get goodsTotalPrice() {
    let list = this.shopDataList.map(shopData => {
      return goodsTool.calcTotal(shopData)
    })
    return list.reduce(sum)
  }

  /**
   * 运费总和
   */
  get expressTotal() {
    let list = this.shopDataList.map(shopData => shopData.express)
    return list.reduce(sum)
  }

  /**
   * 取得运费接口的参数
   */
  get expressGoodsInfo() {
    let list = this.shopDataList.map(shopData => {
      let goodsList = shopData.goodsList
      let innerList = goodsList.map(goodsData => {
        let { goodsId, priceId: goodsPriceId, goodsNum: count } = goodsData
        return { goodsId, goodsPriceId, count }
      })
      return innerList
    })
    list = list.reduce(merge)
    return list
  }

  /**
   * 取得取可用优惠券列表对应的上传参数
   */
  get agencyCouponListParams() {
    if (!this._agencyCouponListParams) {
      this._agencyCouponListParams = this.shopDataList.map(shopData => this.getShopDataAgencyCouponListParams(shopData))
    }
    return this._agencyCouponListParams
  }
  /**
   * 取得所有选中的商城店铺优惠券id
   */
  get agencyChooseCouponIdList() {
    let list = this.shopDataList.map(shopData => {
      let id = -1
      let { chooseIndex, couponList } = shopData
      if (chooseIndex >= 0 && couponList && couponList.length) {
        let couponData = couponList[chooseIndex]
        if (couponData) id = couponData.rid
      }
      return id
    })
    list = list.filter(id => id >= 0)
    return list
  }
  /**
   * 所以商城店铺的goodsInfo数据
   */
  get allShopDataGoodsInfo() {
    if (!this._allShopDataGoodsInfo) {
      let list = this.shopDataList.map(shopData => {
        return shopData.goodsList.map(goodsData => {
          let shopId = this._transShopId(shopData.rid)
          let { activityId, goodsId, priceId: goodsPriceId, goodsNum: count, goodsName, lc, shoppingCartId } = goodsData
          return { shopId, activityId, goodsId, goodsPriceId, count, goodsName, lc, shoppingCartId }
        })
      })
      this._allShopDataGoodsInfo = list.reduce(merge)
    }
    return this._allShopDataGoodsInfo
  }
  /**
   * 取得平台可用优惠券列表的上传参数
   */
  get platformAgencyCouponListParams() {
    let list = this.agencyCouponListParams
    list = list.map(data => data.goodsInfo)
    let goodsInfo = list.reduce(merge)
    // 总运费
    let freightTotal = this.expressTotal
    // 店铺使用的优惠券
    let couponIdList = this.agencyChooseCouponIdList
    let shopCouponId = couponIdList.join(',')
    return { freightTotal, shopCouponId, goodsInfo }
  }

  getShopDataAgencyCouponListParams(shopData) {
    let goodsInfo = shopData.goodsList.map(goodsData => {
      let { actualAmount, goodsId } = goodsData
      return { actualAmount, goodsId }
    })
    let shopId = this._transShopId(shopData.rid)
    return { goodsInfo, shopId }
  }

  /**
   * 加入运费
   */
  putExpress(expressData) {
    let storeShop = expressData.afStoreShopDtos
    let shopExressData = {}
    storeShop.forEach(store => {
      let { rid, expressFee } = store
      shopExressData[rid] = expressFee
    })
    this.shopDataList.forEach(shopData => {
      let express = shopExressData[shopData.rid]
      if (!express) express = 0
      shopData.express = express
    })
  }

  // 处理传入的数据
  _dataHandler(data) {
    if (data.source === 'shoppingCart') {
      let list = data.validGoodsList
      this.validGoodsList = list.filter(data => {
        let afShopStoreDto = data.afShopStoreDto
        return afShopStoreDto.rid !== -2
      })
      this._parseGoodsList()
    } else if (data.source === 'goodsDetail') {
      this._parseGoodsDetail(data)
    }
  }

  // 解析goods list数据为order confirm可用的数据
  _parseGoodsList() {
    let list = this._filterCheckedGoods()
    this._initShopData(list)
    this._fullSubHandler(list)
    // 清空没有商品的店铺
    list = this._clearEmptyShop(list)
    // 转换店铺的数据结构
    this._shopDataList = this._parseShopData(list)
  }

  // 过滤出选择的有库存的商品
  _filterCheckedGoods() {
    let result = this.validGoodsList.map(value => {
      let { afShoppingCartGoods, afShopStoreDto } = value
      afShoppingCartGoods = afShoppingCartGoods.map(innerValue => {
        let list = innerValue.goodsList
        let goodsList = list.filter(goodsData => {
          return goodsData.stock && goodsData.isChecked
        })
        let data = { goodsList }
        if (innerValue.fullSubActivityInfo) {
          data.fullSubActivityInfo = innerValue.fullSubActivityInfo
        }
        return data
      })
      afShoppingCartGoods = afShoppingCartGoods.filter(innerValue => {
        return innerValue.goodsList.length
      })
      return { afShoppingCartGoods, afShopStoreDto }
    })
    return result
  }

  // 初始化shop data
  _initShopData(list) {
    list.forEach(shopData => {
      let afShopStoreDto = shopData.afShopStoreDto
      this._shopData[afShopStoreDto.rid] = shopData
    })
  }

  _getGoodsListPriceList(goodsList) {
    return goodsList.map(goodsData => goodsData.priceAmount * goodsData.goodsNum)
  }

  // 计算一个商品列表的价格总和
  _calcGoodsListTotalPrice(goodsList) {
    let list = this._getGoodsListPriceList(goodsList)
    return list.reduce(sum)
  }

  // 计算一个商品列表的数量总和
  _calcGoodsListTotalNum(goodsList) {
    let list = goodsList.map(goodsData => goodsData.goodsNum)
    return list.reduce(sum)
  }

  // 取得商品列表单个商品的价格列表
  _getGoodsListPerPriceList(goodsList) {
    let list = goodsList.map(goodsData => {
      let { priceAmount, goodsNum } = goodsData
      let innerList = []
      while (goodsNum > 0) {
        innerList.push(priceAmount)
        goodsNum--
      }
      return innerList
    })
    return list.reduce(merge)
  }

  _calcPriceMost(goodsList, amount, sort) {
    let priceList = this._getGoodsListPerPriceList(goodsList)
    priceList.sort(sort)
    return priceList.slice(0, amount).reduce(sum)
  }

  // 计算一个商品列表中指定数量商品价格之和的最高值
  _calcMostConcessionsPrice(goodsList, amount) {
    return this._calcPriceMost(goodsList, amount, (a, b) => b - a)
  }

  // 计算一个商品列表中指定数量商品价格之和的最低值
  _calcCheapestTotalPrice(goodsList, amount) {
    return this._calcPriceMost(goodsList, amount, (a, b) => a - b)
  }

  // 按商品价格平摊优惠金额
  _averSub(goodsList, discountAmount, priceList = null, total = null) {
    if (!priceList) priceList = this._getGoodsListPriceList(goodsList)
    if (!total) total = priceList.reduce(sum)
    priceList.forEach((price, index) => {
      let aver = (price / total) * discountAmount
      let goodsData = goodsList[index]
      goodsData.fullSub = aver
    })
  }

  // 折扣优惠计算
  _discountSub(goodsList, discountAmount) {
    goodsList.forEach(goodsData => {
      goodsData.fullSub = (goodsData.priceAmount * goodsData.goodsNum * (10 - discountAmount)) / 10
    })
  }

  _fullSubAmount(fullSubActivityInfo, goodsList) {
    // 满N元减M元
    let list = this._getGoodsListPriceList(goodsList)
    let total = list.reduce(sum)
    let { actDiscountAmount, threshold } = fullSubActivityInfo
    if (total >= threshold) {
      this._averSub(goodsList, actDiscountAmount, list, total)
    }
  }

  _fullSubAmountCount(fullSubActivityInfo, goodsList) {
    // N元任选M件
    let priceList = this._getGoodsListPriceList(goodsList)
    // discountAmount 任选商品数量 threshold 满减值
    let total = this._calcGoodsListTotalNum(goodsList)
    let priceTotal = priceList.reduce(sum)

    let { discountAmount, threshold, actDiscountAmount } = fullSubActivityInfo
    if (total >= discountAmount && priceTotal >= threshold) {
      console.log('amount count', actDiscountAmount)
      this._averSub(goodsList, actDiscountAmount, priceList, priceTotal)
    }
  }

  _fullSubCountDiscount(fullSubActivityInfo, goodsList) {
    // 满N件打M折
    let total = this._calcGoodsListTotalNum(goodsList)
    let { actDiscountAmount, threshold } = fullSubActivityInfo
    if (total >= threshold) {
      this._averSub(goodsList, actDiscountAmount)
    }
  }

  _fullSubAmountDiscount(fullSubActivityInfo, goodsList) {
    // 满N元打M折
    let total = this._calcGoodsListTotalPrice(goodsList)
    let { actDiscountAmount, threshold } = fullSubActivityInfo
    if (total >= threshold) {
      this._averSub(goodsList, actDiscountAmount)
    }
  }

  _fullSubCountAmount(fullSubActivityInfo, goodsList) {
    // 满N件减M件
    let total = this._calcGoodsListTotalNum(goodsList)
    let { actDiscountAmount, threshold } = fullSubActivityInfo
    if (total >= threshold) {
      // discountAmount = this._calcCheapestTotalPrice(goodsList, discountAmount)
      this._averSub(goodsList, actDiscountAmount)
    }
  }

  _fullSubCount(fullSubActivityInfo, goodsList) {
    // 满N件减M元
    let total = this._calcGoodsListTotalNum(goodsList)
    let { actDiscountAmount, threshold } = fullSubActivityInfo
    if (total >= threshold) {
      this._averSub(goodsList, actDiscountAmount)
    }
  }

  _fullSubPeramount(fullSubActivityInfo, goodsList) {
    // 每满N元减M元
    let list = this._getGoodsListPriceList(goodsList)
    let total = list.reduce(sum)
    let { actDiscountAmount, threshold } = fullSubActivityInfo
    if (total >= threshold) {
      console.log('peramount', actDiscountAmount)
      // discountAmount = Math.floor(total / threshold) * discountAmount
      this._averSub(goodsList, actDiscountAmount, list, total)
    }
  }

  _fullSubHandler(list) {
    let newShopList = []
    list.forEach(value => {
      let { afShoppingCartGoods, afShopStoreDto } = value
      afShoppingCartGoods.forEach(innerValue => {
        let { fullSubActivityInfo, goodsList } = innerValue
        if (fullSubActivityInfo) {
          let type = fullSubActivityInfo.type
          switch (type) {
            case FULL_SUB_TYPE.AMOUNT:
              this._fullSubAmount(fullSubActivityInfo, goodsList)
              break
            case FULL_SUB_TYPE.AMOUNTCOUNT:
              this._fullSubAmountCount(fullSubActivityInfo, goodsList)
              break
            case FULL_SUB_TYPE.COUNTDISCOUNT:
              this._fullSubCountDiscount(fullSubActivityInfo, goodsList)
              break
            case FULL_SUB_TYPE.AMOUNTDISCOUNT:
              this._fullSubAmountDiscount(fullSubActivityInfo, goodsList)
              break
            case FULL_SUB_TYPE.COUNTAMOUNT:
              this._fullSubCountAmount(fullSubActivityInfo, goodsList)
              break
            case FULL_SUB_TYPE.COUNT:
              this._fullSubCount(fullSubActivityInfo, goodsList)
              break
            case FULL_SUB_TYPE.PERAMOUNT:
              this._fullSubPeramount(fullSubActivityInfo, goodsList)
              break
          }
          if (afShopStoreDto.rid === -3) {
            // 跨店铺
            goodsList.forEach(goodsData => {
              let { shopId: rid, shopName } = goodsData
              // 这应该是一个跨店铺的活动
              let shopData = this._shopData[rid]
              if (shopData) {
                let afShoppingCartGoods = shopData.afShoppingCartGoods
                let goodsList = [goodsData]
                afShoppingCartGoods.push({ goodsList })
              } else {
                let goodsList = [goodsData]
                let afShoppingCartGoods = [{ goodsList }]
                let afShopStoreDto = { rid, shopName }
                let newShopData = { afShopStoreDto, afShoppingCartGoods }
                this._shopData[rid] = newShopData
                newShopList.push(newShopData)
              }
            })
            innerValue.goodsList = []
          }
        }
      })
    })
    // 加入新增的shopData
    list.push(...newShopList)
  }

  _clearEmptyShop(list) {
    return list.filter(shopData => {
      let afShoppingCartGoods = shopData.afShoppingCartGoods
      afShoppingCartGoods = afShoppingCartGoods.filter(data => data.goodsList.length)
      shopData.afShoppingCartGoods = afShoppingCartGoods
      return afShoppingCartGoods.length
    })
  }

  // 计算商品列表的优惠总值
  _calcGoodsListTotalFullSub(goodsList) {
    console.log('calc total full sub', goodsList)
    let list = goodsList.map(goodsData => goodsData.fullSub)
    list = list.filter(value => value)
    if (!list.length) return 0
    return list.reduce(sum)
  }

  // 精确计算值
  _refinedCalc(value1, value2, bit = 3) {
    let mul = 10 ** bit
    let result = Math.round(value1 * mul + value2 * mul) / mul
    return result
  }

  // 预先计算出所有商品的真实付款
  _calcGoodsAcutalAmount(goodsList) {
    goodsList.forEach(goodsData => {
      let actualAmount = goodsData.priceAmount * goodsData.goodsNum
      if (goodsData.fullSub) {
        actualAmount = this._refinedCalc(actualAmount, -goodsData.fullSub)
      }
      goodsData.actualAmount = actualAmount
    })
  }

  // 转换购物车店铺的数据结构
  _parseShopData(list) {
    return list.map((shopData, index) => {
      let { afShoppingCartGoods, afShopStoreDto } = shopData
      let { rid, shopName } = afShopStoreDto

      // 合并goodslist
      let goodsList = afShoppingCartGoods.map(shopGoodsData => shopGoodsData.goodsList)
      goodsList = goodsList.reduce(merge)

      return this._parseToShopData({ goodsList, index, rid, shopName })
    })
  }

  _parseGoodsDetail(data) {
    let { goodsInfo, goodsSpec, storeShopDto, discountData } = data
    let { goodsId, activityId, goodsIcon, goodsName } = goodsInfo
    let { goodsNum, goodsSpecId: priceId, speDetail: propertyValueNames, goodsPrice: priceAmount } = goodsSpec
    let fullSub = discountData.allDiscountAmout
    let goodsData = {
      goodsId,
      activityId,
      goodsIcon,
      goodsName,
      priceAmount,
      goodsNum,
      priceId,
      propertyValueNames,
      fullSub
    }
    let goodsList = [goodsData]

    if (!storeShopDto) storeShopDto = { rid: -1, shopName: '爱上街商城' }
    let { rid, shopName } = storeShopDto
    let shopData = this._parseToShopData({ goodsList, index: 0, rid, shopName })
    this._shopDataList = [shopData]
  }

  _parseToShopData({ goodsList, index, rid, shopName }) {
    // 预先计算出所有商品的真实付款
    this._calcGoodsAcutalAmount(goodsList)

    let totalPrice = this._calcGoodsListTotalPrice(goodsList)
    let totalNum = goodsList.length
    let totalFullSub = this._calcGoodsListTotalFullSub(goodsList)
    let couponList = []
    let chooseIndex = 0
    let useCouponAmount = 0
    let express = 0
    return {
      index,
      goodsList,
      rid,
      shopName,
      totalPrice,
      totalNum,
      totalFullSub,
      couponList,
      chooseIndex,
      useCouponAmount,
      express
    }
  }

  _transShopId(id) {
    if (id === -1) id = 0
    return id
  }
}
