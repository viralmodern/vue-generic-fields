<template>
  <v-container fluid>
    <div>
      <TopBarStateCountyDetail />
      <v-divider />
      <nuxt-child />
    </div>
  </v-container>
</template>

<script>
import TopBarStateCountyDetail from '~/features/odt/TopBarStateCountyDetail'
export default {
  components: { TopBarStateCountyDetail },
}
</script>

<style scoped></style>
