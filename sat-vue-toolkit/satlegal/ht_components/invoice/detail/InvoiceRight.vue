<template>
  <div>
    <div class="subheading">Invoice Settings</div>
    <v-divider class="my-1"></v-divider>
    <div>
      <v-row no-gutters class="align-center">
        <v-text-field
          label="Discount"
          type="number"
          :value="dataInvoiceBuilder.discount"
          :rules="[v => v <= 100 || 'Discount <= 100']"
          @change="change('discount', $event)"
          placeholder="Enter number"
          :disabled="!switchDiscount"
          suffix="%"
        ></v-text-field>
        <v-switch
          v-model="switchDiscount"
          hide-details
          class="ma-0 pa-0"
          style="justify-content: flex-end;"
        ></v-switch>
      </v-row>
    </div>
    <div>
      <v-row no-gutters class="align-center">
        <v-text-field
          label="Tax"
          type="number"
          :value="dataInvoiceBuilder.tax"
          :rules="[v => v <= 100 || 'Tax <= 100']"
          @change="change('tax', $event)"
          placeholder="Enter number"
          :disabled="!switchNumber"
          suffix="%"
        ></v-text-field>
        <v-switch
          v-model="switchNumber"
          hide-details
          class="ma-0 pa-0"
          style="justify-content: flex-end;"
        ></v-switch>
      </v-row>
    </div>
    <div>
      <v-row no-gutters class="align-center">
        <v-col cols="6">
          <span>Pay to date</span>
        </v-col>
        <v-col cols="6">
          <v-switch
            class="ma-0"
            hide-details
            :value="dataInvoiceBuilder.payToDate"
            @change="$emit('update', { payToDate: $event })"
          ></v-switch>
        </v-col>
      </v-row>
    </div>
    <v-divider class="my-2"></v-divider>
    <v-row class="py-1 align-center">
      <v-col cols="6">
        <span>Payment Terms</span>
      </v-col>
      <v-col cols="6">
        <v-switch
          class="ma-0"
          hide-details
          :value="dataInvoiceBuilder.paymentTerms"
          @change="$emit('update', { paymentTerms: $event })"
        ></v-switch>
      </v-col>
    </v-row>
    <v-row class="py-1 align-center">
      <v-col cols="6">
        <span>Client Notes</span>
      </v-col>
      <v-col cols="6">
        <v-switch class="ma-0" hide-details :value="true"></v-switch>
      </v-col>
    </v-row>
    <v-row class="py-1 align-center">
      <v-col cols="6">
        <span>Payment Stub</span>
      </v-col>
      <v-col cols="6">
        <v-switch class="ma-0" hide-details :value="true"></v-switch>
      </v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>
    <v-select
      value="USD"
      :items="['USD']"
      label="Currency"
      placeholder="Choose currency"
    ></v-select>
    <v-select
      value="MM/DD/YY"
      :items="['MM/DD/YY']"
      label="Date format"
      placeholder="Choose date"
    ></v-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      switchDiscount: false,
      switchNumber: false
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/invoice/builder", ["dataInvoiceBuilder"])
  },
  methods: {
    change(name, value) {
      if (+value <= 100) {
        this.$emit("update", { name, value });
      }
    }
  }
};
</script>
