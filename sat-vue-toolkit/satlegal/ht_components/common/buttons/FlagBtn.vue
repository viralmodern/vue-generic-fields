<template>
  <a class="ma-0 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small" @click="$emit('update', !isActive)" icon>
    <v-icon :color="isActive ? 'red' : 'grey lighten-2'">mdi-flag</v-icon>
  </a>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  }
};
</script>
