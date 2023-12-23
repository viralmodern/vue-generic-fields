<template functional></template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let {
      params: { deposition, docket, pathMatch, tracking },
    } = route
    return redirect(
      `/odt/${tracking}/${pathMatch}/dockets/${docket}/depositions/${deposition}/text`
    )
  },
}
</script>

<style scoped></style>
