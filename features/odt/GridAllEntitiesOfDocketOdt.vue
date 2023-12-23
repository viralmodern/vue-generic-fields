<template>
  <div>
    <SlickGrid
      count-label-singular="Entity"
      count-label-many="Entities"
      :owner-pk="ownerPk"
      no-query-params
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      bus-event-name="bus-opinion-entries"
      :attributes="attributes"
      main-cell-id="entity"
      disabled-sort
    >
      <template v-slot:right-header> </template>
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import {
  ATTRIBUTE_FIELDS,
  TYPE_ODT_SEARCH,
} from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { $$getCourtByUrlId, opinionsList } from '@/mock/AllCourts'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import BtnLink from '@/sat-vue-toolkit/components/BtnLink.vue'
import { getChoicesConfigByName } from '~/mock/appConfigs'
export default {
  name: 'GridAllEntitiesOfDocketOdt',
  components: { BtnLink, SlickGrid },
  filters: {
    $$arrToString,
    $$getCourtByUrlId,
  },
  data() {
    return {}
  },
  props: {
    type: {
      default: () => TYPE_ODT_SEARCH.RECAP,
    },
    dataGroup: {
      default: () => {
        return { '': opinionsList }
      },
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
    attributes() {
      let entryTypes = getChoicesConfigByName(
        'MatterDocketEntry.DocketEntryType'
      ).map((t) => ({ ...t, value: t.value.toString() }))
      return [
        {
          name: 'entity',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'entity_type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 180,
        }, // N/A
        {
          label: 'date first mentioned in docket',
          name: 'entity_type1',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
          width: 180,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'total_mentioned',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 180,
        }, // N/A
        {
          name: 'total_alleged_facts',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 180,
        }, // N/A
        {
          name: 'Latest_Mentioned',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'Latest_Mentioned',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'docket_entries',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 180,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
      ]
    },
  },
}
</script>

<style scoped></style>
