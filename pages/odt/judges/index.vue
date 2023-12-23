<template>
  <v-container fluid>
    <HomeJudgesOdt />
  </v-container>
</template>
<script>
export default {
  components: {
    HomeJudgesOdt: () => import('~/features/odt/HomeJudgesOdt'),
  },
}
</script>

<style scoped></style>
