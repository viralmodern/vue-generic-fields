<template functional>
  <div>
    {{ $route.name }}
  </div>
</template>

<script>
export default {
  async middleware({ store, redirect, route }) {
    let { params } = route
    redirect({
      name: `odt-education-college-and-universities`,
      params,
    })
  },
}
</script>

<style scoped></style>
