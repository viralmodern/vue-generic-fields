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
import { fieldsPrisonsOfCounty } from '~/features/odt/mixins/mxPrisonsOfCounty'
let { Others, BasicInformation, Profile } = ROUTES.CountyPrisons
export default {
  name: 'GridAllPrisonsOfCountyOdt',
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
            } else if (defaultSub.path === Profile.path) {
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
          ...fieldsPrisonsOfCounty.name,
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
        { ...fieldsPrisonsOfCounty.facility_id },
        { ...fieldsPrisonsOfCounty.address },
        { ...fieldsPrisonsOfCounty.city },
        { ...fieldsPrisonsOfCounty.state },
        { ...fieldsPrisonsOfCounty.zip },
        { ...fieldsPrisonsOfCounty.telephone },
        { ...fieldsPrisonsOfCounty.type },
        { ...fieldsPrisonsOfCounty.status },
        { ...fieldsPrisonsOfCounty.website },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsPrisonsOfCounty.population },
        { ...fieldsPrisonsOfCounty.county },
        { ...fieldsPrisonsOfCounty.county_fips },
        { ...fieldsPrisonsOfCounty.secure_level },
        { ...fieldsPrisonsOfCounty.capacity },
      ]
    },
    attributesOthers() {
      return [
        { ...fieldsPrisonsOfCounty.naics_code },
        { ...fieldsPrisonsOfCounty.naics_desc },
      ]
    },
  },
}
</script>

<style scoped></style>
