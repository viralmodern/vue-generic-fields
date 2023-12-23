<template functional></template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let { params } = route
    redirect({
      name: `odt-united-states-of-america-state-bills-bill-bill-actions`,
      params,
    })
  },
}
</script>

<style scoped></style>
