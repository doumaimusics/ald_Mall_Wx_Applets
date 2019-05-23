/**
 * 订单状态
 */
export const status = {
  // 待付款
  NEW: 'NEW',
  // 支付中
  DEALING: 'DEALING',
  // 待付款（实际为支付失败，对用户展示待付款）
  PAYFAIL: 'PAYFAIL',
  // 已支付/待收货
  PAID: 'PAID',
  // 已发货
  DELIVERED: 'DELIVERED',
  // 已完成
  FINISHED: 'FINISHED',
  // 已完成（实际为返利成功）
  REBATED: 'REBATED',
  // 订单关闭
  CLOSED: 'CLOSED',
  // 等待退款
  WAIT_REFUND: 'WAIT_REFUND',
  // 退款中
  DEAL_REFUNDING: 'DEAL_REFUNDING'
}

const statusMsg = {
  PAID: '待发货',
  FINISHED: '订单完成',
  CLOSED: '订单关闭'
}
const statusRemark = {
  PAID: '您的宝贝已经迫不及待想要和您见面了',
  FINISHED: '非常感谢您对爱上街的支持！',
  CLOSED: '超时未支付'
}
// 状态偏移
const statusOffset = {
  // 正常偏移
  success: 1,
  // 订单支付超时
  timeout: 2
}

// 对订单数据进行状态偏移操作
const toStatusOffset = (orderData, offset = statusOffset.success) => {
  let orderStatus = orderData.orderStatus

  let toOrderStatus = orderStatus
  switch (orderStatus) {
    case status.NEW:
      if (offset === statusOffset.success) {
        toOrderStatus = status.PAID
      } else if (offset === statusOffset.timeout) {
        toOrderStatus = status.CLOSED
      }
      break
    case status.DELIVERED:
      toOrderStatus = status.FINISHED
      break
  }

  return {
    orderStatus: toOrderStatus,
    orderStatusMsg: statusMsg[toOrderStatus],
    orderStatusRemark: statusRemark[toOrderStatus]
  }
}

/**
 * 返回状态对应小程序的显示情况
 * @param {String} status 状态
 */
const info = s => {
  let result = {}
  switch (s) {
    case status.NEW:
    case status.PAYFAIL:
      // 待支付
      result.isNew = true
      result.desc = 'new'
      break
    case status.DEALING:
      // 支付中
      result.isDealing = true
      result.desc = 'dealing'
      result.noMenu = true
      break
    case status.PAID:
      // 待发货
      result.isPaid = true
      result.desc = 'paid'
      break
    case status.DELIVERED:
      // 待收货
      result.isDelivered = true
      result.desc = 'delivered'
      break
    case status.FINISHED:
    case status.REBATED:
      // 订单完成
      result.isFinished = true
      result.desc = 'finished'
      break
    case status.WAIT_REFUND:
      // 售后
      result.isWaitRefund = true
      result.desc = 'wait-refund'
      break
    case status.DEAL_REFUNDING:
      // 退款中
      result.isWaitRefunding = true
      result.desc = 'wait-refunding'
      result.noMenu = true
      break
    case status.CLOSED:
      // 订单关闭
      result.isClosed = true
      result.desc = 'closed'
      break
  }
  return result
}

export default {
  status,
  statusMsg,
  statusRemark,
  statusOffset,
  toStatusOffset,
  info
}
