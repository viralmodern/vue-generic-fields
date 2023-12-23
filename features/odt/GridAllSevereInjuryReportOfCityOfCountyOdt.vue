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
let { InjuryReports, EmployerInformation } = ROUTES.CountyCitySevereInjuryReport
const subs = {
  a1: EmployerInformation.path,
  a2: InjuryReports.path,
}
export default {
  name: 'GridAllSevereInjuryReportOfCityOfCountyOdt',
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
          ...fieldsOdt.employer_name,
          width: 200,
        },
      ]
    },

    attributesSubA1() {
      return [
        { ...fieldsOdt.id },
        { ...fieldsOdt.upa },
        { ...fieldsOdt.event_date },
        { ...fieldsOdt.address_1 },
        { ...fieldsOdt.address_2 },
        { ...fieldsOdt.city },
        { ...fieldsOdt.state },
        { ...fieldsOdt.zip },
        { ...fieldsOdt.primary_naics },
        { ...fieldsOdt.geopoint },
      ]
    },
    attributesSubA2() {
      return [
        { ...fieldsOdt.hospitalized },
        { ...fieldsOdt.amputation },
        { ...fieldsOdt.inspection },
        { ...fieldsOdt.final_narrative },
        { ...fieldsOdt.nature_title },
        { ...fieldsOdt.part_of_body_title },
        { ...fieldsOdt.event_title },
        { ...fieldsOdt.source_title },
        { ...fieldsOdt.secondary_source_title },
      ]
    },
  },
}
</script>

<style scoped></style>
