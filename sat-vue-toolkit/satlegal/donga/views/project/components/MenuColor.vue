<template>
  <v-card-text class="pa-0" style="width: 40px; max-height: 45vh;">
    <v-btn v-for="color in colors"
           :key="color"
           :color="'#'+color"
           fab
           dark
           small
           @click="changeColor(color)" style="width: 20px; height: 20px;">
      <v-icon v-if="color === selectedColor" color="#fff">check</v-icon>
    </v-btn>
  </v-card-text>
</template>

<script>
  import {COLORS} from "./constant";

  export default {
    name: "MenuColor",
    data() {
      return {
        colors: COLORS,
        selectedColor: ''
      }
    },
    methods: {
      changeColor(_color) {
        this.selectedColor = _color;
        this.$emit("getColorStage", _color);
      }
    }
  }
</script>

<style scoped>

</style>
