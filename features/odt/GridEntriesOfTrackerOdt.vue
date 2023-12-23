<template>
  <div>
    <SlickGrid
      no-query-params
      count-label-singular="Entry"
      count-label-many="Entries"
      :end-point="endPoint"
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      :attributes="attrs"
      main-cell-id="entry_number"
    >
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { TYPE_ODT_SEARCH } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import mxAttributesDocketEntry, {
  fieldsEntriesOfDocketTracker,
} from '~/features/odt/mixins/mxAttributesDocketEntry'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let {
  TimeMetrics,
  EntryInformation,
  Projections,
  ReadingMetrics,
} = ROUTES.DocketEntries
export default {
  name: 'GridEntriesOfTrackerOdt',
  components: { SlickGrid },
  props: {
    type: {
      default: () => TYPE_ODT_SEARCH.RECAP,
    },
    height: {
      default: () => `${80}vh`,
    },
    includesFields: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    endPoint() {
      const {
        params: { docket },
      } = this.$route
      return `/api/dockets/${docket}/docket-entries/`
    },
    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    attrs() {
      let { includesFields } = this
      return [
        {
          ...fieldsEntriesOfDocketTracker.case_name,
        },
        {
          ...fieldsEntriesOfDocketTracker.party,
        },
        ...includesFields,
        {
          ...fieldsEntriesOfDocketTracker.date_filed,
        },
        {
          ...fieldsEntriesOfDocketTracker.filed_by,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
