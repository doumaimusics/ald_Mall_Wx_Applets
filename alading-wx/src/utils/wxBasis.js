const getClickCurrent = event => {
  let target = event.currentTarget
  return target.dataset.current
}
const getInputValue = event => {
  let target = event.target
  return target.value
}
// 取得event.detail
const getDetail = event => {
  return event.mp.detail
}
export default { getClickCurrent, getInputValue, getDetail }
