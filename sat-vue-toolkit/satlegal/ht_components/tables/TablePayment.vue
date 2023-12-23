<template>
  <SlickTable :items="payment" :headers="headers">
    <template slot="cell" slot-scope="props">
      <component
        :is="getDisplayComponent(props.column.name)"
        :column="props.column"
        :dataRow="props.dataRow"
        :dataClient="dataClient"
        :index="parseInt(props.index)+1"
        :dataInvoice="dataInvoice"
        @onChange="$emit('updatePayment', $event)"
        @deletePayment="$emit('deletePayment', $event)"
      />
    </template>
    <template v-slot:top>
      <slot name="actions-prepend"></slot>
    </template>
  </SlickTable>
</template>
<script>
import SlickTable from "../slick-table/SlickTable2";
import PaymentDate from "../payments/PaymentDate";
import InvoiceDate from "../payments/InvoiceDate";
import Invoice from "../payments/Invoice";
import Client from "../payments/Client";
import Amount from "../payments/Amount";
import PaymentMethods from "../payments/PaymentMethods";
import Note from "../payments/Note";
import Action from "../payments/Action";
export default {
  components: {
    SlickTable
  },
  props: {
    headers: Array,
    payment: Array,
    dataInvoice: Array,
    dataClient: Array
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "paymentDate") {
        return PaymentDate;
      }
      if (columnName === "invoiceDate") {
        return InvoiceDate;
      }
      if (columnName === "invoice") {
        return Invoice;
      }
      if (columnName === "client") {
        return Client;
      }
      if (columnName === "amount") {
        return Amount;
      }
      if (columnName === "paymentMethod") {
        return PaymentMethods;
      }
      if (columnName === "note") {
        return Note;
      }
      if (columnName === "action") {
        return Action;
      }
      return "td";
    }
  }
};
</script>
