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
import { fieldsJudgesOfCounty } from '~/features/odt/mixins/mxJudgesOfCounty'
let {
  Jurisdiction,
  CountyJudgeBio,
  CountyJudgeCareer,
  CountyJudgeEducation,
} = ROUTES.CountyJudge
export default {
  name: 'GridAllJudgesOfCountyOdt',
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
      } = this
      switch (by) {
        case Jurisdiction.path:
          return [
            ...attributesFrozen,
            ...this.attributesJudgesCountyJurisdiction,
          ]
        case CountyJudgeBio.path:
          return [...attributesFrozen, ...this.attributesJudgesCountyBio]
        case CountyJudgeEducation.path:
          return [...attributesFrozen, ...this.attributesJudgesCountyEducation]
        case CountyJudgeCareer.path:
          return [...attributesFrozen, ...this.attributesJudgesCountyCareer]
        default:
          if (defaultSub) {
            if (defaultSub.path === Jurisdiction.path) {
              return [
                ...attributesFrozen,
                ...this.attributesJudgesCountyJurisdiction,
              ]
            } else if (defaultSub.path === CountyJudgeBio.path) {
              return [
                ...attributesFrozen,
                ...this.attributesJudgesCountyJurisdiction,
              ]
            }
          }
          return [
            ...attributesFrozen,
            ...this.attributesJudgesCountyJurisdiction,
          ]
      }
    },
    attributesFrozen() {
      let { params } = this.$route
      return [
        {
          ...fieldsJudgesOfCounty.name,
          width: 200,
          pathLink: function () {
            let pk = `${this.pk}`
            return {
              name: `odt-united-states-of-america-state-county-county`,
              params: {
                ...params,
                county: pk,
              },
            }
          },
        },
      ]
    },

    attributesJudgesCountyJurisdiction() {
      return [
        { ...fieldsJudgesOfCounty.state },
        { ...fieldsJudgesOfCounty.county },
        { ...fieldsJudgesOfCounty.from },
        { ...fieldsJudgesOfCounty.to },
        { ...fieldsJudgesOfCounty.appointed_by },
        { ...fieldsJudgesOfCounty.jurisdiction },
        { ...fieldsJudgesOfCounty.jurisdiction_type },
        { ...fieldsJudgesOfCounty.appeal_court },
        { ...fieldsJudgesOfCounty.federal_district },
        { ...fieldsJudgesOfCounty.federal_appellate },
      ]
    },
    attributesJudgesCountyBio() {
      return [
        { ...fieldsJudgesOfCounty.picture },
        { ...fieldsJudgesOfCounty.biography },
        { ...fieldsJudgesOfCounty.contact_information },
        { ...fieldsJudgesOfCounty.admitted_since },
      ]
    },
    attributesJudgesCountyEducation() {
      return [
        { ...fieldsJudgesOfCounty.title },
        { ...fieldsJudgesOfCounty.company },
        { ...fieldsJudgesOfCounty.from },
        { ...fieldsJudgesOfCounty.to },
        { ...fieldsJudgesOfCounty.career_type },
      ]
    },
    attributesJudgesCountyCareer() {
      return [
        { ...fieldsJudgesOfCounty.degree },
        { ...fieldsJudgesOfCounty.university },
        { ...fieldsJudgesOfCounty.year },
      ]
    },
  },
}
</script>

<style scoped></style>
