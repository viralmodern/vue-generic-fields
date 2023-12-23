<template>
  <v-container fluid>
    <div :id="combinedSubs.idFullScreen">
      <TopBarOfTableOdt v-bind="combinedSubs" />
      <GridAllCountyOfAmericaOdt
        :height="height"
        :includes-subs="includesSubs"
      />
    </div>
  </v-container>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  Education,
  CountyIRSAuditRate,
  CountyProfile,
  CovidCases,
  CovidPolicies,
  Demographics,
  ElectionResults,
  Health,
  Occupations,
  Others,
  Population,
} = ROUTES.StateUsCounty
export default {
  name: 'HomeStateUsCountyOdt',
  props: {
    height: {
      type: String,
      default: () => `${77}vh`,
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TopBarOfTableOdt: () => import('~/features/odt/TopBarOfTableOdt'),
    GridAllCountyOfAmericaOdt: () =>
      import('~/features/odt/GridAllCountyOfAmericaOdt'),
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
        { ...generateToSub(CountyProfile, query) },
        { ...generateToSub(Education, query) },
        { ...generateToSub(Population, query) },
        { ...generateToSub(Demographics, query) },
        { ...generateToSub(Occupations, query) },
        { ...generateToSub(Health, query) },
        { ...generateToSub(Others, query) },
        { ...generateToSub(ElectionResults, query) },
        { ...generateToSub(CountyIRSAuditRate, query) },
        { ...generateToSub(CovidCases, query) },
        { ...generateToSub(CovidPolicies, query) },
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
