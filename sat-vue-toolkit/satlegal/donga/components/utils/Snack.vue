<template>
  <v-snackbar
    v-model="snackbar"
    :multi-line="mode === 'multi-line'"
    right
    :timeout="timeout"
    top
    :vertical="mode === 'vertical'"
  >
    {{ title }}
    <v-btn color="pink" @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snack",
  created() {
    this.$eventHub.$on(this.$eventTypes.snackNotify, message => {
      this.snackbar = true;
      this.title = message;
    });
  },
  data() {
    return {
      y: "top",
      x: null,
      mode: "",
      timeout: 3000,
      snackbar: false,
      title: ""
    };
  }
};
</script>

<style scoped></style>
