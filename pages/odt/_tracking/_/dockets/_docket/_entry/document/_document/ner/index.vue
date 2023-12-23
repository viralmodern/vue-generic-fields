<template functional> </template>

<script>
export default {
  middleware({ store, redirect, route }) {
    let { path } = route
    redirect({
      path: `${
        (path.endsWith('/') && `${path}`) || `${path}/`
      }name-entity-recognition`,
    })
  },
}
</script>

<style scoped></style>
