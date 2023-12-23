<template>
  <v-container fluid>
    <div>
      <!--      {{ $route.name }}-->
      <HomeCongressBillsOfUSAOdt height="71vh" />
    </div>
  </v-container>
</template>

<script>
import HomeCongressBillsOfUSAOdt from '~/features/odt/HomeCongressBillsOfUSAOdt'
export default {
  components: { HomeCongressBillsOfUSAOdt },
}
</script>

<style scoped></style>
