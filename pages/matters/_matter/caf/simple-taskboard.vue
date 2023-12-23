<template>
  <v-main>
    <v-container fluid>
      <nuxt-child />
    </v-container>
  </v-main>
</template>

<script>
function view(name, resolve) {
  // eslint-disable-line
  return function (resolve) {
    return require([
      `../../../../features/taskboard/views/${name}.vue`,
    ], resolve)
  }
}

export default {
  name: 'simple-taskboard',
  components: {
    FeatureBoard: view('Dashboard'),
    FeatureTaskBoard: view('TaskDashboard'),
  },
}
</script>

<style scoped></style>
