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
import { fieldsPublicTradedCompaniesOfState } from '~/features/odt/mixins/mxPublicTradedCompaniesOfState'
let {
  FinanceProfile,
  AnnualDocketEntryTrends,
  AnnualDocketEntryLoads,
  CompanyProfile,
} = ROUTES.StatePublicCompanies
export default {
  name: 'GridAllPublicTradedCompaniesOfStateOdt',
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
        case CompanyProfile.path:
          return [...attributesFrozen, ...this.attributesInformation]
        case FinanceProfile.path:
          return [...attributesFrozen, ...this.attributesProfile]
        case AnnualDocketEntryLoads.path:
          return [...attributesFrozen, ...this.attributesOthers]
        case AnnualDocketEntryTrends.path:
          return [...attributesFrozen, ...this.attributesOthers]
        default:
          if (defaultSub) {
            if (defaultSub.path === CompanyProfile.path) {
              return [...attributesFrozen, ...this.attributesInformation]
            } else if (defaultSub.path === FinanceProfile.path) {
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
          ...fieldsPublicTradedCompaniesOfState.company_name,
          width: 200,
          pathLink: function () {
            let pk = `${this.pk}`
            return {
              name: `odt-united-states-of-america-state-public-companies-company`,
              params: {
                ...params,
                company: pk,
              },
            }
          },
        },
      ]
    },

    attributesInformation() {
      return [
        { ...fieldsPublicTradedCompaniesOfState.ticker },
        { ...fieldsPublicTradedCompaniesOfState.cik_number },
        { ...fieldsPublicTradedCompaniesOfState.state_location },
        { ...fieldsPublicTradedCompaniesOfState.fiscal_year_end },
        { ...fieldsPublicTradedCompaniesOfState.sic },
        { ...fieldsPublicTradedCompaniesOfState.location },
        { ...fieldsPublicTradedCompaniesOfState.phone_number },
        { ...fieldsPublicTradedCompaniesOfState.website },
      ]
    },
    attributesProfile() {
      return [
        { ...fieldsPublicTradedCompaniesOfState.exchange },
        { ...fieldsPublicTradedCompaniesOfState.market_cap },
        { ...fieldsPublicTradedCompaniesOfState.stock_style },
        { ...fieldsPublicTradedCompaniesOfState.employees },
        { ...fieldsPublicTradedCompaniesOfState.irs_number },
        { ...fieldsPublicTradedCompaniesOfState.cik_number },
        { ...fieldsPublicTradedCompaniesOfState.total_dockets },
        { ...fieldsPublicTradedCompaniesOfState.total_sec_filings },
      ]
    },
    attributesOthers() {
      return [{ ...fieldsPublicTradedCompaniesOfState.exchange }]
    },
  },
}
</script>

<style scoped></style>
