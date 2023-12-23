<template>
  <v-container fluid>
    <HomeCollegeAndUniversitiesOfEducationOdt height="74vh" />
  </v-container>
</template>

<script>
export default {
  components: {
    HomeCollegeAndUniversitiesOfEducationOdt: () =>
      import('~/features/odt/HomeCollegeAndUniversitiesOfEducationOdt'),
  },
}
</script>

<style scoped></style>
