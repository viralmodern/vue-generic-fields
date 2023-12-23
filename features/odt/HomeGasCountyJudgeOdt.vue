<template>
  <div :id="combinedSubs.idFullScreen">
    <TopBarOfTableOdt v-bind="combinedSubs" />
    <GridAllJudgesOfCountyOdt :height="height" :includes-subs="includesSubs" />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  Jurisdiction,
  CountyJudgeBio,
  CountyJudgeCareer,
  CountyJudgeEducation,
} = ROUTES.CountyJudge
export default {
  name: 'HomeGasCountyJudgeOdt',
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
    GridAllJudgesOfCountyOdt: () =>
      import('~/features/odt/GridAllJudgesOfCountyOdt'),
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
        { ...generateToSub(Jurisdiction, query) },
        { ...generateToSub(CountyJudgeBio, query) },
        { ...generateToSub(CountyJudgeCareer, query) },
        { ...generateToSub(CountyJudgeEducation, query) },
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
