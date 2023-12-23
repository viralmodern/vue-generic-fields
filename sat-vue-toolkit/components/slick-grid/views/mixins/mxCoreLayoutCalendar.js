import moment from "moment";
import keyBy from "lodash/keyBy"
import { ATTRIBUTE_FIELDS } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
let DATE_FIELDS = [ATTRIBUTE_FIELDS.DATE.TYPE, ATTRIBUTE_FIELDS.DATE_TIME.TYPE]
function getLabelAttribute(attribute) {
  try {
    return attribute['name']
  }catch (e) {
    return ''
  }
}
export const layoutCalendarMixin = {
  computed: {
    getEventsFiledBy() {
      let {
        fieldByFieldStart,
        fieldByFieldEnd,
        mainCellId,
        eventNameByField,
        eventEndByField,
        eventStartByField
      } = this
      return {
        // eventName: 'date_filed',
        eventName: eventNameByField || mainCellId,
        // eventStart: eventStartByField ? eventStartByField : getLabelAttribute(fieldByFieldStart),
        eventStart:getLabelAttribute(fieldByFieldStart) || 'start',
        // eventEnd: eventEndByField ? eventEndByField : getLabelAttribute(fieldByFieldEnd),
        eventEnd: getLabelAttribute(fieldByFieldEnd) || 'end',
      }
    },
    combinedEvents () {
      let {
        combinedRowsData,
        colors,
        uniqueId,
        getEventsFiledBy: {
          eventName, eventStart, eventEnd
        }
      } = this

      // let arr = [eventNameByField, eventEndByField, eventStartByField]
      let arr = [eventName, eventStart, eventEnd]
      let isValue = arr.every(v => {
        return Boolean(v)
      })
      if(!isValue) return []
      let events = []
      let eventsByPk = {}
      if(combinedRowsData) {
        if(Array.isArray(combinedRowsData)) {
          let l = [...combinedRowsData]
          events = [...l]
        }else if (typeof combinedRowsData === "object"){
          let values = Object.values({...combinedRowsData})
          values.forEach((value, index) => {
            let results = value['results']
            let resultsByPk = keyBy(results, uniqueId)
            eventsByPk = {...eventsByPk, ...resultsByPk}
            if(index === values.length - 1) {
              events = [...events, ...Object.values(eventsByPk)]
              let d = moment().format('YYYY-MM-DD')
              events = events.map(_evt => {
                let t = {..._evt}
                let start = t[eventStart] || d
                let end = t[eventEnd] || d
                let mm_start = moment(start).format('YYYY-MM-DD')
                let mm_end = moment(end).format('YYYY-MM-DD')
                t[eventStart] = mm_start
                t[eventEnd] = mm_end
                let tName = t[eventName] || '#'
                t[eventName] = tName.toString()
                // t[eventName] = t[eventName] || t[uniqueId]
                return {
                  ...t,
                  timed: false,
                  color: colors[this.rnd(0, colors.length - 1)],
                }
              })
            }
          })
        }
      }
      console.error({ events, eventsByPk })
      return events
    },
    combinedFields() {
      let {fieldsConfig} = this
      return [...fieldsConfig].filter(field => DATE_FIELDS.includes(field.type))
    }
  },
  methods: {
    showEvent ({ nativeEvent, event }) {
      console.error(event)
      this.$emit('clickRow', event)
    },
    viewDay ({ date }) {
      this.value = date
      this.type = 'day'
    },
  }
}
