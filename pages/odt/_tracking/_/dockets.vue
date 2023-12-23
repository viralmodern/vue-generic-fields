<template>
  <div>
    <nuxt-child :key="$route.params.docket" />
    <ThePanelSearchInsideDocket />
  </div>
</template>

<script>
import { mutations } from '~/features/odt/store/docketOdtDetail'
import ThePanelSearchInsideDocket from '~/features/odt/ThePanelSearchInsideDocket'
export default {
  components: { ThePanelSearchInsideDocket },
  head() {
    return {
      title: this.getLabelTracker,
    }
  },
  computed: {
    getLabelTracker() {
      let { $$isTrackerDocketsOdt, $route } = this
      let a = this.$store.getters['publicTrackersOdt/trackerDetail']
      return $$isTrackerDocketsOdt && a ? a.name : 'All Dockets'
    },
  },
  created() {
    mutations.updateDetail(null)
  },
}
</script>

<style scoped></style>
