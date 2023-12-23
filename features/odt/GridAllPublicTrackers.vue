<template>
  <div>
    <div v-if="false">
      {{ reduceAttributes }}
    </div>
    <SlickGrid
      :include-params="includeParams"
      :attributes="reduceAttributes"
      :height="height"
      :has-vote-row="false"
      :has-report-row="false"
      disabled-add-new-row
      disabled-add-new-column
      :end-point="endPoint"
      no-group
      no-link-detail
      main-cell-id="name"
      :noQueryParams="true"
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { mxAttributesPublicTrackers } from '~/features/odt/mixins/mxAttributesTrackersOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
export default {
  name: 'GridAllPublicTrackers',
  components: { SlickGrid },
  mixins: [mxAttributesPublicTrackers],
  props: {
    height: {
      type: String,
      default: () => `80vh`,
    },
    endPoint: {
      type: String,
      default: () => `/api/public-trackers/`,
    },
    includeParams: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    reduceAttributes() {
      let {
        attributesPublicTrackersByProfile,
        attributesPublicTrackersByAnnualDocketEntryLoads,
        attributesPublicTrackersByAnnualDocketEntryTrends,
        $route: { query },
      } = this
      let { AnnualDocketEntryTrends, AnnualDocketEntryLoads } = ROUTES.Tracker
      let _by = query['by']
      if (_by === AnnualDocketEntryTrends.path) {
        return attributesPublicTrackersByAnnualDocketEntryTrends
      } else if (_by === AnnualDocketEntryLoads.path) {
        return attributesPublicTrackersByAnnualDocketEntryLoads
      }
      return attributesPublicTrackersByProfile
    },
  },
}
</script>

<style scoped></style>
