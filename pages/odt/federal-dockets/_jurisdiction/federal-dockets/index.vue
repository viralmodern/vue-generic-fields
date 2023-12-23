<template>
  <div :id="subsJurisdiction.idFullScreen">
    <TopBarOfTableOdt v-bind="subsJurisdiction" />
    <GridAllOpinionsByLargeYearsOfJurisdiction
      height="72.5vh"
      :root-path-link="subsJurisdiction.rootPathOfYearGrid"
    />
  </div>
</template>

<script>
import GridAllOpinionsByLargeYearsOfJurisdiction from '~/features/odt/GridAllOpinionsByLargeYearsOfJurisdiction'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let { FederalDockets } = ROUTES.LitigationResearch
export default {
  components: {
    TopBarOfTableOdt,
    GridAllOpinionsByLargeYearsOfJurisdiction,
  },
  computed: {
    subsJurisdiction() {
      let {
        $route: {
          query,
          params: { jurisdiction },
        },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let idFullScreen = `page-jurisdiction-fullscreen-${jurisdiction}`
      let rootPathOfYearGrid = `${FederalDockets.path}/${jurisdiction}/federal-dockets/year`
      let tabs = [
        generateToSub(
          ROUTES.Jurisdiction.JurisdictionDetailMonthlyLoads,
          query
        ),
        generateToSub(
          ROUTES.Jurisdiction.JurisdictionDetailMonthlyTrends,
          query
        ),
      ]
      return {
        tabs,
        idFullScreen,
        rootPathOfYearGrid,
      }
    },
  },
}
</script>

<style scoped></style>
