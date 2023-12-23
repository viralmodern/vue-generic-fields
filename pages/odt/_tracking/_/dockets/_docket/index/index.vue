<template>
  <div></div>
</template>

<script>
export default {
  functional: true,
  middleware({ store, redirect, from, route }) {
    const { params } = route
    let name = 'odt-tracking-all-dockets-docket-index-parties'
    redirect({ name, params })
  },
}
</script>

<style scoped></style>
