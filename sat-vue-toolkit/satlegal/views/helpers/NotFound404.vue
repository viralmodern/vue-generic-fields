<template>
  <v-row class="justify-center align-center" no-gutters>
    <v-col cols="12" class="text-xs-center">
      <v-col class="justify-center align-center" style="display: flex;">
        <img width="15%" src="../../assets/NotFound404.png" />
        <span class="text-h1">404</span>
      </v-col>
      <h3 class="text-h5">{{ pageNotFound }}</h3>
      <span>{{ description }}</span>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      pageNotFound: "Page not found",
      description:
        "We're sorry, the page you requested could not be found. Please go back to the homepage or contact us at support@satproject.me"
    };
  }
};
</script>
