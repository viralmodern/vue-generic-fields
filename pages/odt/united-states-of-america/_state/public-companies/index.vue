<template>
  <v-container fluid>
    <div>
      <TopBarPublicTradedCompaniesOdt />
      <GridAllPublicTradedCompaniesOfStateOdt height="71vh" />
    </div>
  </v-container>
</template>

<script>
import GridAllPublicTradedCompaniesOfStateOdt from '~/features/odt/GridAllPublicTradedCompaniesOfStateOdt'
import TopBarPublicTradedCompaniesOdt from '~/features/odt/TopBarPublicTradedCompaniesOdt'
export default {
  components: {
    TopBarPublicTradedCompaniesOdt,
    GridAllPublicTradedCompaniesOfStateOdt,
  },
}
</script>

<style scoped></style>
