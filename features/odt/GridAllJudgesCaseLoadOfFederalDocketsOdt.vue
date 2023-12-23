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
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'

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
  name: 'GridAllJudgesCaseLoadOfFederalDocketsOdt',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${82}vh`,
    },
  },
  computed: {
    attributes() {
      let { attributesFrozen, attributesProfile } = this
      return [...attributesFrozen, ...attributesProfile]
    },
    attributesFrozen() {
      return [
        {
          ...fieldsJudgesOdt.name,
          type: ATTRIBUTE_FIELDS.TEXT.TYPE,
          pathLink: function () {
            let judge = `${this.pk}`
            return `${ROUTES.LitigationResearch.Judges.path}/${judge}`
          },
        },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsJudgesOdt.jurisdiction },
        { ...fieldsJudgesOdt.total_dockets },
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
