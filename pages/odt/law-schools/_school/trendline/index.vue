<template>
  <div :id="subsTabTrendLine.idFullScreen">
    <TopBarOfTableOdt v-bind="subsTabTrendLine"></TopBarOfTableOdt>
    <GridAllOpinionsByLargeYearsOfJurisdiction
      height="72vh"
      :root-path-link="subsTabTrendLine.rootPathLink"
    />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import GridAllOpinionsByLargeYearsOfJurisdiction from '~/features/odt/GridAllOpinionsByLargeYearsOfJurisdiction'
let {
  AnnualDocketLoads,
  AnnualDocketTrends,
  AnnualOpinionLoads,
  AnnualOpinionTrends,
} = ROUTES.LawSchool
let { LawSchools } = ROUTES.LitigationResearch
export default {
  components: { GridAllOpinionsByLargeYearsOfJurisdiction, TopBarOfTableOdt },
  computed: {
    subsTabTrendLine() {
      let { query, params } = this.$route
      let _by = query[`by`]
      let tabs = [
        generateToSub(AnnualDocketLoads, query),
        generateToSub(AnnualDocketTrends, query),
        generateToSub(AnnualOpinionLoads, query),
        generateToSub(AnnualOpinionTrends, query),
      ]
      let idFullScreen = `law-school-detail-trendline`
      let school = `${params['school']}`
      let rootPathLink = `${LawSchools.path}/${school}/trendline`
      let valuesTabsDockets = [AnnualDocketLoads.path, AnnualDocketTrends.path]
      let valuesTabsOpinions = [
        AnnualOpinionLoads.path,
        AnnualOpinionTrends.path,
      ]
      if (!_by || valuesTabsDockets.includes(_by)) {
        rootPathLink = `${rootPathLink}/dockets/year`
      } else if (valuesTabsOpinions.includes(_by)) {
        rootPathLink = `${rootPathLink}/opinions/year`
      } else {
        rootPathLink = `${rootPathLink}/dockets/year`
      }
      return {
        tabs,
        idFullScreen,
        rootPathLink,
      }
    },
  },
}
</script>

<style scoped></style>
