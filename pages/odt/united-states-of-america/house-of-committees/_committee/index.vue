<template functional></template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let { params } = route
    redirect({
      name: `odt-united-states-of-america-house-of-committees-committee-sub-committee`,
      params,
    })
  },
}
</script>

<style scoped></style>
