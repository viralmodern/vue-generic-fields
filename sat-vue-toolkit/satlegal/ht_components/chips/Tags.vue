<template>
  <v-chip
    class="my-2"
    :color="color || 'primary'"
    label
    text-color="white"
  >
    <v-icon left>mdi-label</v-icon>
    {{text}}
  </v-chip>
</template>

<script>
export default {
  props: {
    color: String,
    text: String,
  }
};
</script>
