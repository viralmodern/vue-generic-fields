<template>
  <div :id="combinedSubs.idFullScreen">
    <TopBarOfTableOdt v-bind="combinedSubs" />
    <GridAllSevereInjuryReportOfCityOfCountyOdt
      :height="height"
      :includes-subs="includesSubs"
    />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let { EmployerInformation, InjuryReports } = ROUTES.CountyCitySevereInjuryReport
export default {
  name: 'HomeSevereInJuryReportOfCityDetailOfCountyOdt',
  props: {
    height: {
      type: String,
      default: () => `${67}vh`,
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TopBarOfTableOdt: () => import('~/features/odt/TopBarOfTableOdt'),
    GridAllSevereInjuryReportOfCityOfCountyOdt: () =>
      import('~/features/odt/GridAllSevereInjuryReportOfCityOfCountyOdt'),
  },
  computed: {
    reduceIncludesSubs() {
      let { includesSubs } = this
      let { query } = this.$route
      if (!Array.isArray(includesSubs)) return []
      return includesSubs.map((sub) => ({
        ...generateToSub(sub, query, sub.to || {}),
      }))
    },
    combinedSubs() {
      let { reduceIncludesSubs } = this
      let { query } = this.$route
      let tabs = [
        ...reduceIncludesSubs,
        { ...generateToSub(EmployerInformation, query) },
        { ...generateToSub(InjuryReports, query) },
      ]
      let idFullScreen = `home-state-us-county`
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
