<template>
  <v-container fluid>
    <div>
      <!-- {{ $route.name }}-->
      <HomeHouseOfRepresentativesOfUSAOdt />
    </div>
  </v-container>
</template>

<script>
import HomeHouseOfRepresentativesOfUSAOdt from '~/features/odt/HomeHouseOfRepresentativesOfUSAOdt'

export default {
  components: { HomeHouseOfRepresentativesOfUSAOdt },
}
</script>

<style scoped></style>
