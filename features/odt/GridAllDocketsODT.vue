<template>
  <div>
    <SlickGrid
      v-bind="options || {}"
      count-label-singular="Docket"
      count-label-many="Dockets"
      :end-point="`/api/dockets/`"
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      :attributes="reduceAttributes"
      :include-params="includeParams"
      no-link-detail
      bus-event-hover-cell="hoverCaseName"
      event-end-by-field="latest_filed_date"
      event-start-by-field="latest_filed_date"
      event-name-by-field="case_name"
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'

import {
  LAYOUT_TYPES,
  TYPE_ODT_SEARCH,
} from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import mxAttributesDockets, {
  fieldsDocketsTracker,
} from '~/features/odt/mixins/mxAttributesDockets'
const { CapacityAs, TimeMetrics, DocketInformation } = ROUTES.DocketTracker
export default {
  name: 'GridAllDocketsODT',
  components: { SlickGrid },
  filters: {
    $$arrToString,
  },
  data() {
    return {
      includesView: [
        LAYOUT_TYPES.SUNBURST.TYPE,
        LAYOUT_TYPES.PARALLEL.TYPE,
        LAYOUT_TYPES.CALENDAR_HEAT_MAP.TYPE,
        LAYOUT_TYPES.TREE_MAP.TYPE,
      ],
    }
  },
  props: {
    type: {
      default: () => TYPE_ODT_SEARCH.RECAP,
    },
    height: {
      default: () => `${80}vh`,
    },
    includeParams: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  mixins: [mxAttributesDockets],
  computed: {
    reduceAttributes() {
      let { attributes } = this
      let { query } = this.$route
      let _by = query['by']
      let isInformation = _by === DocketInformation.path
      let isTimeMetrics = _by === TimeMetrics.path
      let isCapacityAs = _by === CapacityAs.path
      let fieldsIn = [
        fieldsDocketsTracker.case_name.name,
        fieldsDocketsTracker.docket_number.name,
        fieldsDocketsTracker.date_created.name,
        fieldsDocketsTracker.first_filed_date.name,
        fieldsDocketsTracker.latest_filed_date.name,
        fieldsDocketsTracker.nature_of_suit.name,
        fieldsDocketsTracker.cause.name,
        fieldsDocketsTracker.court.name,
        fieldsDocketsTracker.docket_type.name,
      ]
      let fieldsTime = [
        fieldsDocketsTracker.case_name.name,
        fieldsDocketsTracker.docket_length.name,
        fieldsDocketsTracker.time_since_latest_docket_activity.name,
        fieldsDocketsTracker.time_since_first_filed.name,
        fieldsDocketsTracker.total_known_docket_entries.name,
        fieldsDocketsTracker.data_completeness.name,
      ]

      let fieldsCap = [
        fieldsDocketsTracker.case_name.name,
        fieldsDocketsTracker.parties.name,
        fieldsDocketsTracker.out_comes.name,
        fieldsDocketsTracker.judge.name,
      ]
      let fieldsCompare = []
      if (isTimeMetrics) {
        fieldsCompare = fieldsTime
      } else if (isCapacityAs) {
        fieldsCompare = fieldsCap
      } else {
        fieldsCompare = fieldsIn
      }
      if (fieldsCompare.length)
        return attributes.filter((attribute) => {
          return fieldsCompare.includes(attribute.name)
        })
      return attributes
    },
  },
}
</script>

<style scoped></style>
