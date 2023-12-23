<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card class="px-2">
        <v-card-title class="text-h5">Add new tax rate</v-card-title>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="name"
              :rules="[v => !!v || 'This field is required']"
              label="Name tax rate"
              required
            ></v-text-field>
          </v-row>
          <v-row class="my-1" no-gutters>
            <v-col>
              <span class="caption font-weight-bold">Rate:</span>
            </v-col>
            <v-col class="mt-3">
              <v-slider
                v-model="rate"
                :thumb-size="24"
                thumb-label="always"
              ></v-slider>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      valid: true,
      name: "",
      rate: "",
      menu: false
    };
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          id: Math.random(),
          name: this.name,
          rate: this.rate
        };
        this.$emit("addExpense", data);
        this.$refs.form.reset();
        this.$emit("closeModal");
        this.rate = "";
      }
    }
  }
};
</script>
