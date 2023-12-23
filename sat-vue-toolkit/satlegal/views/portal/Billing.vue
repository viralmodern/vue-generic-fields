<template>
  <v-list>
    <div class="pa-2">
      <v-row class="title py-2 align-center" no-gutters>
        <v-btn icon class="primary white--text ma-0">
          <v-icon>mdi-bar_chart</v-icon> </v-btn
        >&nbsp;&nbsp;
        <span>Statistics</span>
      </v-row>
      <Chart />
      <v-row class="title pt-2 align-center" no-gutters>
        <v-btn icon class="primary white--text ma-0">
          <v-icon>mdi-assignment</v-icon> </v-btn
        >&nbsp;&nbsp;
        <span>Bill</span>
      </v-row>
      <TableInvoice
        class="custom-brie-invoice"
        :headers="headers"
        :items="dataInvoice"
        namePath="PortalInvoiceDetail"
        @openAdd="isShowCreate = true"
        @update="updateDataInvoiceRequest($event)"
        @delete="deleteDataInvoiceRequest($event)"
      />
      <FormCreateBriefacseBilling
        :disabledFieldClient="true"
        @submit="addBilling"
        :isShow="isShowCreate"
        header="Create billing"
        @closeModal="isShowCreate = false"
      />
    </div>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableInvoice from "../../ht_components/tables/TableInvoice";
import FormCreateBriefacseBilling from "../../ht_components/dialogs/FormCreateBriefacseBilling";
import Chart from "../../ht_components/potal-billing/Chart";

export default {
  components: {
    TableInvoice,
    FormCreateBriefacseBilling,
    Chart
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "View",
          value: "view",
          name: "view"
        },
        {
          visible: true,
          sortable: false,
          text: "Invoice",
          value: "invoice",
          name: "invoice"
        },
        {
          visible: true,
          sortable: false,
          text: "Created",
          value: "created",
          name: "created"
        },
        {
          visible: true,
          sortable: false,
          text: "DueDate",
          value: "dueDate",
          name: "dueDate"
        },
        {
          visible: true,
          sortable: false,
          text: "Payments",
          value: "payments",
          name: "payments"
        },
        {
          visible: true,
          sortable: false,
          text: "Last Payment",
          value: "lastPayment",
          name: "lastPayment"
        },
        {
          visible: true,
          sortable: false,
          text: "Fulfillment",
          value: "fulfillment",
          name: "fulfillment"
        },
        {
          visible: true,
          sortable: false,
          text: "Amount",
          value: "amount",
          name: "amount"
        },
        {
          visible: true,
          sortable: false,
          text: "Balance",
          value: "balance",
          name: "balance"
        },
        {
          visible: true,
          sortable: false,
          text: "Options",
          value: "options",
          name: "options"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/clientPortal/billing/invoice", ["dataInvoice"])
  },
  methods: {
    addBilling() {
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/clientPortal/billing/invoice", [
      "addDataInvoiceRequest",
      "updateDataInvoiceRequest",
      "deleteDataInvoiceRequest"
    ])
  }
};
</script>

<style>
.custom-brie-invoice /deep/ td {
  padding: 0 24px !important;
  text-align: left !important;
}
</style>
