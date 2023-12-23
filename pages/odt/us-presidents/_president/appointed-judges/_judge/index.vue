<template functional></template>

<script>
export default {
  middleware({ store, redirect, route }) {
    console.log(route)
    let { path } = route
    let strPath = path.endsWith('/') ? `${path}` : `${path}/`
    redirect({
      path: `${strPath}about`,
    })
  },
}
</script>

<style scoped></style>
