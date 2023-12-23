<template>
  <v-container fluid>
    <div>
      <!--<div>
        {{ $route.name }}
      </div>-->
      <HomeCongressMembersOfUSAOdt height="74vh" />
    </div>
  </v-container>
</template>

<script>
import HomeCongressMembersOfUSAOdt from '~/features/odt/HomeCongressMembersOfUSAOdt'
export default {
  components: { HomeCongressMembersOfUSAOdt },
}
</script>

<style scoped></style>
