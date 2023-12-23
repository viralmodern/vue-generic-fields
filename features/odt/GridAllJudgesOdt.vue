<template>
  <div>
    <SlickGrid
      :height="height"
      disabled-add-new-column
      disabled-add-new-row
      :attributes="attributes"
      no-query-params
    />
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { fieldsJudgesOdt } from '~/features/odt/mixins/mxJudgesOdt'

let {
  JudgesProfile,
  JudgesEducation,
  JudgesPositions,
  JudgesOpinions,
  JudgesAnnualOpinionLoads,
  JudgesAnnualOpinionTrends,
  JudgesAnnualDocketLoads,
  JudgesAnnualDocketTrends,
  AssignedToJudges,
  OrderStatus,
} = ROUTES.Jurisdiction
const t = {
  profile: JudgesProfile.path,
  education: JudgesEducation.path,
  positions: JudgesPositions.path,
  opinions: JudgesOpinions.path,

  opinionLoads: JudgesAnnualOpinionLoads.path,
  opinionTrends: JudgesAnnualOpinionTrends.path,
  docketLoads: JudgesAnnualDocketLoads.path,
  docketTrends: JudgesAnnualDocketTrends.path,
  assignedToJudges: AssignedToJudges.path,
  OrderStatus: OrderStatus.path,
}
export default {
  name: 'GridAllJudgesOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${82}vh`,
    },
    subs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    defaultSub() {
      let { subs } = this
      if (Array.isArray(subs)) {
        let firstSub = subs[0]
        if (firstSub) return firstSub
        return false
      } else {
        return false
      }
    },
    attributes() {
      let { defaultSub } = this
      let {
        $route: {
          query: { by },
        },
        attributesFrozen,
        attributesProfile,
        attributesEducation,
        attributesPosition,
        attributesOpinion,
        attributesAnnualLoads,
        attributesAnnualTrends,
        attributesAssignedToJudges,
        attributesOrderStatus,
      } = this
      switch (by) {
        case t.profile:
          return [...attributesFrozen, ...attributesProfile]
        case t.education:
          return [...attributesFrozen, ...attributesEducation]
        case t.positions:
          return [...attributesFrozen, ...attributesPosition]
        case t.opinions:
          return [...attributesFrozen, ...attributesOpinion]
        case t.opinionLoads:
          return [...attributesFrozen, ...attributesAnnualLoads]
        case t.opinionTrends:
          return [...attributesFrozen, ...attributesAnnualTrends]
        case t.docketLoads:
          return [...attributesFrozen, ...attributesAnnualLoads]
        case t.docketTrends:
          return [...attributesFrozen, ...attributesAnnualTrends]
        case t.assignedToJudges:
          return [...attributesFrozen, ...attributesAssignedToJudges]
        case t.OrderStatus:
          return [...attributesFrozen, ...attributesOrderStatus]
        default:
          if (defaultSub) {
            if (defaultSub.path === t.profile) {
              return [...attributesFrozen, ...attributesProfile]
            } else if (defaultSub.path === t.assignedToJudges) {
              return [...attributesFrozen, ...attributesAssignedToJudges]
            }
          }
          return [...attributesFrozen, ...attributesProfile]
      }
    },
    attributesFrozen() {
      return [
        {
          ...fieldsJudgesOdt.name,
          pathLink: function () {
            let judge = `${this.pk}`
            return `${ROUTES.LitigationResearch.Judges.path}/${judge}`
          },
        },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsJudgesOdt.biographical },
        { ...fieldsJudgesOdt.political_affiliations },
        { ...fieldsJudgesOdt.campaign_finance },
        { ...fieldsJudgesOdt.current_status },
        { ...fieldsJudgesOdt.race },
        { ...fieldsJudgesOdt.gender },
        { ...fieldsJudgesOdt.aba_ratings },
      ]
    },
    attributesEducation() {
      return [
        { ...fieldsJudgesOdt.university },
        { ...fieldsJudgesOdt.degree },
        { ...fieldsJudgesOdt.year },
      ]
    },
    attributesPosition() {
      return [
        { ...fieldsJudgesOdt.type },
        { ...fieldsJudgesOdt.jurisdiction },
        { ...fieldsJudgesOdt.from },
        { ...fieldsJudgesOdt.to },
        { ...fieldsJudgesOdt.position_length },
        { ...fieldsJudgesOdt.appointed_by },
        { ...fieldsJudgesOdt.confirmation_date },
        { ...fieldsJudgesOdt.selected_by },
        { ...fieldsJudgesOdt.senior_status_date },
        { ...fieldsJudgesOdt.time_since_confirmed },
      ]
    },
    attributesOpinion() {
      return [
        { ...fieldsJudgesOdt.total_opinions },
        { ...fieldsJudgesOdt.total_cited_by },
        { ...fieldsJudgesOdt.opinions_trendline },
        { ...fieldsJudgesOdt.cited_by_trendline },
        { ...fieldsJudgesOdt.quarter_1st },
        { ...fieldsJudgesOdt.quarter_2nd },
        { ...fieldsJudgesOdt.quarter_3rd },
        { ...fieldsJudgesOdt.quarter_4th },
        { ...fieldsJudgesOdt.year_1 },
        { ...fieldsJudgesOdt.year_2 },
        { ...fieldsJudgesOdt.year_3 },
        { ...fieldsJudgesOdt.year_4 },
        { ...fieldsJudgesOdt.year_5 },
        { ...fieldsJudgesOdt.year_6 },
        { ...fieldsJudgesOdt.year_7 },
        { ...fieldsJudgesOdt.year_8 },
        { ...fieldsJudgesOdt.year_9 },
      ]
    },
    attributesAnnualLoads() {
      return [
        { ...fieldsJudgesOdt.trend_line },
        { ...fieldsJudgesOdt.quarter_1st, enabledTrendValue: false },
        { ...fieldsJudgesOdt.quarter_2nd, enabledTrendValue: false },
        { ...fieldsJudgesOdt.quarter_3rd, enabledTrendValue: false },
        { ...fieldsJudgesOdt.quarter_4th, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_1, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_2, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_3, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_4, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_5, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_6, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_7, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_8, enabledTrendValue: false },
        { ...fieldsJudgesOdt.year_9, enabledTrendValue: false },
      ]
    },
    attributesAnnualTrends() {
      return [
        { ...fieldsJudgesOdt.trend_line },
        { ...fieldsJudgesOdt.quarter_1st, enabledTrendValue: true },
        { ...fieldsJudgesOdt.quarter_2nd, enabledTrendValue: true },
        { ...fieldsJudgesOdt.quarter_3rd, enabledTrendValue: true },
        { ...fieldsJudgesOdt.quarter_4th, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_1, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_2, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_3, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_4, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_5, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_6, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_7, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_8, enabledTrendValue: true },
        { ...fieldsJudgesOdt.year_9, enabledTrendValue: true },
      ]
    },
    attributesAssignedToJudges() {
      return [
        { ...fieldsJudgesOdt.total_dockets },
        { ...fieldsJudgesOdt.total_orders },
      ]
    },
    attributesOrderStatus() {
      return [
        { ...fieldsJudgesOdt.total_order_granting_in_part_and_denying_in_part },
        { ...fieldsJudgesOdt.total_order_granting },
        { ...fieldsJudgesOdt.total_order_denying },
      ]
    },
  },
}
</script>

<style scoped></style>
