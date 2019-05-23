const cancelNew = {
  title: '要放弃拼单吗',
  content: '拼单一旦取消，无法恢复<br/>限时低价不等人',
  btnTitles: ['确认取消', '立即支付'],
  btnActions: ['cancel', 'pay']
}

const cancelShare = {
  title: '暂时无发取消订单',
  content: '发起拼单24小时后，若未成团<br/>将自动取消订单并退款',
  btnTitles: ['知道了'],
  btnActions: ['ok']
}

const deleleInfo = {
  title: '是否删除拼团订单',
  btnTitles: ['取消', '确认删除'],
  btnActions: ['del-cancel', 'del-ok']
}

export default { cancelNew, cancelShare, deleleInfo }
