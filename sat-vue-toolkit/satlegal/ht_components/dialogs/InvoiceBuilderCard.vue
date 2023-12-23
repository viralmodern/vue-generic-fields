<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12" sm="9">
        <InvoiceHeader @update="updateDataInvoiceBuilderRequest"/>
        <InvoiceContent/>
      </v-col>
      <v-col cols="12" sm="3" style="border-left: 1px solid #c1bfbfab;">
        <InvoiceRight class="pa-2" @update="updateDataInvoiceBuilderRequest"/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import InvoiceHeader from "../invoice/detail/InvoiceHeader";
import InvoiceRight from "../invoice/detail/InvoiceRight";
import InvoiceContent from "../invoice/detail/InvoiceContent";
export default {
  components: {
    InvoiceHeader,
    InvoiceRight,
    InvoiceContent
  },
  methods: {
    ...mapActions("ht_store/workspace/billing/invoice/builder", [
      "getDataInvoiceBuilderRequest",
      "updateDataInvoiceBuilderRequest"
    ])
  },
  mounted() {
    this.getDataInvoiceBuilderRequest();
  }
};
</script>
