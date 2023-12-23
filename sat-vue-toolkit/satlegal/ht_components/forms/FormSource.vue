<template>
  <div class="mx-2 mt-2" style="width:200px">
    <v-text-field v-model="value" label="Name" required></v-text-field>
    <v-row class="justify-space-between">
      <v-btn @click="$emit('close')" class="mx-0" small>Close</v-btn>
      <v-btn @click="submit" small class="mx-0 primary">Save</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.value);
    }
  },
  mounted() {
    this.value = this.text;
  }
};
</script>
