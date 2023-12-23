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
} = ROUTES.Jurisdiction
const t = {
  profile: JudgesProfile.path,
  education: JudgesEducation.path,
  positions: JudgesPositions.path,
  opinions: JudgesOpinions.path,
}
export default {
  name: 'GridAllJudgesAppointedByPresidentOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${82}vh`,
    },
    rootPath: {
      type: String,
      default: () => `${ROUTES.LitigationResearch.Judges.path}`,
    },
  },
  computed: {
    attributes() {
      let { attributesFrozen, attributesProfile } = this
      return [...attributesFrozen, ...attributesProfile]
    },
    attributesFrozen() {
      let { rootPath } = this
      return [
        {
          ...fieldsJudgesOdt.name,
          pathLink: function () {
            let judge = `${this.pk}`
            return `${rootPath}/${judge}`
          },
        },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsJudgesOdt.appointed_by },
        { ...fieldsJudgesOdt.type },
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
  },
}
</script>

<style scoped></style>
