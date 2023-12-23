<template functional></template>

<script>
export default {
  middleware({ store, redirect, route }) {
    let {
      params: { docket, document, pathMatch, tracking },
    } = route
    redirect(
      `/odt/${tracking}/${pathMatch}/dockets/${docket}/entities/entity-explorer/${document}/heatmap-mentioned/calendar`
    )
  },
}
</script>

<style scoped></style>
