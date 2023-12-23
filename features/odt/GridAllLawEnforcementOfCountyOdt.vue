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
import { fieldsEnforcementOfCounty } from '~/features/odt/mixins/mxLawEnforcementOfCounty'
let { Profile, BasicInformation, Others } = ROUTES.CountyLawEnforcement
export default {
  name: 'GridAllLawEnforcementOfCountyOdt',
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
        case BasicInformation.path:
          return [...attributesFrozen, ...this.attributesInformation]
        case Profile.path:
          return [...attributesFrozen, ...this.attributesProfile]
        case Others.path:
          return [...attributesFrozen, ...this.attributesOthers]
        default:
          if (defaultSub) {
            if (defaultSub.path === BasicInformation.path) {
              return [...attributesFrozen, ...this.attributesInformation]
            } else if (defaultSub.path === HospitalProfile.path) {
              return [...attributesFrozen, ...this.attributesProfile]
            }
          }
          return [...attributesFrozen, ...this.attributesInformation]
      }
    },
    attributesFrozen() {
      let { params } = this.$route
      return [
        {
          ...fieldsEnforcementOfCounty.name,
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

    attributesInformation() {
      return [
        { ...fieldsEnforcementOfCounty.address },
        { ...fieldsEnforcementOfCounty.city },
        { ...fieldsEnforcementOfCounty.country },
        { ...fieldsEnforcementOfCounty.county },
        { ...fieldsEnforcementOfCounty.county_fips },
        { ...fieldsEnforcementOfCounty.csllea08_id },
        { ...fieldsEnforcementOfCounty.ftciv_number },
        { ...fieldsEnforcementOfCounty.ftsworn },
        { ...fieldsEnforcementOfCounty.id },
        { ...fieldsEnforcementOfCounty.num_mobile },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsEnforcementOfCounty.population },
        { ...fieldsEnforcementOfCounty.ptciv },
        { ...fieldsEnforcementOfCounty.ftsworn },
        { ...fieldsEnforcementOfCounty.source },
        { ...fieldsEnforcementOfCounty.source_date },
        { ...fieldsEnforcementOfCounty.tribal },
        { ...fieldsEnforcementOfCounty.type },
      ]
    },
    attributesOthers() {
      return [
        { ...fieldsEnforcementOfCounty.naics_code },
        { ...fieldsEnforcementOfCounty.naics_desc },
        { ...fieldsEnforcementOfCounty.NUMFIXSUB },
        { ...fieldsEnforcementOfCounty.val_date },
        { ...fieldsEnforcementOfCounty.val_method },
      ]
    },
  },
}
</script>

<style scoped></style>
