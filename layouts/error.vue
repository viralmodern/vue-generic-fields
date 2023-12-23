<template>
  <v-container class="fill-height">
    <v-card class="mx-auto my-auto" max-width="45%" outlined>
      <v-card-text>
        <img class="pic-404 mx-auto" :src="errorCase.img" />
      </v-card-text>
      <v-card-title class="text-h6">
        <div v-html="errorCase.message"></div>
      </v-card-title>
      <v-card-text>
        <nuxt-link to="/">Home page</nuxt-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'blog',
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      pic500: '/img/undraw_server_down_s4lk.svg',
      pic404: '/img/undraw_page_not_found_su7k.svg',
      pic403: '/img/undraw_access_denied_6w73.svg',
      picError: '/img/undraw_cancel_u1it.svg',
    }
  },
  computed: {
    errorCase() {
      let mss = {
        img: this.picError,
        message: this.otherError,
      }
      try {
        let statusCode = this.error.statusCode
        if (statusCode === 404) {
          mss.img = this.pic404
          mss.message = this.error.message || this.pageNotFound
        } else if (statusCode === 403) {
          mss.img = this.pic403
          mss.message = this.error.message
        } else if (statusCode === 1502) {
          mss.message = 'Law practice management software made easy.'
        } else if (statusCode >= 500) {
          mss.img = this.pic500
          mss.message = this.error.message || this.otherError
        }
        return mss
      } catch (e) {
        return mss
      }
    },
  },
}
</script>

<style scoped>
.pic-404 {
  display: block;
  max-width: 30%;
}
</style>
