<template>
  <SlickTable class="py-2 table-invoice" :items="items" :headers="headers.filter(x=> x.visible)">
    <template slot="cell" slot-scope="props">
      <component
        style="padding: 3px 10px; text-align:center"
        :is="getDisplayComponent(props.column.name)"
        :column="props.column"
        :dataRow="props.dataRow"
        :namePath="namePath"
        @update="$emit('update', {id: props.dataRow.id, [props.column.name] : $event})"
        @delete="$emit('delete', props.dataRow.id)"
      />
    </template>
    <template v-slot:top>
      <v-row justify="end" no-gutters class="ma-2">
        <v-btn dark color="primary" @click="$emit('openAdd')">
          Add new
          <v-icon dark>mdi-add</v-icon>
        </v-btn>
      </v-row>
    </template>
  </SlickTable>
</template>

<script>
import SlickTable from "../slick-table/SlickTable2";
import TdStatus from "../invoice/cells/TdStatus";
import TdInvoice from "../invoice/cells/TdInvoice";
import TdCreated from "../invoice/cells/TdCreated";
import TdDuaDate from "../invoice/cells/TdDuaDate";
import TdClient from "../invoice/cells/TdClient";
import TdFulfillment from "../invoice/cells/TdFulfillment";
import TdLastPayment from "../invoice/cells/TdLastPayment";
import TdOptions from "../invoice/cells/TdOptions";
import TdPayments from "../invoice/cells/TdPayments";
import TdAmount from "../invoice/cells/TdAmount";
import TdBalance from "../invoice/cells/TdBalance";
import TdView from "../invoice/cells/TdView";
export default {
  components: {
    SlickTable,
    TdStatus,
    TdInvoice,
    TdCreated,
    TdDuaDate,
    TdClient,
    TdFulfillment,
    TdLastPayment,
    TdOptions,
    TdPayments,
    TdAmount,
    TdBalance,
    TdView
  },
  props: {
    items: Array,
    headers: Array,
    namePath: String
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdView;
      }
      if (columnName === "status") {
        return TdStatus;
      }
      if (columnName === "invoice") {
        return TdInvoice;
      }
      if (columnName === "created") {
        return TdCreated;
      }
      if (columnName === "dueDate") {
        return TdDuaDate;
      }
      if (columnName === "client") {
        return TdClient;
      }
      if (columnName === "payments") {
        return TdPayments;
      }
      if (columnName === "lastPayment") {
        return TdLastPayment;
      }
      if (columnName === "fulfillment") {
        return TdFulfillment;
      }
      if (columnName === "amount") {
        return TdAmount;
      }
      if (columnName === "balance") {
        return TdBalance;
      }
      if (columnName === "options") {
        return TdOptions;
      }
      return "td";
    }
  }
};
</script>
