<template>
  <v-list>
    <div class="pa-2">
      <v-row no-gutters class="title py-2 align-center">
        <v-btn icon class="primary white--text ma-0">
          <v-icon>mdi-bar_chart</v-icon> </v-btn
        >&nbsp;&nbsp;
        <span>Statistics</span>
      </v-row>
      <Chart />
      <v-row no-gutters class="title pt-2 align-center">
        <v-btn icon class="primary white--text ma-0">
          <v-icon>mdi-assignment</v-icon> </v-btn
        >&nbsp;&nbsp;
        <span>Bill</span>
      </v-row>
      <TableInvoice
        class="custom-brie-invoice"
        :headers="headers"
        :items="dataInvoice"
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
import TableInvoice from "../tables/TableInvoice";
import FormCreateBriefacseBilling from "../dialogs/FormCreateBriefacseBilling";
import Chart from "./Chart";

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
    ...mapGetters("ht_store/matter/briefcase/billing/invoice", ["dataInvoice"]) // eslint-disable-line
  },
  methods: {
    addBilling() {
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/matter/briefcase/billing/invoice", [ // eslint-disable-line
      "getDataInvoiceRequest",
      "addDataInvoiceRequest",
      "updateDataInvoiceRequest",
      "deleteDataInvoiceRequest"
    ])
  },
  mounted() {
    this.getDataInvoiceRequest();
  }
};
</script>

<style>
.custom-brie-invoice /deep/ td {
  padding: 0 24px !important;
  text-align: left !important;
}
</style>
