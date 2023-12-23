<template>
  <TopBarOfTableOdt v-bind="subsUnitedStatesAmerica" />
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  Lawyers,
  LawFirms,
  Bills,
  County,
  GovernmentWebsites,
  PublicCompanies,
  StateLegislators,
  StateOrganizations,
} = ROUTES.UnitedStatesOfAmerica
let { UnitedStatesOfAmerica } = ROUTES.LitigationResearch
export default {
  name: 'TopBarStateDetailOfUnitedStatesOfAmericaOdt',
  components: { TopBarOfTableOdt },
  computed: {
    subsUnitedStatesAmerica() {
      let { query, params } = this.$route
      let state = params['state']
      let rooPath = `${UnitedStatesOfAmerica.path}/${state}`
      let tabs = [
        generateToSub(County, query, {
          path: `${rooPath}/${County.path}`,
          params,
          query,
        }),
        generateToSub(PublicCompanies, query, {
          path: `${rooPath}/${PublicCompanies.path}`,
          params,
          query,
        }),
        generateToSub(GovernmentWebsites, query, {
          path: `${rooPath}/${GovernmentWebsites.path}`,
          params,
          query,
        }),
        generateToSub(StateLegislators, query, {
          path: `${rooPath}/${StateLegislators.path}`,
          params,
          query,
        }),
        generateToSub(LawFirms, query, {
          path: `${rooPath}/${LawFirms.path}`,
          params,
          query,
        }),
        generateToSub(Lawyers, query, {
          path: `${rooPath}/${Lawyers.path}`,
          params,
          query,
        }),
        generateToSub(Bills, query, {
          path: `${rooPath}/${Bills.path}`,
          params,
          query,
        }),
        generateToSub(StateOrganizations, query, {
          path: `${rooPath}/${StateOrganizations.path}`,
          params,
          query,
        }),
      ]
      let idFullScreen = ``
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
