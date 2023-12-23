<template>
  <div :id="subsDocketTracker.idFullScreen">
    <TopBarOfTableOdt v-bind="subsDocketTracker" />
    <GridAllDocketsODT height="72.5vh" :options="{ noQueryParams: true }" />
  </div>
</template>

<script>
import GridAllDocketsODT from '~/features/odt/GridAllDocketsODT'
import { generateToSub } from '~/features/odt/helpers/function'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { DocketInformation, TimeMetrics, CapacityAs } = ROUTES.DocketTracker
export default {
  components: {
    TopBarOfTableOdt,
    GridAllDocketsODT,
  },
  computed: {
    subsDocketTracker() {
      let {
        query,
        params: { pathMatch },
      } = this.$route
      let idFullScreen = `tracker-${pathMatch}-page`
      let queryRoot = { ...query }
      delete queryRoot['by']
      let tabs = [
        generateToSub(DocketInformation, query, { query: { ...queryRoot } }),
        generateToSub(TimeMetrics, query),
        generateToSub(CapacityAs, query),
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
