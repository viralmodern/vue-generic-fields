<template>
  <v-container fluid>
    <TheTopBarOdt>
      <v-toolbar-items>
        <v-btn text to="/odt/admin" :input-value="false" exact>
          <v-icon> mdi-account-circle</v-icon>
        </v-btn>
        <v-divider vertical class="mx-1" />
        <template v-for="link in links">
          <v-btn
            :key="link.path"
            text
            :to="link.path"
            class="text-capitalize font-weight-regular caption"
            v-text="link.label"
          />
        </template>
      </v-toolbar-items>
    </TheTopBarOdt>
    <nuxt-child />
  </v-container>
</template>

<script>
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
import { Administrator } from '~/features/odt/helpers/odt.json'
export default {
  components: { TheTopBarOdt },
  middleware({ store, redirect, route }) {
    // if (!store.getters['auth/isLoggedIn']) {
    //   let query = { redirect: route.fullPath }
    //   redirect({ path: '/auth/login', query })
    // }
  },
  head() {
    return {
      title: 'ODT Administrator',
    }
  },
  props: {
    links: {
      type: Array,
      default: () => [Administrator.trackers],
    },
  },
}
</script>

<style scoped></style>
