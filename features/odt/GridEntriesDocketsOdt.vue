<template>
  <div>
    <SlickGrid
      count-label-singular="Docket Entry"
      count-label-many="Docket Entries"
      :end-point="endPoint"
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      :attributes="reduceAttributes"
      main-cell-id="entry_number"
      event-start-by-field="date_filed"
      event-end-by-field="date_filed"
      :items-per-page="200"
      no-link-detail
    >
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { TYPE_ODT_SEARCH } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import mxAttributesDocketEntry from '~/features/odt/mixins/mxAttributesDocketEntry'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let {
  TimeMetrics,
  EntryInformation,
  Projections,
  ReadingMetrics,
} = ROUTES.DocketEntries
export default {
  name: 'GridEntriesDocketsOdt',
  components: { SlickGrid },
  mixins: [mxAttributesDocketEntry],
  props: {
    type: {
      default: () => TYPE_ODT_SEARCH.RECAP,
    },
    height: {
      default: () => `${80}vh`,
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
    reduceAttributes() {
      let a = this.attributesByNames
      let {
        query: { by },
      } = this.$route
      if (by === ReadingMetrics.path) {
        return [
          a.entry_number,
          a.page_quantity,
          a.document_quantity,
          a.estimated_reading_time,
        ]
      } else if (by === TimeMetrics.path) {
        return [a.entry_number, a.waiting_time, a.accumulated_waiting_time]
      } else if (by === Projections.path) {
        return [a.entry_number, a.filed_by, a.entry_type]
      }
      return [a.entry_number, a.date_filed, a.description, a.documents]
    },
  },
}
</script>

<style scoped></style>
