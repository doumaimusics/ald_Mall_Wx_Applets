import moment from 'moment'

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

const formatDate2 = (timestamp, syear = '-', stime = ':') => {
  let date = timestamp ? new Date(timestamp) : ''
  if (!date) return ''

  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  let t1 = [year, month, day].map(formatNumber).join(syear)
  let t2 = [hour, minute, second].map(formatNumber).join(stime)
  return `${t1} ${t2}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDate(timestamp, formateType = 'YYYY-MM-DD') {
  let mydate = timestamp ? new Date(timestamp) : ''
  if (!mydate) return ''
  return moment(mydate).format(formateType)
}

export default {
  formatNumber,
  formatTime,
  formatDate,
  formatDate2
}
