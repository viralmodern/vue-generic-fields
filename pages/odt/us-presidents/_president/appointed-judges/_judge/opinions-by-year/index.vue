<template>
  <v-container fluid>
    <div :id="idPage">
      <TopBarOfTableOdt :tabs="subsJurisdiction" :id-full-screen="idPage" />
      <GridAllOpinionsByLargeYearsOfJurisdiction
        :root-path-link="rootJudgeDetail"
        height="72.5vh"
      />
    </div>
  </v-container>
</template>

<script>
import GridAllOpinionsByLargeYearsOfJurisdiction from '~/features/odt/GridAllOpinionsByLargeYearsOfJurisdiction'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'

export default {
  components: {
    TopBarOfTableOdt,
    GridAllOpinionsByLargeYearsOfJurisdiction,
  },
  computed: {
    idPage() {
      let {
        $route: {
          params: { jurisdiction },
        },
      } = this
      return `page-jurisdiction-fullscreen-${jurisdiction}`
    },
    rootJudgeDetail() {
      let {
        $route: {
          params: { judge },
        },
      } = this
      return `${ROUTES.LitigationResearch.Judges.path}/${judge}/opinions-by-year/year`
    },
    subsJurisdiction() {
      let {
        $route: {
          query,
          params: { jurisdiction },
        },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      return [
        /*{
            ...ROUTES.Jurisdiction.JurisdictionDetailYear,
            to: {
              query: {
                ...queryRoot,
              },
            },
          },*/
        {
          ...ROUTES.Jurisdiction.JurisdictionDetailMonthlyLoads,
          to: {
            query: {
              ...query,
              by: ROUTES.Jurisdiction.JurisdictionDetailMonthlyLoads.path,
            },
          },
        },
        {
          ...ROUTES.Jurisdiction.JurisdictionDetailMonthlyTrends,
          to: {
            query: {
              ...query,
              by: ROUTES.Jurisdiction.JurisdictionDetailMonthlyTrends.path,
            },
          },
        },
      ]
    },
  },
}
</script>

<style scoped></style>
