/**
 * 确认订单状态
 */

// 通常
const NROMAL = 0
// 去拼团
const TO_COLLAGE = 1
// 站内拼团，商品详情页直接参与他人的拼团
const ATTEND_FAST = 2

const statusInfo = status => {
  let info = {}
  switch (status) {
    case ATTEND_FAST:
      info.isAttendFast = true
      break
    case TO_COLLAGE:
      info.isToCollage = true
      break
    default:
      info.isNormal = true
      break
  }
  return info
}

export default { NROMAL, TO_COLLAGE, ATTEND_FAST, statusInfo }
