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
  SupplementalCollegeProfile,
} = ROUTES.EducationSupplementalColleges

const subs = {
  a1: BasicInformation.path,
  a2: SupplementalCollegeProfile.path,
  a3: Others.path,
}

export default {
  name: 'GridAllSupplementalCollegesOfEducationOdt',
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
          ...fieldsOdt.supplemental_college_name,
          width: 200,
        },
      ]
    },

    attributesSubA2() {
      return [
        { ...fieldsOdt.address },
        { ...fieldsOdt.city },
        { ...fieldsOdt.country },
        { ...fieldsOdt.county },
        { ...fieldsOdt.county_fips },
        { ...fieldsOdt.ipedsid },
        { ...fieldsOdt.phone, label: 'Telephone' },
      ]
    },
    attributesSubA1() {
      return [
        { ...fieldsOdt.total_entroll },
        { ...fieldsOdt.population },
        { ...fieldsOdt.source },
        { ...fieldsOdt.total_emp },
        { ...fieldsOdt.type },
      ]
    },
    attributesSubA3() {
      return [{ ...fieldsOdt.naics_code }, { ...fieldsOdt.naics_desc }]
    },
  },
}
</script>

<style scoped></style>
