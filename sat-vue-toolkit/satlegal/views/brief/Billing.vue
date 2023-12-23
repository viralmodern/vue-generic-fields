<template>
  <div>
    <v-tabs @change="changeTab">
      <v-tab key="Expense">Expense</v-tab>
      <v-tab key="Invoice">Invoice</v-tab>
      <v-tab key="Payment">Payment</v-tab>
      <v-tab-item class="pa-3" key="Expense">
        <Expense/>
      </v-tab-item>
      <v-tab-item class="pa-3" key="Invoice">
        <BriefcaseInvoice/>
      </v-tab-item>
      <v-tab-item class="pa-3" key="Payment">
        <Payment/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import BriefcaseInvoice from "../../ht_components/briefcase-billing/BriefcaseInvoice";
import Payment from "../../ht_components/briefcase-billing/Payment";
import Expense from "../../ht_components/briefcase-billing/Expense";

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
