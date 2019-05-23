import basis from 'utils/basis'

const needSub = [3, 4, 5, 7]
const parse = data => {
  let pd = { ...data }
  let amount = data.amount + ''
  if (needSub.indexOf(pd.type) >= 0) {
    if (amount.indexOf('-') < 0) amount = '-' + amount
  }
  pd.amount = basis.fixMoney(amount) + '元'
  return pd
}
export default { parse }
