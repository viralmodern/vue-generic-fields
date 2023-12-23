<template>
  <v-container fluid>
    <div>
      <TopBarBillStateOdt />
      <nuxt-child />
    </div>
  </v-container>
</template>

<script>
import TopBarBillStateOdt from '~/features/odt/TopBarBillStateOdt'
export default {
  components: { TopBarBillStateOdt },
}
</script>

<style scoped></style>
