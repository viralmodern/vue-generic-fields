<template>
  <v-chip small :color="color" class="px-1 white--text ma-1">
    <span class="ml-1">{{ text }}</span>
  </v-chip>
</template>
<script>
export default {
  props: {
    color: String,
    text: String
  }
};
</script>
