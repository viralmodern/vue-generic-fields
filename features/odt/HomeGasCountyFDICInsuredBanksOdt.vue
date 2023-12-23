<template>
  <div :id="combinedSubs.idFullScreen">
    <TopBarOfTableOdt v-bind="combinedSubs" />
    <GridAllFDICInsuredBanksOfCountyOdt
      :height="height"
      :includes-subs="includesSubs"
    />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let { Profile, BasicInformation, Others } = ROUTES.CountyFDICInsuredBanks
export default {
  name: 'HomeGasCountyFDICInsuredBanksOdt',
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
    GridAllFDICInsuredBanksOfCountyOdt: () =>
      import('~/features/odt/GridAllFDICInsuredBanksOfCountyOdt'),
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
        { ...generateToSub(BasicInformation, query) },
        { ...generateToSub(Profile, query) },
        { ...generateToSub(Others, query) },
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
