<template>
  <div>
    <SlickGrid
      :attributes="attributes"
      :height="height"
      disabled-add-new-row
      disabled-add-new-column
      no-query-params
    />
  </div>
</template>

<script>
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { fieldsLitigationCalendar } from '~/features/odt/mixins/mxLitigationCalendarOdt'

export default {
  name: 'GridAllLitigationOfDocketTracker',
  components: {
    SlickGrid: () =>
      import(
        /* webpackChunkName: "SlickGrid" */ '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
      ),
  },
  props: {
    height: {
      type: String,
      default: () => `${72}vh`,
    },
    includesFields: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    attributes() {
      let { includesFields } = this
      return [
        ...includesFields,
        {
          ...fieldsLitigationCalendar.date_time,
        },
        {
          ...fieldsLitigationCalendar.calendar_type,
        },
        {
          ...fieldsLitigationCalendar.past_or_future_event,
        },
        {
          ...fieldsLitigationCalendar.how_many_dates_since_events,
        },
        {
          ...fieldsLitigationCalendar.short_description,
        },
        {
          ...fieldsLitigationCalendar.source_entry,
        },
        {
          ...fieldsLitigationCalendar.source_entry_date,
        },
        {
          ...fieldsLitigationCalendar.days_between_event_and_entry_date,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
