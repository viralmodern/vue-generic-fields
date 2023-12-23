<template>
  <v-chip
    small
    :color="typeColor"
    :class="[xSmall && 'v-chip--x-small','white--text']"
  >{{ text }}</v-chip>
</template>
<script>
import { roles } from "../../config.js";

export default {
  props: {
    text: String,
    xSmall: Boolean
  },
  computed: {
    typeColor() {
      return (
        roles.find(x => x.name === this.text) || {
          color: "primary"
        }
      ).color;
    }
  }
};
</script>
<style scoped>
.v-chip--x-small {
  font-size: 10px;
  height: 16px !important;
}
</style>



