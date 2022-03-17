export function generateTimestamp() {
  const now = new Date()
  const month = now.getMonth() + 1
  const fullMonth = month >= 10 ? month : '0' + month
  const day = now.getDate()
  const fullDay = day >= 10 ? day : '0' + day
  const fullYear = now.getFullYear()
  const hour = now.getHours();
  const fullHour = hour < 10 ? '0' + hour : hour
  const minute = now.getMinutes()
  const fullMinute = minute < 10 ? '0' + minute : minute
  const second = now.getSeconds()
  const fullSecond = second < 10 ? '0' + second : second
  return fullMonth + fullDay + fullYear + ' ' + fullHour + ':' + fullMinute + ':' + fullSecond
}