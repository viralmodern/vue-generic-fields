<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-app-bar :clipped-left="clipped" fixed app flat dense>
      <router-link to="/" class="text-decoration-none d-flex align-center">
        <v-avatar size="25">
          <img src="~/assets/img/logo_thumb.png" alt="" />
        </v-avatar>
        <div class="mx-1"></div>
        <v-toolbar-title class="text-decoration-none">{{
          $$productName
        }}</v-toolbar-title>
      </router-link>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware({ store, redirect, route }) {
    if (store.getters['auth/isLoggedIn']) {
      // let path = route.query['redirect'] || '/'
      // return redirect(path)
    }
  },
  data() {
    return {
      clipped: true,
      mainUrl: '',
    }
  },
}
</script>

<style lang="scss">
.link_head {
  /*border: solid 1px red;*/
  text-decoration: none;
}
</style>
