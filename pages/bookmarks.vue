<template>
  <v-main>
    <v-container fluid>
      <h3 class="d-flex align-center mb-3">
        <v-icon>mdi-bookmark</v-icon>
        <p class="ma-0 mx-1"></p>
        Bookmarks
      </h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <GridAllBookMarks />
    </v-container>
  </v-main>
</template>

<script>
import GridAllBookMarks from '~/components/utils/GridAllBookMarks'

export default {
  components: { GridAllBookMarks },
  layout: 'app',
  /* middleware({ store, redirect, route }) {
       if (!store.getters['auth/isLoggedIn']) {
         let query = { redirect: route.fullPath }
         redirect({ path: '/auth/login', query })
       }
     },*/
  mounted() {
    this.fetchBookmarks()
    this.a = '#ff0000'
  },
  methods: {
    fetchBookmarks() {},
  },
}
</script>

<style scoped></style>
