 <template>
  <div>
    <div class="font-weight-medium subheading">Expenses</div>
    <SlickTable :items="dataInvoiceExpenses" :headers="headers.filter(x=> x.visible)" class="py-2">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateInvoiceExpensesRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removeInvoiceExpensesRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>add</v-icon>
          </v-btn>
          <FormCreateInvoiceExpenses
            :isShowPopup="isShowCreate"
            header="Add new expense"
            @closeModal="isShowCreate = false"
            @submit="addInvoiceExpenses"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdExpense from "../cells/TdExpense";
import TdTextArea from "../cells/TdTextArea";
import TdDate from "../cells/TdDate";
import TdNumber from "../cells/TdNumber";
import TdClient from "../cells/TdClient";
import TdNumberPercent from "../cells/TdNumberPercent";
import TdAction from "../../toolbox/detail/cells/TdAction";
import FormCreateInvoiceExpenses from "../../dialogs/FormCreateInvoiceExpenses";

export default {
  components: {
    SlickTable,
    TdExpense,
    TdTextArea,
    TdDate,
    TdNumber,
    TdClient,
    TdNumberPercent,
    TdAction,
    FormCreateInvoiceExpenses
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Expense",
          value: "expense",
          name: "expense"
        },
        {
          visible: true,
          sortable: false,
          text: "Description",
          value: "description",
          name: "description"
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
          text: "Billed by",
          value: "billedBy",
          name: "billedBy"
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
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/invoice/builder/expenses", [
      "dataInvoiceExpenses"
    ])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "expense") {
        return TdExpense;
      }
      if (columnName === "description") {
        return TdTextArea;
      }
      if (columnName === "date") {
        return TdDate;
      }
      if (columnName === "billedBy") {
        return TdClient;
      }
      if (columnName === "quantity") {
        return TdNumber;
      }
      if (columnName === "price") {
        return TdNumber;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addInvoiceExpenses(data) {
      this.addInvoiceExpensesRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/workspace/billing/invoice/builder/expenses", [
      "getDataInvoiceExpensesRequest",
      "addInvoiceExpensesRequest",
      "updateInvoiceExpensesRequest",
      "removeInvoiceExpensesRequest"
    ])
  },
  mounted() {
    this.getDataInvoiceExpensesRequest();
  }
};
</script>
