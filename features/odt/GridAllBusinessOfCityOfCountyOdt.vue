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
  CompanyInsight,
  ContactInformation,
  CompanyProfile,
} = ROUTES.CountyCityBusiness
const subs = {
  a1: CompanyProfile.path,
  a2: ContactInformation.path,
  a3: CompanyInsight.path,
}
export default {
  name: 'GridAllBusinessOfCityOfCountyOdt',
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
          ...fieldsOdt.company_name,
          width: 200,
        },
      ]
    },

    attributesSubA1() {
      return [
        { ...fieldsOdt.sic_code },
        { ...fieldsOdt.sic_description },
        { ...fieldsOdt.address },
        { ...fieldsOdt.city },
        { ...fieldsOdt.state },
        { ...fieldsOdt.zip },
        { ...fieldsOdt.county },
      ]
    },
    attributesSubA2() {
      return [
        { ...fieldsOdt.phone },
        { ...fieldsOdt.fax },
        { ...fieldsOdt.website },
        { ...fieldsOdt.contact },
        { ...fieldsOdt.contact_title },
      ]
    },
    attributesSubA3() {
      return [
        { ...fieldsOdt.total_employees },
        { ...fieldsOdt.employee_range },
        { ...fieldsOdt.sale_volume },
        { ...fieldsOdt.sale_volume_range },
        { ...fieldsOdt.naics_number },
        { ...fieldsOdt.industry },
      ]
    },
  },
}
</script>

<style scoped></style>
