<template>
  <div>
    <GridSearchResultsDocketsOdt :docket-id="docketId" height="80.5vh" />
  </div>
</template>

<script>
import GridSearchResultsDocketsOdt from '~/features/odt/GridSearchResultsDocketsOdt'
import { actions } from '~/features/odt/store/docketOdtDetail'
export default {
  components: { GridSearchResultsDocketsOdt },
  computed: {
    docketId() {
      return this.$route.params.docket || this.$route.query.docket
    },
  },
  created() {
    try {
      const {
        params: { pathMatch },
      } = this.$route
      let params = {}
      if (this.$$isTrackerDocketsOdt) {
        params = {
          trackerlink__tracker: pathMatch,
        }
      }
      actions.fetchDocketDetail(this.docketId, this.$api, params)
    } catch (e) {}
  },
}
</script>

<style scoped></style>
