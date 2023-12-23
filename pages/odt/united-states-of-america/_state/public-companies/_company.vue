<template>
  <v-container fluid>
    <TopBarPublicTradedCompanyDetailOdt />
    <v-divider />
    <nuxt-child />
  </v-container>
</template>

<script>
import TopBarPublicTradedCompanyDetailOdt from '~/features/odt/TopBarPublicTradedCompanyDetailOdt'
export default {
  components: { TopBarPublicTradedCompanyDetailOdt },
}
</script>

<style scoped></style>
