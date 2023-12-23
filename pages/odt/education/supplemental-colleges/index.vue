<template>
  <v-container fluid>
    <!--    {{ $route.name }}-->
    <HomeSupplementalCollegesOfEducationOdt height="74vh" />
  </v-container>
</template>

<script>
export default {
  components: {
    HomeSupplementalCollegesOfEducationOdt: () =>
      import('~/features/odt/HomeSupplementalCollegesOfEducationOdt'),
  },
}
</script>

<style scoped></style>
