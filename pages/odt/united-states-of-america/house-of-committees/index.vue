<template>
  <v-container fluid>
    <div>
      <!--      {{$route.name}}-->
      <GridAllHouseOfCommitteesOfUSAOdt height="78vh" />
    </div>
  </v-container>
</template>

<script>
import GridAllHouseOfCommitteesOfUSAOdt from '~/features/odt/GridAllHouseOfCommitteesOfUSAOdt'
export default {
  components: { GridAllHouseOfCommitteesOfUSAOdt },
}
</script>

<style scoped></style>
