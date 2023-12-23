<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row no-gutters class="align-center">
      <v-col cols="9">
        <v-text-field
          v-model="name"
          label="name list"
          :rules="[v => !!v || 'Name list is required']"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-row no-gutters>
          <v-btn icon class="ma-0" @click="add">
            <v-icon color="primary">check</v-icon>
          </v-btn>
          <v-btn icon class="ma-0" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      name: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.$emit("addGroup", this.name);
        this.clear();
      }
    },
    clear() {
      this.name = "";
      this.$refs.form.resetValidation();
    },
    close() {
      this.$emit("closeAdd");
    }
  }
};
</script>
