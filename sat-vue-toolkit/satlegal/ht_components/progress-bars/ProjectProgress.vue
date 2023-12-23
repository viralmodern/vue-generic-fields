<template>
  <v-row no-gutters class="mt-3">
    <v-slider
      :value="value"
      readonly
      thumb-label="always"
      thumb-size="20"
      color="success"
    ></v-slider>
  </v-row>
</template>
<script>
export default {
  props: {
    value: Number
  }
};
</script>
