<template>
  <v-container fluid pa-0>
    <GridAllRecentVisitOdt height="90vh" />
  </v-container>
</template>

<script>
import GridAllRecentVisitOdt from '~/features/odt/GridAllRecentVisitOdt'
export default {
  components: { GridAllRecentVisitOdt },
  head() {
    return {
      title: 'Recent Visit',
    }
  },
}
</script>

<style scoped></style>
