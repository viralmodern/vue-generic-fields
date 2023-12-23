<template>
  <div>
    <div :id="combinedSubs.idFullScreen">
      <TopBarOfTableOdt v-bind="combinedSubs" />
      <GridAllHouseOfRepresentativesOfUSAOdt
        :height="height"
        :subs="includesSubs"
      />
    </div>
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'

let { MemberProfile } = ROUTES.USAHouseOfRepresentativesHome
export default {
  name: 'HomeHouseOfRepresentativesOfUSAOdt',
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
    GridAllHouseOfRepresentativesOfUSAOdt: () =>
      import('~/features/odt/GridAllHouseOfRepresentativesOfUSAOdt'),
  },
  computed: {
    reduceIncludesSubs() {
      let { includesSubs } = this
      let { query } = this.$route
      if (!Array.isArray(includesSubs)) {
        return []
      }
      return includesSubs.map((sub) => ({
        ...generateToSub(sub, query, sub.to || {}),
      }))
    },
    combinedSubs() {
      let { reduceIncludesSubs } = this
      let { query } = this.$route
      let tabs = [
        ...reduceIncludesSubs,
        { ...generateToSub(MemberProfile, query) },
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
