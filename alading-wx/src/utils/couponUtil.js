import basis from './basis'

const getUseCouponAmount = data => {
  let amount = 0
  let { couponList, chooseIndex } = data
  if (couponList && couponList.length) {
    if (chooseIndex >= 0) {
      amount = couponList[chooseIndex].useCouponAmount
    }
  }
  return amount
}

const getCouponInfo = data => {
  let info = ''
  let { couponList, chooseIndex } = data
  if (couponList && couponList.length) {
    if (chooseIndex < 0) {
      info = `${couponList.length}张可用`
    } else {
      let { useCouponAmount, maxCouponAmount } = data
      let amount = useCouponAmount
      if (maxCouponAmount >= 0) {
        amount = Math.min(useCouponAmount, maxCouponAmount)
      }
      amount = basis.toFix(amount)
      data.useCouponAmount = amount
      info = `已使用1张优惠券，优惠${amount}元`
    }
  }
  return info
}
export default { getUseCouponAmount, getCouponInfo }
