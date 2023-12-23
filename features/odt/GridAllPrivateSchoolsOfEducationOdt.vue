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
let {
  Others,
  BasicInformation,
  PrivateSchoolProfile,
} = ROUTES.EducationPrivateSchools
const subs = {
  a1: BasicInformation.path,
  a2: PrivateSchoolProfile.path,
  a3: Others.path,
}
export default {
  name: 'GridAllPrivateSchoolsOfEducationOdt',
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
      return [
        {
          ...fieldsOdt.university_name,
          width: 200,
        },
      ]
    },

    attributesSubA2() {
      return [
        { ...fieldsOdt.address },
        { ...fieldsOdt.city },
        { ...fieldsOdt.cofips },
        { ...fieldsOdt.country },
        { ...fieldsOdt.county },
        { ...fieldsOdt.county_fips },
        { ...fieldsOdt.phone, label: 'Telephone' },
        { ...fieldsOdt.website },
      ]
    },
    attributesSubA1() {
      return [
        { ...fieldsOdt.end_grade },
        { ...fieldsOdt.enrollment },
        { ...fieldsOdt.ft_teacher },
        { ...fieldsOdt.level },
        { ...fieldsOdt.population },
        { ...fieldsOdt.start_grad },
        { ...fieldsOdt.status },
        { ...fieldsOdt.type },
      ]
    },
    attributesSubA3() {
      return [
        { ...fieldsOdt.naics_code },
        { ...fieldsOdt.naics_desc },
        { ...fieldsOdt.valuation_date },
        { ...fieldsOdt.valuation_method },
      ]
    },
  },
}
</script>

<style scoped></style>
