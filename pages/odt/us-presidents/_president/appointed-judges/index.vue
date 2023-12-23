<template>
  <div :id="subsJurisdiction.idFullScreen">
    <TopBarOfTableOdt v-bind="subsJurisdiction" />
    <GridAllJudgesOdt height="72.8vh" />
  </div>
</template>

<script>
import GridAllJudgesOdt from '~/features/odt/GridAllJudgesOdt'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
export default {
  components: { TopBarOfTableOdt, GridAllJudgesOdt },
  computed: {
    subsJurisdiction() {
      let {
        $route: { query, path },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
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
      let idFullScreen = `page-judges-fullscreen`
      let tabs = [
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
