<template>
  <div>
    <SlickGrid
      no-query-params
      :attributes="reduceAttributes"
      :height="height"
      disabled-add-new-row
      disabled-add-new-column
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import {
  attributesUniversityMixin,
  fieldsLawSchool,
  jurisdictionTypesMixins,
} from '~/features/odt/mixins/lawSchoolOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let {
  AnnualDocketLoads,
  AnnualDocketTrends,
  AnnualOpinionLoads,
  AnnualOpinionTrends,
  InFederalDockets,
  JudgeTypes,
  Profile,
} = ROUTES.LawSchool
export default {
  name: 'GridAllLawSchoolOdt',
  components: { SlickGrid },
  mixins: [attributesUniversityMixin, jurisdictionTypesMixins],
  props: {
    height: {
      type: String,
      default: () => `${81.5}vh`,
    },
  },
  computed: {
    reduceAttributes() {
      let { query } = this.$route
      let _by = query['by']
      let ts = [fieldsLawSchool.University],
        temp = []
      let tempAnnualFields = [
        fieldsLawSchool.Trendline,
        fieldsLawSchool.quarter1st,
        fieldsLawSchool.quarter2nd,
        fieldsLawSchool.quarter3rd,
        fieldsLawSchool.quarter4th,
        fieldsLawSchool.year1,
        fieldsLawSchool.year2,
        fieldsLawSchool.year3,
        fieldsLawSchool.year4,
        fieldsLawSchool.year5,
        fieldsLawSchool.year6,
        fieldsLawSchool.year7,
        fieldsLawSchool.year8,
        fieldsLawSchool.year9,
      ]
      switch (_by) {
        case JudgeTypes.path:
          let { jurisdictionsTypesFields } = this
          temp = [...jurisdictionsTypesFields]
          break
        case AnnualOpinionLoads.path:
          temp = [...tempAnnualFields].map((t) => {
            let it = { ...t }
            it['enabledTrendValue'] = false
            return it
          })
          break
        case AnnualOpinionTrends.path:
          temp = [...tempAnnualFields].map((t) => {
            let it = { ...t }
            it['enabledTrendValue'] = true
            return it
          })
          break
        case AnnualDocketLoads.path:
          temp = [...tempAnnualFields].map((t) => {
            let it = { ...t }
            it['enabledTrendValue'] = false
            return it
          })
          break
        case AnnualDocketTrends.path:
          temp = [...tempAnnualFields].map((t) => {
            let it = { ...t }
            it['enabledTrendValue'] = true
            return it
          })
          break
        case InFederalDockets.path:
          temp = [
            { ...fieldsLawSchool.TotalDockets, enabledTrendValue: false },
            { ...fieldsLawSchool.legalIssues },
            { ...fieldsLawSchool.today, enabledTrendValue: false },
            { ...fieldsLawSchool.yesterday, enabledTrendValue: false },
            { ...fieldsLawSchool.last7day, enabledTrendValue: false },
            { ...fieldsLawSchool.last30day, enabledTrendValue: false },
            { ...fieldsLawSchool.quarter1st, enabledTrendValue: false },
            { ...fieldsLawSchool.quarter2nd, enabledTrendValue: false },
            { ...fieldsLawSchool.quarter3rd, enabledTrendValue: false },
            { ...fieldsLawSchool.quarter4th, enabledTrendValue: false },
            { ...fieldsLawSchool.year1, enabledTrendValue: false },
            { ...fieldsLawSchool.year2, enabledTrendValue: false },
            { ...fieldsLawSchool.year3, enabledTrendValue: false },
            { ...fieldsLawSchool.year4, enabledTrendValue: false },
            { ...fieldsLawSchool.year5, enabledTrendValue: false },
            { ...fieldsLawSchool.year6, enabledTrendValue: false },
            { ...fieldsLawSchool.year7, enabledTrendValue: false },
            { ...fieldsLawSchool.year8, enabledTrendValue: false },
            { ...fieldsLawSchool.year9, enabledTrendValue: false },
          ]
          break
        default:
          temp = [
            fieldsLawSchool.TotalJudges,
            fieldsLawSchool.DemocraticJudges,
            fieldsLawSchool.RepublicanJudges,
            fieldsLawSchool.TotalOpinions,
            fieldsLawSchool.TotalDockets,
          ]
          break
      }
      ts = [...ts, ...temp]
      return ts
    },
  },
}
</script>

<style scoped></style>
