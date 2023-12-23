<template>
  <div class="py-1">
    <v-row no-gutters>
      <v-col cols="6">
        <span class="text--secondary">Amount recevied</span>
        <span class="text-caption font-weight-bold pl-3">${{ invoiceDetail.amount | formatCurrency }}</span>
      </v-col>
      <v-col cols="6">
        <span class="text--secondary">Payment remaining</span>
        <span class="text-caption font-weight-bold pl-3">${{ invoiceDetail.payment | formatCurrency }}</span>
      </v-col>
    </v-row>
    <v-row class="align-center" no-gutters>
      <v-col cols="11">
        <v-progress-linear :value="invoiceDetail.progress"></v-progress-linear>
      </v-col>
      <v-col cols="1">
        <span class="pl-3">{{ invoiceDetail.progress }}%</span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { formatCurrency } from "@/sat-vue-toolkit/satlegal/ht_plugins/filter"
export default {
  filters: {
    formatCurrency
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/invoice/detail", ["invoiceDetail"]),
  }
}
</script>
