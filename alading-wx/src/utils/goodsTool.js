const format = item => {
  return {
    goodsId: item.goodsId,
    goodsIcon: item.goodsIcon,
    goodsPics: item.goodsPics,
    activityType: item.activityType,
    activityName: item.activityName,
    activityId: item.activityId,
    saleAmount: item.saleAmount,
    realAmount: item.realAmount,
    priceAmount: item.priceAmount,
    specialPrice: item.specialPrice,
    goodsName: item.goodsName,
    remark: item.remark,
    saleCount: item.saleCount,
    goodsDetail: item.goodsDetail,
    source: item.source,
    goodsLimitCount: item.goodsLimitCount,
    freight: item.freight,
    freightExplanation: item.freightExplanation,
    gmtStart: item.gmtStart,
    gmtEnd: item.gmtEnd,
    gmtPstart: item.gmtPstart,
    discount: item.discount,
    // 最外面的商品库存
    stockCount: item.stockCount,
    // 参加活动的商品限购数量
    limitedPurchase: item.limitedPurchase,
    // 店铺商品
    shopName: item.storeShopDto ? item.storeShopDto.shopName : null,
    // 商品上架状态 PUBLISH上架 CANCEL下架
    status: item.status
  }
}

const calcTotal = shopData => {
  if (shopData) {
    let { totalPrice, totalFullSub, express, useCouponAmount, totalNum } = shopData
    let result = totalPrice + express - totalFullSub - useCouponAmount
    result = Math.round(result * 100) / 100
    let minNeedPay = totalNum * 0.01
    if (result < minNeedPay) result = minNeedPay
    return result
  }
  return 0
}

export default { format, calcTotal }
