<template>
  <v-container fluid>
    <div :id="subsLawyers.idFullScreen">
      <TopBarOfTableOdt v-bind="subsLawyers" />
      <GridAllLawyersOdt :height="height" :includes-subs="includesSubs" />
    </div>
  </v-container>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let { ContactInformation, LegislatorProfile } = ROUTES.StateLegislators
export default {
  name: 'HomeStateLegislatorsOdt',
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
    TheTopBarOdt: () => import('~/features/odt/TheTopBarOdt'),
    TopBarOfTableOdt: () => import('~/features/odt/TopBarOfTableOdt'),
    GridAllLawyersOdt: () =>
      import('~/features/odt/GridAllStateLegislatorsOdt'),
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
    subsLawyers() {
      let { reduceIncludesSubs } = this
      let { query } = this.$route
      let tabs = [
        ...reduceIncludesSubs,
        { ...generateToSub(LegislatorProfile, query) },
        { ...generateToSub(ContactInformation, query) },
      ]
      let idFullScreen = `home-lawyers-odt`
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
