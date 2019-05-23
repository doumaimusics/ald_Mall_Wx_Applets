export const style = {
  // 总是显示
  always: 'always',
  // 自动智能判断显示
  auto: 'auto'
}
export const visible = (s, check) => {
  if (s === style.auto) {
    return check()
  }
  return true
}
export default { style, visible }
