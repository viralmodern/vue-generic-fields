<template>
  <v-container fluid>
    <div :id="idPage">
      <TopBarOfTableOdt :tabs="subsJurisdiction" :id-full-screen="idPage" />
      <nuxt-child />
    </div>
  </v-container>
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
export default {
  components: { TopBarOfTableOdt },
  computed: {
    idPage() {
      let {
        $route: {
          params: { jurisdiction, year },
        },
      } = this
      return `page-jurisdiction-fullscreen-${jurisdiction}-${year}`
    },

    subsJurisdiction() {
      let {
        $route: { query },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let {
        JurisdictionDetailYearOpinionInformation,
        JurisdictionDetailYearOpinionCitedBy,
        JurisdictionDetailYearOpinionCitedByTrend,
      } = ROUTES.Jurisdiction
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
          ...JurisdictionDetailYearOpinionInformation,
          to: {
            query: {
              ...query,
              by: JurisdictionDetailYearOpinionInformation.path,
            },
          },
        },
        {
          ...JurisdictionDetailYearOpinionCitedBy,
          to: {
            query: {
              ...query,
              by: JurisdictionDetailYearOpinionCitedBy.path,
            },
          },
        },

        {
          ...JurisdictionDetailYearOpinionCitedByTrend,
          to: {
            query: {
              ...query,
              by: JurisdictionDetailYearOpinionCitedByTrend.path,
            },
          },
        },
      ]
    },
  },
}
</script>

<style scoped></style>
