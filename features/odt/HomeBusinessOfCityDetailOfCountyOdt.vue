<template>
  <div :id="combinedSubs.idFullScreen">
    <TopBarOfTableOdt v-bind="combinedSubs" />
    <GridAllBusinessOfCityOfCountyOdt
      :height="height"
      :includes-subs="includesSubs"
    />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  CompanyProfile,
  ContactInformation,
  CompanyInsight,
} = ROUTES.CountyCityBusiness
export default {
  name: 'HomeBusinessOfCityDetailOfCountyOdt',
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
    GridAllBusinessOfCityOfCountyOdt: () =>
      import('~/features/odt/GridAllBusinessOfCityOfCountyOdt'),
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
        { ...generateToSub(CompanyProfile, query) },
        { ...generateToSub(ContactInformation, query) },
        { ...generateToSub(CompanyInsight, query) },
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
