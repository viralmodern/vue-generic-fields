<template functional> </template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let {
      name,
      params: { document },
    } = route
    if (name.localeCompare('odt-deposition-explorer-document') === 0) {
      if (document) {
        redirect(`/odt/deposition/explorer/${document}/text`)
      } else {
      }
    }
    return false
  },
}
</script>

<style scoped></style>
