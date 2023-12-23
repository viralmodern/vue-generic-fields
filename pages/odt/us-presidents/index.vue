<template>
  <v-container fluid>
    <div :id="subsPresidents.idFullScreen">
      <TopBarOfTableOdt v-bind="subsPresidents" />
      <GridAllUsPresidents height="77vh" />
    </div>
  </v-container>
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
import GridAllUsPresidents from '~/features/odt/GridAllUsPresidents'
export default {
  components: { GridAllUsPresidents, TopBarOfTableOdt },
  computed: {
    subsPresidents() {
      let {
        Profile,
        AnnualOpinionLoads,
        AnnualOpinionTrend,
        AnnualDocketLoads,
        AnnualDocketTrend,
      } = ROUTES.UsPresidents
      let { USPresidents } = ROUTES.LitigationResearch
      let {
        $route: { query },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let tabs = [
        generateToSub(Profile, queryRoot, { path: `${USPresidents.path}` }),
        generateToSub(AnnualOpinionLoads, query),
        generateToSub(AnnualOpinionTrend, query),
        generateToSub(AnnualDocketLoads, query),
        generateToSub(AnnualDocketTrend, query),
      ]
      let idFullScreen = `home-us-presidents`
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
