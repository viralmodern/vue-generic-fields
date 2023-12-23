<template>
  <v-row class="ml-2 justify-center align-center" no-gutters>
    <v-col cols="10">
      <v-text-field
        :rules="TimerRules"
        v-model="description"
        :label="label"
        required
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-btn @click="createTimeTracking" large icon>
        <v-icon color="primary" size="30">mdi-add_circle</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    label: String
  },
  data() {
    return {
      description: null,
      TimerRules: [v => !!v || "Tracking name is required."]
    };
  },
  methods: {
    createTimeTracking() {
      this.$emit("createTimeTracking", this.description);
    }
  }
};
</script>
