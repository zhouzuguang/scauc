export function toLocalTime (val) {
  let d = new Date(val)
  let year = d.getFullYear()
  let month = change(d.getMonth() + 1)
  let day = change(d.getDate())
  let hour = change(d.getHours())
  let minute = change(d.getMinutes())
  let second = change(d.getSeconds())
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}
// 不够两位的补成两位
function change (t) {
  if (t < 10) {
    return '0' + t
  } else {
    return t
  }
}
