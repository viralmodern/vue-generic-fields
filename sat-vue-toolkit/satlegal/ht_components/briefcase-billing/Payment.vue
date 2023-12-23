<template>
  <v-row class="ma-2" no-gutters>
    <v-col cols="12">
      <TablePayment
        :headers="headers"
        :payment="payment"
        :dataInvoice="dataInvoice"
        :dataClient="dataClient"
        @updatePayment="updatePaymentRequest"
        @deletePayment="deletePaymentRequest"
      >
        <template v-slot:actions-prepend>
          <v-row justify="end" no-gutters class="ma-2">
            <v-btn color="primary" outlined @click="isShowCreatePayment = true">
              <v-icon class="mr-2">mdi-add_circle</v-icon>
              <span class="hidden-sm-and-down">Add new</span>
            </v-btn>
          </v-row>
        </template>
      </TablePayment>
      <AddPayment
        :dataInvoice="dataInvoice"
        :isShow="isShowCreatePayment"
        @closeModal="isShowCreatePayment = false"
        @addPayment="addPaymentRequest"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TablePayment from "../tables/TablePayment";
import AddPayment from "../dialogs/AddPayment";
export default {
  data() {
    return {
      isShowCreatePayment: false,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Payment date",
          value: "admissionDes",
          name: "paymentDate"
        },
        {
          visible: true,
          sortable: false,
          text: "Invoice date",
          value: "invoiceDate",
          name: "invoiceDate"
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
          text: "Client",
          value: "client",
          name: "client"
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
          text: "Payment method",
          value: "paymentMethod",
          name: "paymentMethod"
        },
        {
          visible: true,
          sortable: false,
          text: "Note",
          value: "note",
          name: "note"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ]
    };
  },
  components: {
    TablePayment,
    AddPayment
  },
  methods: {
    ...mapActions("ht_store/matter/briefcase/billing/payment", [ // eslint-disable-line
      "getDataPaymentRequest",
      "updatePaymentRequest",
      "deletePaymentRequest",
      "addPaymentRequest"
    ]),
    ...mapActions("ht_store/matter/briefcase/billing/invoice", [ // eslint-disable-line
      "getDataInvoiceRequest"
    ]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]) // eslint-disable-line
  },
  computed: {
    ...mapGetters("ht_store/workspace/client", ["dataClient"]), // eslint-disable-line
    ...mapGetters("ht_store/matter/briefcase/billing/invoice", ["dataInvoice"]), // eslint-disable-line
    ...mapGetters("ht_store/matter/briefcase/billing/payment", ["payment"]) // eslint-disable-line
  },
  mounted() {
    this.getDataPaymentRequest();
    this.getDataClientRequest();
    this.getDataInvoiceRequest();
  }
};
</script>
