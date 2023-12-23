<template>
  <div>
    <SlickTable :items="dataPayments" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @onChange="updateInvoicePaymentRequest($event)"
          @deletePayment="deletePaymentRequest"
        />
      </template>
      <template v-slot:top>
        <v-btn color="primary" outlined @click="isShowCreatePayment = true">
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">Add new payment</span>
        </v-btn>
      </template>
    </SlickTable>
    <AddPaymentInvoiceDetail
      :isShow="isShowCreatePayment"
      @closeModal="isShowCreatePayment = false"
      @addPayment="addPaymentRequest"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdMethod from "../invoice-payment/TdMethod";
import TdDate from "../invoice-payment/TdDate";
import TdPaid from "../invoice-payment/TdPaid";
import TdProgress from "../invoice-payment/TdProgress";
import TdNote from "../invoice-payment/TdNote";
import TdBalance from "../invoice-payment/TdBalance";
import TdAction from "../invoice-payment/TdAction";
import AddPaymentInvoiceDetail from "../dialogs/AddPaymentInvoiceDetail"
export default {
  data() {
    return {
      isShowCreatePayment: false,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Method",
          value: "method",
          name: "method"
        },
        {
          visible: true,
          sortable: false,
          text: "Date",
          value: "date",
          name: "date"
        },
        {
          visible: true,
          sortable: false,
          text: "Paid",
          value: "paid",
          name: "paid"
        },
        {
          visible: true,
          sortable: false,
          text: "Progress",
          value: "progress",
          name: "progress"
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
    SlickTable,
    AddPaymentInvoiceDetail
  },
  methods: {
    ...mapActions("ht_store/workspace/billing/invoice/detail/payment", [
      "updateInvoicePaymentRequest",
      "deletePaymentRequest",
      "addPaymentRequest"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "method") {
        return TdMethod;
      }
      if (columnName === "date") {
        return TdDate;
      }
      if (columnName === "paid") {
        return TdPaid;
      }
      if (columnName === "progress") {
        return TdProgress;
      }
      if (columnName === "balance") {
        return TdBalance;
      }
      if (columnName === "note") {
        return TdNote;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/invoice/detail/payment", ["dataPayments"])
  }
};
</script>
