<template>
  <v-container fluid>
    <div>
      <!--<div>
        {{ $route.name }}
      </div>-->
      <HomeHistoricalCongressMembersOfUSAOdt height="74vh" />
    </div>
  </v-container>
</template>

<script>
import HomeHistoricalCongressMembersOfUSAOdt from '~/features/odt/HomeHistoricalCongressMembersOfUSAOdt'
export default {
  components: { HomeHistoricalCongressMembersOfUSAOdt },
}
</script>

<style scoped></style>
