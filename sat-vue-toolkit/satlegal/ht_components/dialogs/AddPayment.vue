<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="cancel" width="500" persistent>
      <v-card class="px-2">
        <v-card-title class="text-h5">Add new payment</v-card-title>
        <v-divider></v-divider>
        <v-form class="pa-3" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="invoice"
              :rules="[v => !!v || 'This field is required']"
              :items="dataInvoice"
              label="Invoice"
              item-value="id"
              item-text="invoice"
            ></v-select>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuDatePayment"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="paymentDate"
                  readonly
                  label="Payment date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="paymentDate"
                @input="menuDatePayment = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters>
            <v-menu
              v-model="menuDateInvoice"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="[v => !!v || 'This field is required']"
                  v-model="invoiceDate"
                  readonly
                  label="Invoice date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                no-title
                v-model="invoiceDate"
                @input="menuDateInvoice = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-select
              v-model="paymentMethod"
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
            <v-textarea
              v-model="note"
              auto-grow
              :rules="[v => !!v || 'This field is required']"
              label="Note"
              required
            ></v-textarea>
          </v-row>
          <v-row no-gutters class="my-1">
            <v-text-field
              class="py-1"
              v-model="amount"
              mask="#############"
              :rules="[v => !!v || 'This field is required']"
              label="Amount"
              required
            ></v-text-field>
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
    isShow: Boolean,
    dataInvoice: Array
  },
  data() {
    return {
      paymentMethods,
      valid: true,
      menuDatePayment: false,
      menuDateInvoice: false,
      paymentDate: "",
      invoiceDate: "",
      client: "",
      paymentMethod: "",
      note: "",
      amount: "",
      invoice: ""
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
          paymentDate: this.paymentDate,
          invoiceDate: this.invoiceDate,
          client: 1,
          paymentMethod: this.paymentMethod,
          note: this.note,
          amount: this.amount,
          invoice: this.invoice
        };
        this.$emit("addPayment", data);
        this.$refs.form.reset();
        this.$emit("closeModal");
      }
    }
  }
};
</script>
