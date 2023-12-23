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
import { fieldsOdt } from '~/features/odt/helpers/fieldsOdt'
import { ATTRIBUTE_FIELDS } from '~/sat-vue-toolkit/components/slick-grid/configs/attribute'
let {
  Race,
  Misc,
  LaborForce,
  HouseholdIncome,
  HomeOwnership,
  FamilyDemographic,
  CityProfile,
  AgeDemographic,
  Education,
} = ROUTES.CountyCity
const subs = {
  a1: CityProfile.path,
  a2: AgeDemographic.path,
  a3: FamilyDemographic.path,
  a4: HouseholdIncome.path,
  a5: HomeOwnership.path,
  a6: Education.path,
  a7: LaborForce.path,
  a8: Race.path,
  a9: Misc.path,
}
export default {
  name: 'GridAllCityOfCountyOdt',
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
        case subs.a1:
          return [...attributesFrozen, ...this.attributesSubA1]
        case subs.a2:
          return [...attributesFrozen, ...this.attributesSubA2]
        case subs.a3:
          return [...attributesFrozen, ...this.attributesSubA3]
        case subs.a4:
          return [...attributesFrozen, ...this.attributesSubA4]
        case subs.a5:
          return [...attributesFrozen, ...this.attributesSubA5]
        case subs.a6:
          return [...attributesFrozen, ...this.attributesSubA6]
        case subs.a7:
          return [...attributesFrozen, ...this.attributesSubA7]
        case subs.a8:
          return [...attributesFrozen, ...this.attributesSubA8]
        case subs.a9:
          return [...attributesFrozen, ...this.attributesSubA9]
        default:
          if (defaultSub) {
            if (defaultSub.path === subs.a1) {
              return [...attributesFrozen, ...this.attributesSubA1]
            } else if (defaultSub.path === subs.a2) {
              return [...attributesFrozen, ...this.attributesSubA2]
            }
          }
          return [...attributesFrozen, ...this.attributesSubA1]
      }
    },
    attributesFrozen() {
      let { params } = this.$route
      return [
        {
          ...fieldsOdt.city,
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          width: 200,
          pathLink: function () {
            let city = `${this.pk}`
            let newParams = {
              city,
            }
            return {
              name: `odt-united-states-of-america-state-county-county-city-city`,
              params: {
                ...params,
                ...newParams,
              },
            }
          },
        },
      ]
    },

    attributesSubA1() {
      return [
        { ...fieldsOdt.state },
        { ...fieldsOdt.county },
        { ...fieldsOdt.population },
        { ...fieldsOdt.density_source },
        { ...fieldsOdt.military_incorporated },
        { ...fieldsOdt.township },
        { ...fieldsOdt.timezone },
        { ...fieldsOdt.ranking_zips },
      ]
    },
    attributesSubA2() {
      return [
        { ...fieldsOdt.age_median },
        { ...fieldsOdt.age_under_10 },
        { ...fieldsOdt.age_10_to_19 },
        { ...fieldsOdt.age_20s },
        { ...fieldsOdt.age_30s },
        { ...fieldsOdt.age_40s },
        { ...fieldsOdt.age_50s },
        { ...fieldsOdt.age_60s },
        { ...fieldsOdt.age_70s },
        { ...fieldsOdt.age_80s },
      ]
    },
    attributesSubA3() {
      return [
        { ...fieldsOdt.male },
        { ...fieldsOdt.female },
        { ...fieldsOdt.married },
        { ...fieldsOdt.divorced },
        { ...fieldsOdt.never_married },
        { ...fieldsOdt.widowed },
        { ...fieldsOdt.family_size },
      ]
    },
    attributesSubA4() {
      return [
        { ...fieldsOdt.family_dual_income },
        { ...fieldsOdt.income_household_median },
        { ...fieldsOdt.under_5 },
        { ...fieldsOdt.from_5_to_10 },
        { ...fieldsOdt.from_10_to_15 },
        { ...fieldsOdt.from_20_to_25 },
        { ...fieldsOdt.from_25_to_35 },
        { ...fieldsOdt.from_35_to_50 },
        { ...fieldsOdt.from_50_to_75 },
        { ...fieldsOdt.from_75_to_100 },
        { ...fieldsOdt.from_100_to_150 },
        { ...fieldsOdt.from_150_over },
        { ...fieldsOdt.six_figure },
        { ...fieldsOdt.individual_median },
      ]
    },
    attributesSubA5() {
      return [
        { ...fieldsOdt.home_ownership },
        { ...fieldsOdt.home_value },
        { ...fieldsOdt.rent_median },
        { ...fieldsOdt.rent_burden },
      ]
    },
    attributesSubA6() {
      return [
        { ...fieldsOdt.less_high_school },
        { ...fieldsOdt.high_school },
        { ...fieldsOdt.some_college },
        { ...fieldsOdt.bachelors },
        { ...fieldsOdt.graduate },
        { ...fieldsOdt.college_or_above },
        { ...fieldsOdt.stem_degree },
      ]
    },
    attributesSubA7() {
      return [
        { ...fieldsOdt.labor_force_participation },
        { ...fieldsOdt.unemployment_rate },
      ]
    },
    attributesSubA8() {
      return [
        { ...fieldsOdt.white },
        { ...fieldsOdt.black },
        { ...fieldsOdt.asian },
        { ...fieldsOdt.native },
        { ...fieldsOdt.pacific },
        { ...fieldsOdt.hispanic },
        { ...fieldsOdt.multiple },
        { ...fieldsOdt.other },
      ]
    },
    attributesSubA9() {
      return [
        { ...fieldsOdt.disabled },
        { ...fieldsOdt.poverty },
        { ...fieldsOdt.limited_english },
        { ...fieldsOdt.commute_time },
        { ...fieldsOdt.health_uninsured },
        { ...fieldsOdt.veteran },
      ]
    },
  },
}
</script>

<style scoped></style>
