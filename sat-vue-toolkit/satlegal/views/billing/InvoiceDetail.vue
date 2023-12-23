<template>
  <div class="pa-3">
    <HeaderInvoiceDetail @updateInvoiceDetail="updateInvoiceDetailRequest"/>
    <ProgressInvoiceDetail/>
    <ChartInvoiceDetail/>
    <TableInvoiceDetail/>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderInvoiceDetail from "../../ht_components/invoice/HeaderInvoiceDetail";
import ProgressInvoiceDetail from "../../ht_components/invoice/ProgressInvoiceDetail";
import ChartInvoiceDetail from "../../ht_components/invoice/ChartInvoiceDetail";
import TableInvoiceDetail from "../../ht_components/invoice/TableInvoiceDetail";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isShow: true
    };
  },
  components: {
    HeaderInvoiceDetail,
    ProgressInvoiceDetail,
    ChartInvoiceDetail,
    TableInvoiceDetail
  },
  methods: {
    ...mapActions("ht_store/workspace/billing/invoice/detail", [
      "getDataInvoiceDetailRequest",
      "updateInvoiceDetailRequest"
    ]),
    ...mapActions("ht_store/workspace/billing/invoice/detail/payment", [
      "getDataInvoicePaymentRequest"
    ]),
    ...mapActions("ht_store/workspace/billing/invoice/detail/note", [
      "getDataInvoiceNoteRequest"
    ]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"])
  },
  mounted() {
    this.getDataInvoiceDetailRequest();
    this.getDataClientRequest();
    this.getDataInvoicePaymentRequest();
    this.getDataInvoiceNoteRequest();
  }
};
</script>
