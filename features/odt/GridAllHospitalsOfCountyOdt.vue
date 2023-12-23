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
import { fieldsHospitalsOfCounty } from '~/features/odt/mixins/mxHospitalsOfCounty'
let { Others, BasicInformation, HospitalProfile } = ROUTES.CountyHospitals
export default {
  name: 'GridAllHospitalsOfCountyOdt',
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
        case HospitalProfile.path:
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
          ...fieldsHospitalsOfCounty.name,
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
        { ...fieldsHospitalsOfCounty.id },
        { ...fieldsHospitalsOfCounty.address },
        { ...fieldsHospitalsOfCounty.city },
        { ...fieldsHospitalsOfCounty.state },
        { ...fieldsHospitalsOfCounty.zip },
        { ...fieldsHospitalsOfCounty.telephone },
        { ...fieldsHospitalsOfCounty.type },
        { ...fieldsHospitalsOfCounty.status },
        { ...fieldsHospitalsOfCounty.county },
        { ...fieldsHospitalsOfCounty.population },
        { ...fieldsHospitalsOfCounty.country },
        { ...fieldsHospitalsOfCounty.website },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsHospitalsOfCounty.bed },
        { ...fieldsHospitalsOfCounty.owner },
        { ...fieldsHospitalsOfCounty.trauma },
        { ...fieldsHospitalsOfCounty.helicopter_pad },
      ]
    },
    attributesOthers() {
      return [
        { ...fieldsHospitalsOfCounty.naics_code },
        { ...fieldsHospitalsOfCounty.naics_desc },
        { ...fieldsHospitalsOfCounty.source },
        { ...fieldsHospitalsOfCounty.source_datetime },
        { ...fieldsHospitalsOfCounty.val_method },
        { ...fieldsHospitalsOfCounty.val_date },
      ]
    },
  },
}
</script>

<style scoped></style>
