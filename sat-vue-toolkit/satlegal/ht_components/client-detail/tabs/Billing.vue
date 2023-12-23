<template>
  <v-list>
    <v-row>
      <!-- <div class="pa-2"> -->
      <v-col cols="12">
        <v-row no-gutters class="title pt-2 align-center">
          <v-btn icon class="primary white--text ma-0">
            <v-icon>mdi-bar_chart</v-icon>
          </v-btn>&nbsp;&nbsp;
          <span>Statistics</span>
        </v-row>
      </v-col>
      <v-col cols="12">
        <Chart
          idLineChart="BillingLineChart"
          idPieChart="BillingPieChart"
          idBarChart="BillingBarChart"
        />
      </v-col>
      <v-col cols="12">
        <v-row class="title pa-2 align-center">
          <v-btn icon class="primary white--text ml-2">
            <v-icon>mdi-assignment</v-icon>
          </v-btn>&nbsp;&nbsp;
          <span>Bill</span>
        </v-row>
      </v-col>
      <v-col cols="12">
        <TableInvoice
          :headers="headers"
          :items="dataInvoice"
          @openAdd="isShowCreate = true"
          @update="updateDataInvoiceRequest($event)"
          @delete="deleteDataInvoiceRequest($event)"
        />
      </v-col>
      <FormCreateInvoice
        :disabledFieldClient="true"
        @submit="addBilling"
        :isShow="isShowCreate"
        header="Create billing"
        @closeModal="isShowCreate = false"
      />
      <!-- </div> -->
    </v-row>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableInvoice from "../../tables/TableInvoice";
import Chart from "../billing/Chart";
import FormCreateInvoice from "../../dialogs/FormCreateInvoice";

export default {
  components: {
    TableInvoice,
    Chart,
    FormCreateInvoice
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
    ...mapGetters("ht_store/workspace/client/detail/billing", ["dataInvoice"])
  },
  methods: {
    addBilling(data) {
      Object.keys(data).forEach(key => {
        if (!data[key]) {
          delete data[key];
        }
      });
      this.addDataInvoiceRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/workspace/client/detail/billing", [
      "getDataInvoiceRequest",
      "addDataInvoiceRequest",
      "updateDataInvoiceRequest",
      "deleteDataInvoiceRequest"
    ]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"])
  },
  mounted() {
    this.getDataInvoiceRequest();
    this.getDataClientRequest();
  }
};
</script>
