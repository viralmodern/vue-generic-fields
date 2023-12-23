<template>
  <v-chip small :color="typeColor" class="px-1 white--text ma-1">
    <span class="ml-1">{{ type }}</span>
  </v-chip>
</template>
<script>
import { types } from "../../config.js";

export default {
  props: {
    type: String
  },
  computed: {
    typeColor() {
      return (
        types.find(x => x.name === this.type) || {
          color: "primary"
        }
      ).color;
    }
  }
};
</script>
