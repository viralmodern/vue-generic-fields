<template>
  <v-chip small :color="roleColor" class="px-1 white--text ma-1">
    <span class="ml-1">{{ role }}</span>
  </v-chip>
</template>
<script>
import { showRolesContact } from "../../config.js";

export default {
  props: {
    role: String
  },
  computed: {
    roleColor() {
      return (
        showRolesContact.find(x => x.name === this.role ) || {
          color: "primary"
        }
      ).color;
    }
  }
};
</script>
