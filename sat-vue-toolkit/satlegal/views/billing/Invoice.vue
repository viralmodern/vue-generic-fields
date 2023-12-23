<template>
  <div class="pa-2 fill-height" style="background: white">
    <div>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <FilterInvoice/>
      </v-row>
    </div>
    <TableInvoice
      :headers="headers"
      :items="dataInvoice"
      namePath="BillingInvoiceDetail"
      @openAdd="isShowCreate = true"
      @update="updateDataInvoiceRequest($event)"
      @delete="deleteDataInvoiceRequest($event)"
    />
    <FormCreateInvoice
      @submit="addInvoice"
      :isShow="isShowCreate"
      header="Create invoice"
      @closeModal="isShowCreate = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FilterInvoice from "../../ht_components/filter/FilterInvoice";
import TableInvoice from "../../ht_components/tables/TableInvoice";
import FormCreateInvoice from "../../ht_components/dialogs/FormCreateInvoice";

export default {
  components: {
    FilterInvoice,
    TableInvoice,
    FormCreateInvoice
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
          text: "Status",
          value: "status",
          name: "status"
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
          text: "Client",
          value: "client",
          name: "client"
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
    ...mapGetters("ht_store/workspace/billing/invoice", ["dataInvoice"])
  },
  methods: {
    addInvoice(data) {
      this.addDataInvoiceRequest(data);
      this.isShowCreate = false;
    },
    showDetail(id) {
      return {
        name: "BillingInvoiceDetail",
        params: {
          id
        }
      };
    },
    ...mapActions("ht_store/workspace/billing/invoice", [
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
