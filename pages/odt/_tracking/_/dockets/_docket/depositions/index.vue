<template>
  <div>
    <slot name="header"></slot>
    <v-container fluid>
      <GridAllDeposition
        height="72vh"
        :path-link-row-detail="pathLinkRowDetail"
      />
    </v-container>
  </div>
</template>

<script>
import GridAllDeposition from '~/features/odt/GridAllDeposition'
export default {
  components: { GridAllDeposition },
  computed: {
    pathLinkRowDetail() {
      let {
        params: { docket },
      } = this.$route
      return `${this.$$isTrackerDocketsOdt}/${docket}/depositions`
    },
  },
}
</script>

<style scoped></style>
