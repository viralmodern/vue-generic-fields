<template>
  <div :id="subsDocketEntries.idFullScreen">
    <TopBarOfTableOdt v-bind="subsDocketEntries" />
    <GridEntriesDocketsOdt height="67vh" />
  </div>
</template>

<script>
import GridEntriesDocketsOdt from '~/features/odt/GridEntriesDocketsOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import { generateToSub } from '~/features/odt/helpers/function'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
export default {
  components: { TopBarOfTableOdt, GridEntriesDocketsOdt },
  computed: {
    subsDocketEntries() {
      let {
        $route: {
          query,
          params: { docket },
        },
      } = this
      let queryRoot = { ...query }
      delete queryRoot['by']
      let t = {
        name: 'odt-tracking-all-dockets-docket-index-entries',
        params: { ...this.$route.params },
      }
      let {
        TimeMetrics,
        EntryInformation,
        Projections,
        ReadingMetrics,
      } = ROUTES.DocketEntries
      let tabs = [
        // generateToSub(EntryInformation, query, { query: { ...queryRoot } }),
        generateToSub(EntryInformation, query, t),
        generateToSub(ReadingMetrics, query, t),
        generateToSub(TimeMetrics, query, t),
        generateToSub(Projections, query, t),
      ]
      let idFullScreen = `docket-detail-${docket}-entries`
      return {
        tabs,
        idFullScreen,
      }
    },
  },
}
</script>

<style scoped></style>
