<template functional></template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let { params } = route
    console.error('PARAMS', route)
    redirect({
      name: `odt-united-states-of-america-state-county`,
      params,
    })
  },
}
</script>

<style scoped></style>
