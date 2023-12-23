import moment from 'moment'
export default {
  methods: {
    $formatDateTime(val, fm) {
      // moment().format('MMMM Do YYYY, h:mm:ss a'); // October 29th 2019, 4:27:00 pm
      // moment().format('dddd');                    // Tuesday
      // moment().format("MMM Do YY");               // Oct 29th 19
      // moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
      // moment().format();
      try {
        if (fm) {
          return moment(val).format(fm)
        }else {
            return moment(val).format('MMM Do YY')
        }

      } catch (e) {
        return '---'
      }
    },
    $formatTimeToDay(numberOfHours) {
      if (!numberOfHours || typeof numberOfHours !== 'number') {
        return 'N/A'
      }
      const day = 24,
        m = 60
      let Days = Math.floor(numberOfHours / day)
      let Remainder = numberOfHours % day
      let Hours = Math.floor(Remainder)
      let Minutes = Math.floor(m * (Remainder - Hours))

      let str_days = Days > 0 ? Days + 'd ' : ''
      let str_hours = Hours > 0 ? Hours + 'h ' : ''
      let str_minutes = Minutes > 0 ? Minutes + 'm ' : ''

      return str_days + str_hours + str_minutes
      // return({"Days":Days,"Hours":Hours,"Minutes":Minutes})
    },
    $$diffTimeByMs({ start, end }) {
      try {
        let diff = moment(end).unix() - moment(start).unix()
        return moment.utc(diff).format('HH:mm:ss.SSS')
      } catch (e) {
        return 'N/A'
      }
    },
    $$diffTimeByDateTime({ start, end }) {
      try {
        let diff1 = moment(end) - moment(start)
        // return moment(diff).format("HH:mm:ss.SSS")

        // return moment(diff).format("HH:mm:ss.SSS")
        let diff = moment(end).diff(moment(start)) // 1
        return this.$formatTimeToDay(diff)
      } catch (e) {
        return 'N/A'
      }
    },
    $$momentGetMonth({ date }) {
      return moment(new Date(date)).month() + 1
    },
    $$momentGetWeek({ date }) {
      return moment(new Date(date)).week()
    },
    $$momentGetYear({ date }) {
      return moment(new Date(date)).year()
    },
    $$enumerateDaysBetweenDates({ startDate, endDate }) {
      let dates = []
      let currDate = moment(startDate).startOf('day')
      let lastDate = moment(endDate).startOf('day')
      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push({
          date: currDate.clone(),
          str_date: currDate.clone().format('YYYY-MM-DD'),
          month: currDate.clone().month() + 1,
          week: currDate.clone().week(),
          year: currDate.clone().year()
        })
      }
      return dates
    },
    $$startEndCurrentTypeDate({ type = 'week' }) {
      // week | month | year
      let startDate = moment()
          .startOf(type)
          .format('YYYY-MM-DD'),
        endDate = moment()
          .endOf(type)
          .format('YYYY-MM-DD')
      return { startDate, endDate, type }
    }
  },
  filters: {
    $$formatDate(val) {
      try {
        return moment(val).format('MMM Do YY')
      } catch (e) {
        return '---'
      }
    },
    $$formatTime(val) {
      // moment().format('MMMM Do YYYY, h:mm:ss a'); // October 29th 2019, 4:27:00 pm
      // moment().format('dddd');                    // Tuesday
      // moment().format("MMM Do YY");               // Oct 29th 19
      // moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
      // moment().format();
      try {
        return moment(val).format('HH:mm a')
      } catch (e) {
        return '---'
      }
    },
    $formatFullDate(val) {
      // moment().format('MMMM Do YYYY, h:mm:ss a'); // October 29th 2019, 4:27:00 pm
      // moment().format('dddd');                    // Tuesday
      // moment().format("MMM Do YY");               // Oct 29th 19
      // moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
      // moment().format();
      try {
          return moment(val).format('MMM Do YY, h:mm:ss a')
      } catch (e) {
        return 'N/A'
      }
    }
  }
}
