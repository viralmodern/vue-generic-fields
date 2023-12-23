<template>
  <div>
    <SlickGrid
      disabled-add-new-column
      disabled-add-new-row
      no-query-params
      no-link-detail
      :height="height"
      :attributes="attributes"
    />
  </div>
</template>

<script>
import { fieldsPresidentAmericanOdt } from '~/features/odt/mixins/mxPresidentAmerican'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import SlickGrid from '~/sat-vue-toolkit/components/slick-grid/SlickGrid'
export default {
  name: 'GridAllUsPresidents',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${80}vh`,
    },
  },
  computed: {
    attributesFrozen() {
      let { USPresidents } = ROUTES.LitigationResearch
      return [
        {
          ...fieldsPresidentAmericanOdt.president,
          pathLink: function () {
            return `${USPresidents.path}/${this.pk}`
          },
        },
      ]
    },
    attributes() {
      let { attributesFrozen } = this
      let fields = [
        fieldsPresidentAmericanOdt.born,
        fieldsPresidentAmericanOdt.race,
        fieldsPresidentAmericanOdt.religion,
        fieldsPresidentAmericanOdt.political_affiliation,
        fieldsPresidentAmericanOdt.president_period,
        fieldsPresidentAmericanOdt.president_length,
        fieldsPresidentAmericanOdt.total_appointments,
        fieldsPresidentAmericanOdt.average_appointment_days,
        fieldsPresidentAmericanOdt.total_opinions,
      ]
      let {
        $route: { query },
      } = this
      let _by = query['by']
      let {
        Profile,
        AnnualOpinionLoads,
        AnnualOpinionTrend,
        AnnualDocketLoads,
        AnnualDocketTrend,
      } = ROUTES.UsPresidents
      let fieldsCompare = []
      let fieldsAnnual = [
        fieldsPresidentAmericanOdt.trend_line,
        fieldsPresidentAmericanOdt.quarter_1st,
        fieldsPresidentAmericanOdt.quarter_2nd,
        fieldsPresidentAmericanOdt.quarter_3rd,
        fieldsPresidentAmericanOdt.quarter_4th,
        fieldsPresidentAmericanOdt.year_1,
        fieldsPresidentAmericanOdt.year_2,
        fieldsPresidentAmericanOdt.year_3,
        fieldsPresidentAmericanOdt.year_4,
        fieldsPresidentAmericanOdt.year_5,
        fieldsPresidentAmericanOdt.year_6,
        fieldsPresidentAmericanOdt.year_7,
        fieldsPresidentAmericanOdt.year_8,
        fieldsPresidentAmericanOdt.year_9,
      ]
      if (_by === AnnualOpinionTrend.path) {
        console.error('AnnualOpinionTrend', _by)
        fieldsCompare = [
          { ...fieldsPresidentAmericanOdt.total_opinions },
          ...fieldsAnnual,
        ].map((t) => ({ ...t, enabledTrendValue: true }))
      } else if (_by === AnnualOpinionLoads.path) {
        console.error('AnnualOpinionLoads', _by)
        fieldsCompare = [
          { ...fieldsPresidentAmericanOdt.total_opinions },
          ...fieldsAnnual,
        ].map((t) => ({ ...t, enabledTrendValue: false }))
      } else if (_by === AnnualDocketLoads.path) {
        console.error('AnnualDocketLoads', _by)
        fieldsCompare = [
          { ...fieldsPresidentAmericanOdt.total_dockets },
          ...fieldsAnnual,
        ].map((t) => ({ ...t, enabledTrendValue: false }))
      } else if (_by === AnnualDocketTrend.path) {
        console.error('AnnualDocketTrend', _by)
        fieldsCompare = [
          { ...fieldsPresidentAmericanOdt.total_dockets },
          ...fieldsAnnual,
        ].map((t) => ({ ...t, enabledTrendValue: true }))
      } else {
        console.error('DEFAULT', _by)
        fieldsCompare = [...fields]
      }
      return [...attributesFrozen, ...fieldsCompare]
    },
  },
}
</script>

<style scoped></style>
