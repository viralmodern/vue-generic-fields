<template>
  <v-card class="message" color="grey lighten-3" light>
    <v-card-text class="pa-2">{{ message }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    message: String
  }
};
</script>

<style scoped>
.message {
  border-radius: 10px;
  border-top-left-radius: 0px;
}
</style>
