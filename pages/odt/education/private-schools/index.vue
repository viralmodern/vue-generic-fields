<template>
  <v-container fluid>
    <!--    {{ $route.name }}-->
    <HomePrivateSchoolsOfEducationOdt height="74vh" />
  </v-container>
</template>

<script>
export default {
  components: {
    HomePrivateSchoolsOfEducationOdt: () =>
      import('~/features/odt/HomePrivateSchoolsOfEducationOdt'),
  },
}
</script>

<style scoped></style>
