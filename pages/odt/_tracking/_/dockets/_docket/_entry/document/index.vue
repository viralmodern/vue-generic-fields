<template functional> </template>

<script>
export default {
  middleware({ store, redirect, route }, error) {
    return error({
      message: `Entry Document not found`,
      statusCode: 404,
    })
  },
}
</script>

<style scoped></style>
