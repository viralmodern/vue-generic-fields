<template>
  <v-list-item-avatar :color="backgroundColor">
    <span class="white--text">{{ name }}</span>
  </v-list-item-avatar>
</template>
<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "primary"
    },
    name: String
  }
};
</script>