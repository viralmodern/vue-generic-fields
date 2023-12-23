<template>
  <div></div>
</template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let { params, name, query } = route
    redirect({
      name: `${name}-business`,
      params,
      query,
    })
  },
}
</script>

<style scoped></style>
