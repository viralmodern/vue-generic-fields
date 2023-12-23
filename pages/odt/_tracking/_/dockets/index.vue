<template>
  <v-container fluid>
    <div :id="subsDocketTracker.idFullScreen">
      <TopBarOfTableOdt v-bind="subsDocketTracker" />
      <GridAllDocketsODT height="72vh" :include-params="includeParams" />
      <TheModalPanelTrackerUserActions />
    </div>
  </v-container>
</template>

<script>
import GridAllDocketsODT from '~/features/odt/GridAllDocketsODT'
import TheModalPanelTrackerUserActions from '~/features/odt/TheModalPanelTrackerUserActions'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
let {
  DocketInformation,
  TimeMetrics,
  CapacityAs,
  CaseName,
} = ROUTES.DocketTracker
export default {
  components: {
    TopBarOfTableOdt,
    TheModalPanelTrackerUserActions,
    GridAllDocketsODT,
  },
  computed: {
    includeParams() {
      try {
        if (this.$$isTrackerDocketsOdt) {
          let trackerlink__tracker = this.$route.params.pathMatch
          return {
            trackerlink__tracker,
          }
        }
        return {}
      } catch (e) {
        return {}
      }
    },
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
