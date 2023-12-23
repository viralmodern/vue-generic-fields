<template>
  <v-container fluid>
    <GridAllSearchHistoryOdt height="88.5vh" />
  </v-container>
</template>

<script>
import GridAllSearchHistoryOdt from '~/features/odt/GridAllSearchHistoryOdt'
export default {
  components: { GridAllSearchHistoryOdt },
  head() {
    return {
      title: 'Search History',
    }
  },
}
</script>

<style scoped></style>
