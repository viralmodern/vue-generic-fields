<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card class="px-2">
        <v-card-title class="text-h5">Add new payment</v-card-title>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="method"
              :rules="[v => !!v || 'This field is required']"
              :items="paymentMethods"
              attach
              chips
              label="Payment method"
              item-value="id"
              item-text="name"
            ></v-select>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-menu
              v-model="menuDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="date"
                  readonly
                  label="Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="date"
                @input="menuDate = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="paid"
              mask="#############"
              :rules="[v => !!v || 'This field is required']"
              label="Paid"
              placeholder="$"
              required
            ></v-text-field>
          </v-row>
          <v-row class="my-1">
            <v-text-field
              class="py-1"
              v-model="balance"
              mask="#############"
              :rules="[v => !!v || 'This field is required']"
              label="Balance"
              placeholder="$"
              required
            ></v-text-field>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-menu
              v-model="menuProgress"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="progress"
                  readonly
                  label="Progress"
                  placeholder="%"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-card>
                <v-slider
                  class="pa-4"
                  v-model="progress"
                  :thumb-size="24"
                  thumb-label="always"
                ></v-slider>
              </v-card>
            </v-menu>
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
import { paymentMethods } from "../../config";
export default {
  props: {
    isShow: Boolean
  },
  data() {
    return {
      paymentMethods,
      method: "",
      valid: true,
      menuDate: false,
      menuProgress: false,
      progress: "",
      date: "",
      paid: "",
      balance: ""
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
          method: this.method,
          date: this.date,
          paid: this.paid,
          balance: this.balance,
          note: [1, 2],
          progress: this.progress
        };
        this.$emit("addPayment", data);
        this.$refs.form.reset();
        this.progress = "";
        this.$emit("closeModal");
      }
    }
  }
};
</script>
