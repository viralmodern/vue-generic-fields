<template>
  <v-container fluid>
    <!--    {{ $route.name }}-->
    <HomePublicSchoolsOfEducationOdt height="74vh" />
  </v-container>
</template>

<script>
export default {
  components: {
    HomePublicSchoolsOfEducationOdt: () =>
      import('~/features/odt/HomePublicSchoolsOfEducationOdt'),
  },
}
</script>

<style scoped></style>
