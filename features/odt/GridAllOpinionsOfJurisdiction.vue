<template>
  <div>
    <SlickGrid
      disabled-add-new-row
      :height="height"
      disabled-add-new-column
      disabled-bookmark-row
      :attributes="reduceAttribute"
      no-link-detail
      no-query-params
    >
      <template v-slot:right-header>
        <LinkHistogram
          id="link-histogram-odt-jurisdiction"
          @received="onReceived"
        />
      </template>
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import LinkHistogram from '@/sat-vue-toolkit/components/LinkHistogram.vue'
import { ROUTES } from '~/features/odt/helpers/odt.json'
export default {
  name: 'GridAllOpinionsOfJurisdiction',
  components: { LinkHistogram, SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${80}vh`,
    },
  },
  computed: {
    attributesInformation() {
      return [
        {
          name: 'name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'jurisdiction',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'citation',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 100,
        },
        {
          name: 'docket_number',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 120,
        },
        {
          name: 'precedential_status',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
        },
        {
          name: 'created',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
          width: 100,
        },
        {
          name: 'age',
          label: 'opinion age',
          type: ATTRIBUTE_FIELDS.DATE.TYPE,
        },
        {
          name: 'cited_authorities',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
        },
        {
          name: 'average_authority_age',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
        },
        {
          name: 'earliest_cited_authorities',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
        },
        {
          name: 'oldest_cited_authorities',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
        },
        {
          name: 'age_range',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 100,
        },
        {
          name: 'cited_by',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 100,
        },
        {
          name: 'last_activity',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          width: 180,
        },
        {
          name: 'time_since_last_activity',
          type: ATTRIBUTE_FIELDS.DATE_TIME.TYPE,
          width: 180,
        },
      ]
    },
    attributesCited() {
      return [
        {
          name: 'name',
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
        },
        {
          name: 'trendline',
          type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
          width: 250,
        },
        {
          name: 'year',
          label: new Date().getFullYear().toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_1',
          label: (new Date().getFullYear() - 1).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_2',
          label: (new Date().getFullYear() - 2).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_3',
          label: (new Date().getFullYear() - 3).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_4',
          label: (new Date().getFullYear() - 4).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_5',
          label: (new Date().getFullYear() - 5).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_6',
          label: (new Date().getFullYear() - 6).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_7',
          label: (new Date().getFullYear() - 7).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_8',
          label: (new Date().getFullYear() - 8).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
        {
          name: 'year_9',
          label: (new Date().getFullYear() - 9).toString(),
          type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
          enabledTrendValue: false,
        },
      ]
    },
    reduceAttribute() {
      let {
        $route: { query },
        attributesInformation,
        attributesCited,
      } = this
      let {
        JurisdictionDetailYearOpinionInformation,
        JurisdictionDetailYearOpinionCitedBy,
        JurisdictionDetailYearOpinionCitedByTrend,
      } = ROUTES.Jurisdiction
      let _by = query['by']
      let isInformation = _by === JurisdictionDetailYearOpinionInformation.path
      let isCitedBy = _by === JurisdictionDetailYearOpinionCitedBy.path
      let isCitedByTrend =
        _by === JurisdictionDetailYearOpinionCitedByTrend.path
      if (isCitedBy || isCitedByTrend) {
        let t = [...attributesCited]
        t = t.map((attr) => {
          let temp = { ...attr }
          temp['enabledTrendValue'] = isCitedByTrend
          return temp
        })
        return [...t]
      }
      return attributesInformation
    },
  },
  methods: {
    onReceived(data) {
      console.log('Received', data)
    },
  },
}
</script>

<style scoped></style>
