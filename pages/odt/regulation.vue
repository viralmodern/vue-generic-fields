<template>
  <v-card class="fill-height">
    <v-app-bar dense flat app :color="$vuetify.theme.dark ? '' : 'white'">
      <p class="title mb-0">
        Code of Federal Regulations
      </p>
      <v-spacer />
      <!--      <TopBarAuthODT />-->
    </v-app-bar>
    <v-container fluid fill-height pt-0>
      <div class="w-100">
        <v-divider />
        <div class="mb-4"></div>
      </div>
      <nuxt-child class="fill-height w-100" />
    </v-container>
  </v-card>
</template>

<script>
import TopBarAuthODT from '~/features/odt/TopBarAuthODT'

export default {
  components: { TopBarAuthODT },
}
</script>

<style scoped></style>
