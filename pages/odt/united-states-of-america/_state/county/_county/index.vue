<template functional></template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let { params } = route
    redirect({
      name: `odt-united-states-of-america-state-county-county-judge`,
      params,
    })
  },
}
</script>

<style scoped></style>
