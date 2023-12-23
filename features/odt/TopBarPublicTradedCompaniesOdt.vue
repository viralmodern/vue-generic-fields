<template>
  <TopBarOfTableOdt v-bind="combinedSubs" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { generateToSub } from '~/features/odt/helpers/function'
import { ROUTES } from '~/features/odt/helpers/odt.json'

let {
  CompanyProfile,
  AnnualDocketEntryLoads,
  AnnualDocketEntryTrends,
  FinanceProfile,
} = ROUTES.StatePublicCompanies
export default {
  name: 'TopBarPublicTradedCompaniesOdt',
  components: { TopBarOfTableOdt },
  computed: {
    combinedSubs() {
      let { query, params } = this.$route
      let tabs = [
        generateToSub(CompanyProfile, query),
        generateToSub(FinanceProfile, query),
        generateToSub(AnnualDocketEntryLoads, query),
        generateToSub(AnnualDocketEntryTrends, query),
      ]
      return {
        tabs,
      }
    },
  },
}
</script>

<style scoped></style>
