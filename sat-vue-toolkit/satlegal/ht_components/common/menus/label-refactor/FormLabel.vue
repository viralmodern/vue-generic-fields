<template>
  <div class="mx-2 mt-2">
    <ColorPicker :color="color" :text="text" @emitColorValue="change" />
    <v-row no-gutters class="justify-space-between">
      <v-btn @click="$emit('closeAdd')" class="mx-0" small>Close</v-btn>
      <v-btn @click="submit" small class="mx-0 primary" :loading="loading">Save</v-btn>
    </v-row>
  </div>
</template>

<script>
import ColorPicker from "../../inputs/ColorPicker";
export default {
  components: {
    ColorPicker
  },
  props: {
    text: String,
    color: String,
    loading: Boolean,
  },
  data() {
    return {
      label: {}
    };
  },
  methods: {
    change(label) {
      this.label = label;
    },
    submit() {
      this.$emit("submit", this.label);
    }
  }
};
</script>
