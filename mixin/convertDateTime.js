// import moment from "moment"

export default {
  methods: {
    convertDateTimeItem(date, isTime = true, isDate = false) {
      if (!date) return null
      let newDate = new Date(date)
      const [year, month, day, hour, minute, second] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(),
        newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
      let day_format = day > 9 ? day : `0${day}`
      let month_format = month > 9 ? month : `0${month}`
      let hour_format = hour > 9 ? hour : `0${hour}`
      let minute_format = minute > 9 ? minute : `0${minute}`
      let second_format = second > 9 ? second : `0${second}`
      if (isTime) {
        return `${day_format}-${month_format}-${year} : ${hour_format}h${minute_format}`
      }
      if (isDate) {
        return `${year}-${month_format}-${day_format} ${hour_format}:${minute_format}:${second_format}`
      }
      return `${day_format}-${month_format}-${year}`
    },
    formatDateTime(date) {
      if (!date) return null
      const newDate = new Date(date)
      const [year, month, day] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()]
      return `${day}/${month}/${year}`
    },
    formatDateDay(date, isTime = true, isDate = false) {
      if (!date) return null
      let newDate = new Date(date)
      const [year, month, day, hour, minute, second] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(),
        newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
      let day_format = day > 9 ? day : `0${day}`
      let month_format = month > 9 ? month : `0${month}`
      let hour_format = hour > 9 ? hour : `0${hour}`
      let minute_format = minute > 9 ? minute : `0${minute}`
      let second_format = second > 9 ? second : `0${second}`
      if (isTime) {
        return `${day_format}/${month_format}/${year}  ${hour_format}:${minute_format}`
      }
      if (isDate) {
        return `${year}-${month_format}-${day_format} ${hour_format}:${minute_format}:${second_format}`
      }
      return `${day_format}-${month_format}-${year}`
    },
    getDateTime(date,) {
      if (!date) return null
      let [date1,time] = date.split(' ')
      const [year, month, day] = date1.split('-')
      let second = '00';
      let hour = '00';
      let minute = '00';
      if (time.split(':').length >= 3){
        [hour, minute,second] = time.split(':')
      }
      if (time.split(':').length < 3){
        [hour, minute] = time.split(':')
      }
      return [year,month-1,day,hour,minute,second]
    },
    convertGMT7ToUTC: (gmtDateString) => { //gmtDateString format: yyyy-mm-dd
      // Tạo đối tượng Date từ chuỗi ngày ở GMT+7 (ví dụ: "2024-10-02")
      const localDate = new Date(gmtDateString + "T00:00:00+07:00")

      // Lấy thời gian UTC dưới dạng chuỗi
      const utcDateString = localDate.toISOString().replace('T', ' ').substring(0, 19)

      return utcDateString
    },
    convertUTCToGMT7: (utcDateString) => {
      if (!utcDateString) {
        return null
      }
      // Tạo đối tượng Date từ chuỗi UTC (ví dụ: "2024-10-01T17:00:00Z")
      const localDate = new Date(utcDateString)

      // Chuyển đối tượng Date sang chuỗi với định dạng "YYYY-MM-DD HH:mm:ss"
      const year = localDate.getFullYear()
      const month = String(localDate.getMonth() + 1).padStart(2, '0')
      const day = String(localDate.getDate()).padStart(2, '0')
      const hours = String(localDate.getHours()).padStart(2, '0')
      const minutes = String(localDate.getMinutes()).padStart(2, '0')
      const seconds = String(localDate.getSeconds()).padStart(2, '0')

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    addNDay: (dateString, n) => {//dateString format: yyyy-mm-dd
      const date = new Date(dateString)
      date.setDate(date.getDate() + n)

      // Chuyển đổi lại thành chuỗi theo định dạng "YYYY-MM-DD"
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng trong JS bắt đầu từ 0
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    },
    // formatToVNTime: (timeString) => {
    //   return moment(timeString).format('HH:mm DD/MM/YYYY')
    // }
  }
}
