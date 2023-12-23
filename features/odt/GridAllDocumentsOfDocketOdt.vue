<template>
  <div>
    <SlickGrid
      count-label-singular="Document"
      count-label-many="Documents"
      :owner-pk="ownerPk"
      :height="height"
      disabled-add-new-column
      :attributes="attributes"
      no-link-detail
      no-query-params
      :items="temp"
      disabled-sort
      :items-per-page="200"
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
import { $$getCourtByUrlId } from '@/mock/AllCourts'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import BtnLink from '@/sat-vue-toolkit/components/BtnLink.vue'
import { getChoicesConfigByName } from '~/mock/appConfigs'
export default {
  name: 'GridAllDocumentsOfDocketOdt',
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
    temp() {
      return {
        '': {
          count: 1,
          results: [{}],
        },
      }
    },
    attributes() {
      let entryTypes = getChoicesConfigByName(
        'MatterDocketEntry.DocketEntryType'
      ).map((t) => ({ ...t, value: t.value.toString() }))
      return [
        {
          name: 'entry_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Document',
          name: 'document',
          type: ATTRIBUTE_FIELDS.DOCUMENTS.TYPE,
          width: 350,
          list: [],
          groupBy: false,
          disableCreate: true,
        }, // N/A
        {
          name: 'date_filed',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 150,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'description',
          type: ATTRIBUTE_FIELDS.LONG_TEXT.TYPE,
          width: 400,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'page_quantity',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A

        {
          name: 'estimated_reading_time',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'rake',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'people',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'organization',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'location',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'time',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'summary',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 250,
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
