<template>
  <div>
    <v-tabs class="px-1" @change="changeTab">
      <v-tab key="Expense">Expense</v-tab>
      <v-tab key="Invoice">Invoice</v-tab>
      <v-tab key="Payment">Payment</v-tab>
      <v-tab-item class="mt-1" key="Expense">
        <Expense/>
      </v-tab-item>
      <v-tab-item class="mt-1" key="Invoice">
        <BriefcaseInvoice/>
      </v-tab-item>
      <v-tab-item class="mt-1" key="Payment">
        <Payment/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import BriefcaseInvoice from "./billing/BriefcaseInvoice";
import Payment from "./billing/Payment";
import Expense from "./billing/Expense";

export default {
  components: {
    BriefcaseInvoice,
    Payment,
    Expense
  },
  data() {
    return {
      renderAgain: false
    };
  },
  methods: {
    changeTab(e) {
      if (e === 1) {
        this.$eventHub.$emit("resizeAgainBar");
        this.$eventHub.$emit("resizeAgainPie");
        this.$eventHub.$emit("resizeAgainLine");
      }
    }
  }
};
</script>
