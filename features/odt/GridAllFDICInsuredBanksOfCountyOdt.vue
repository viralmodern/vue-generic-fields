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
import { fieldsFDICInsuredBanksOfCounty } from '~/features/odt/mixins/mxFDICInsuredBanksOfCounty'
let { Others, BasicInformation, Profile } = ROUTES.CountyFDICInsuredBanks
export default {
  name: 'GridAllFDICInsuredBanksOfCountyOdt',
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
          ...fieldsFDICInsuredBanksOfCounty.name,
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
        { ...fieldsFDICInsuredBanksOfCounty.address },
        { ...fieldsFDICInsuredBanksOfCounty.branch_service },
        { ...fieldsFDICInsuredBanksOfCounty.branch_office_number },
        { ...fieldsFDICInsuredBanksOfCounty.core_based_statistical_area_name },
        { ...fieldsFDICInsuredBanksOfCounty.city },
        { ...fieldsFDICInsuredBanksOfCounty.state },
        { ...fieldsFDICInsuredBanksOfCounty.fips },
        { ...fieldsFDICInsuredBanksOfCounty.zip },
        { ...fieldsFDICInsuredBanksOfCounty.address_institution },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsFDICInsuredBanksOfCounty.total_assets },
        { ...fieldsFDICInsuredBanksOfCounty.institution_class },
        { ...fieldsFDICInsuredBanksOfCounty.institution_hq_city },
        { ...fieldsFDICInsuredBanksOfCounty.Country_Name },
        { ...fieldsFDICInsuredBanksOfCounty.New_Brick_And_Mortar_Flag },
        { ...fieldsFDICInsuredBanksOfCounty.Total_Domestic_Deposits },
        { ...fieldsFDICInsuredBanksOfCounty.Institution_name },
        { ...fieldsFDICInsuredBanksOfCounty.Name_of_Regulatory_High_Hold },
        { ...fieldsFDICInsuredBanksOfCounty.Primary_Federal_Regulator },
      ]
    },
    attributesOthers() {
      return [
        { ...fieldsFDICInsuredBanksOfCounty.Federal_Reserve_Bank_ID_Number },
        { ...fieldsFDICInsuredBanksOfCounty.FIPS_State_Code },
        { ...fieldsFDICInsuredBanksOfCounty.FIPS_County_Number },
        { ...fieldsFDICInsuredBanksOfCounty.Standardized_Address_Institution },
        { ...fieldsFDICInsuredBanksOfCounty.Standardized_Address_Branch },
      ]
    },
  },
}
</script>

<style scoped></style>
