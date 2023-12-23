import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

export const fieldsLitigationCalendar = {
  case_name: {
    name: 'case_name',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    width: 250,
  },
  date_time: {
    name: 'date_time',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
    width: 250,
  },
  calendar_type: {
    name: 'calendar_type',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    list: [
      {
        label: 'Scheduling Order',
        value: 'SO',
      },
      {
        label: 'Order Deadline',
        value: 'OD',
      },
    ],
  },
  past_or_future_event: {
    name: 'past_or_future_event',
    type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
    list: [
      {
        label: 'Past',
        value: 'p',
      },
      {
        label: 'Future',
        value: 'F',
      },
    ],
  },
  how_many_dates_since_events: {
    name: 'how_many_dates_since_events',
    label: 'how many dates since/until events',
    type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
  },
  short_description: {
    name: 'short_description',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  source_entry: {
    name: 'source_entry',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
  },
  source_entry_date: {
    name: 'source_entry_date',
    type: ATTRIBUTE_FIELDS.DATE.TYPE,
  },
  days_between_event_and_entry_date: {
    name: 'days_between_event_and_entry_date',
    type: ATTRIBUTE_FIELDS.TEXT.TYPE,
    sub_type: ATTRIBUTE_FIELDS.TEXT.SUBS_TYPE.TOTAL_DAY,
  },
}
