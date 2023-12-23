<template>
  <div :id="subsJurisdiction.idFullScreen">
    <TopBarOfTableOdt v-bind="subsJurisdiction" />
    <GridAllJudgesOdt :height="height" :subs="subsJurisdiction.tabs" />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  JudgesProfile,
  JudgesEducation,
  JudgesPositions,
  JudgesOpinions,
  JudgesAnnualOpinionLoads,
  JudgesAnnualOpinionTrends,
  JudgesAnnualDocketLoads,
  JudgesAnnualDocketTrends,
} = ROUTES.Jurisdiction
export default {
  name: 'HomeJudgesOdt',
  components: {
    TopBarOfTableOdt: () => import('~/features/odt/TopBarOfTableOdt'),
    GridAllJudgesOdt: () => import('~/features/odt/GridAllJudgesOdt'),
  },
  props: {
    height: {
      default: () => `${76}vh`,
    },
    includesFields: {
      type: Array,
      default: () => [],
    },
    includesSubs: {
      type: Array,
      default: () => [],
    },
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
    subsJurisdiction() {
      let { reduceIncludesSubs } = this
      let {
        $route: { query },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let idFullScreen = `page-judges-fullscreen`
      let tabs = [
        ...reduceIncludesSubs,
        generateToSub(JudgesProfile, queryRoot),
        generateToSub(JudgesEducation, query),
        generateToSub(JudgesPositions, query),
        generateToSub(JudgesOpinions, query),
        generateToSub(JudgesAnnualOpinionLoads, query),
        generateToSub(JudgesAnnualOpinionTrends, query),
        generateToSub(JudgesAnnualDocketLoads, query),
        generateToSub(JudgesAnnualDocketTrends, query),
      ]
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
