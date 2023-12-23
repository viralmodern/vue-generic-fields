<template>
  <v-container fluid>
    <GridAllLitigationOfDocketTracker />
  </v-container>
</template>

<script>
export default {
  components: {
    GridAllLitigationOfDocketTracker: () =>
      import(
        /* webpackChunkName: "GridAllLitigationOfDocketTracker" */ '~/features/odt/GridAllLitigationOfDocketTracker'
      ),
  },
}
</script>

<style scoped></style>
