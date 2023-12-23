<template>
  <div></div>
</template>

<script>
export default {
  middleware({ store, redirect, route }) {
    // If the user is not authenticated
    const {
      params: { opinion },
    } = route
    let pathText = `/odt/opinions/${opinion}/text`
    return redirect(pathText)
  },

  props: {
    detail: {},
  },
  mounted() {},
}
</script>

<style scoped></style>
