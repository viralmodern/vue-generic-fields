<template>
  <div>
    <v-slider v-model="slider"
              hide-details dense
              :label="slider + '%'"
              thumb-label></v-slider>
  </div>
</template>

<script>
  export default {
    name: "BuilderSlider",
    data() {
      return {
        slider: 45,
      }
    },
  }
</script>

<style scoped>

</style>
