<template functional> </template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let { name } = route
    if (name.localeCompare('odt-bookmarked') === 0) {
      redirect(`/odt/bookmarked/opinions`)
    }
    return false
  },
}
</script>

<style scoped></style>
