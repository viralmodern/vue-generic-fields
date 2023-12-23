<template>
  <div>
    <div class="font-weight-medium subheading">Invoice amount</div>
    <SlickTable :items="dataInvoiceAmount" :headers="headers.filter(x=> x.visible)" class="py-2">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateInvoiceAmountRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removeInvoiceAmountRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>add</v-icon>
          </v-btn>
          <FormCreateInvoiceAmount
            :isShowPopup="isShowCreate"
            header="Add new invoice amount"
            @closeModal="isShowCreate = false"
            @submit="addInvoiceAmount"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../cells/TdTextArea";
import TdNumber from "../cells/TdNumber";
import TdNumberPercent from "../cells/TdNumberPercent";
import TdInvoiceTotal from "../cells/TdInvoiceTotal";
import TdAction from "../../toolbox/detail/cells/TdAction";
import FormCreateInvoiceAmount from "../../dialogs/FormCreateInvoiceAmount";

export default {
  components: {
    SlickTable,
    TdTextArea,
    TdNumber,
    TdNumberPercent,
    TdAction,
    FormCreateInvoiceAmount
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Quantity",
          value: "quantity",
          name: "quantity"
        },
        {
          visible: true,
          sortable: false,
          text: "Price",
          value: "price",
          name: "price"
        },
        {
          visible: true,
          sortable: false,
          text: "Discount",
          value: "discount",
          name: "discount"
        },
        {
          visible: true,
          sortable: false,
          text: "Tax",
          value: "tax",
          name: "tax"
        },
        {
          visible: true,
          sortable: false,
          text: "Total",
          value: "total",
          name: "total"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/invoice/builder/invoiceAmount", [
      "dataInvoiceAmount"
    ])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdTextArea;
      }
      if (columnName === "quantity") {
        return TdNumber;
      }
      if (columnName === "price") {
        return TdNumber;
      }
      if (columnName === "discount") {
        return TdNumberPercent;
      }
      if (columnName === "tax") {
        return TdNumberPercent;
      }
      if (columnName === "total") {
        return TdInvoiceTotal;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addInvoiceAmount(data) {
      this.addInvoiceAmountRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/workspace/billing/invoice/builder/invoiceAmount", [
      "getDataInvoiceAmountRequest",
      "addInvoiceAmountRequest",
      "updateInvoiceAmountRequest",
      "removeInvoiceAmountRequest"
    ])
  },
  mounted() {
    this.getDataInvoiceAmountRequest();
  }
};
</script>
