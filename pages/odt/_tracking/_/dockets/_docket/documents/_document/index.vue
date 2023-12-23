<template functional></template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let {
      params: { document, docket, pathMatch, tracking },
    } = route
    return redirect(
      `/odt/${tracking}/${pathMatch}/dockets/${docket}/documents/${document}/text`
    )
  },
}
</script>

<style scoped></style>
