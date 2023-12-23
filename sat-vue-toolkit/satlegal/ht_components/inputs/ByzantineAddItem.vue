<template>
  <v-row no-gutters class="align-center">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field v-model="name" label="Item name" :rules="[v => !!v || 'Name is required']"></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-btn icon class="ma-0" @click="add">
      <v-icon color="primary">check</v-icon>
    </v-btn>
    <v-btn icon class="ma-0" @click="close">
      <v-icon >close</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      valid: true
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        this.$emit("add", this.name);
        this.close()
      }
    },
    close(){
      this.$emit("closeAddItem")
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    }
  }
};
</script>