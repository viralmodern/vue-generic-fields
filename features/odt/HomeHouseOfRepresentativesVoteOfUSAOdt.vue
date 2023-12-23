<template>
  <div>
    <div :id="combinedSubs.idFullScreen">
      <TopBarOfTableOdt v-bind="combinedSubs" />
      <GridAllHouseOfRepresentativesVoteOfUSAOdt
        :height="height"
        :subs="includesSubs"
      />
    </div>
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'

let { Vote, VoteResult } = ROUTES.USAHouseOfRepresentativesVote
export default {
  name: 'HomeHouseOfRepresentativesVoteOfUSAOdt',
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
    GridAllHouseOfRepresentativesVoteOfUSAOdt: () =>
      import('~/features/odt/GridAllHouseOfRepresentativesVoteOfUSAOdt'),
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
        { ...generateToSub(Vote, query) },
        { ...generateToSub(VoteResult, query) },
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
