<template>
  <div>
    <SlickGrid
      count-label-singular="Result"
      count-label-many="Results"
      :has-vote-row="false"
      :has-report-row="false"
      :end-point="endPoint"
      :owner-pk="ownerPk"
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      :attributes="attributes"
      no-link-detail
      :include-params="params"
      :exclude-params="excludeParams"
      :pinned-row="pinnedRow"
      :pinned-row-id="pinnedRowId"
    >
      <template v-slot:right-header></template>
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import {
  ATTRIBUTE_FIELDS,
  TYPE_ODT_SEARCH,
} from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import { $$arrToString } from '@/sat-vue-toolkit/functions'
import BtnLink from '@/sat-vue-toolkit/components/BtnLink.vue'
export default {
  name: 'GridSearchResultsDocketsOdt',
  components: { BtnLink, SlickGrid },
  filters: {
    $$arrToString,
  },
  data() {
    return {}
  },
  props: {
    type: {
      default: () => TYPE_ODT_SEARCH.RECAP,
    },
    dataGroup: {},
    height: {
      default: () => `${80}vh`,
    },
    docketId: {
      type: [String, Number],
      default: () => '1',
    },
    includesAttributes: {
      type: Array,
      default: () => [],
    },
    quickAttribute: {
      type: Boolean,
      default: () => false,
    },
    disabledDialogPhrase: {
      type: Boolean,
      default: () => false,
    },
    pinnedRow: {
      type: Boolean,
      default: () => false,
    },
    pinnedRowId: {
      type: String,
      default: () => ``,
    },
  },
  computed: {
    endPoint() {
      return `/api/dockets/${this.docketId}/docket-entries/search/`
    },
    params() {
      let {
        params,
        query: { q },
      } = this.$route
      let queryParams = { q }
      if (this.$$isTrackerDocketsOdt) {
        queryParams['trackerlink__tracker'] = params.pathMatch
      }
      return queryParams
    },
    excludeParams() {
      let {
        query: { q },
      } = this.$route
      if (!q) return ['q']
      return []
    },

    ownerPk() {
      try {
        return this.$store.getters['auth/user']['pk']
      } catch (e) {
        return ''
      }
    },
    attributes() {
      let { $$rootPathDocketOdt } = this
      let docket = this.docketId
      let phrase = this.$route.query.q
      let otherAttributes = this.quickAttribute ? [] : this.attributeOther
      let disabledDialogPhrase = this.disabledDialogPhrase
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
          name: 'search_results',
          type: ATTRIBUTE_FIELDS.DOCUMENTS.TYPE,
          width: 350,
          pathLink: function () {
            try {
              let entry = this.pk
              return `${$$rootPathDocketOdt}/${docket}/${entry}/document`
            } catch (e) {
              return '/odt'
            }
          },
          options: function () {
            try {
              let entry = this.pk
              return {
                endPoint: `/api/dockets/${docket}/docket-entries/${entry}/documents`,
                phrase,
                disabledDialogPhrase,
              }
            } catch (e) {
              return {
                disabledDialogPhrase,
              }
            }
          },
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          name: 'date_filed',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 150,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        ...otherAttributes,
      ]
    },
    attributeOther() {
      let { includesAttributes } = this
      let entryTypes = this.$store.getters['appConfigs/getChoicesConfigByName'](
        'DocketEntryType'
      ).map((t) => ({ ...t, value: t.value.toString() }))
      let filedBy = this.$store.getters['appConfigs/getChoicesConfigByName'](
        'DocketEntry.FiledBy'
      ).map((t) => ({ ...t, value: t.value.toString() }))
      return [
        {
          name: 'entry_type',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 150,
          list: entryTypes,
          groupBy: true,
          readOnly: true,
        }, // N/A
        {
          name: 'filed_by',
          type: ATTRIBUTE_FIELDS.DROPDOWN.TYPE,
          width: 150,
          list: filedBy,
          groupBy: true,
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
          name: 'document_quantity',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
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
          label: 'Waiting Time Between Entries',
          name: 'waiting_time',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        {
          label: 'Accumulate Waiting Time',
          name: 'accumulated_waiting_time',
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          width: 250,
          list: [],
          groupBy: false,
          readOnly: true,
        }, // N/A
        ...includesAttributes,
      ]
    },
  },
}
</script>

<style scoped></style>
