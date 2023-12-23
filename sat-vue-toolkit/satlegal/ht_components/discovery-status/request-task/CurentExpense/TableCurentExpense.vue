<template>
  <div>
    <SlickTable :items="dataCurentExpense" :headers="headers.filter(x=> x.visible)" @onEndDragRows="onEndDragRows">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @update="updateExpense( props.dataRow.id, props.column.name, $event )"
          @remove="deleteCurentExpense(props.dataRow.id, $event)"
        />
      </template>
      <template v-slot:top>
        <v-btn @click="isShowAdd = true" color="primary" outlined>
          <v-icon class="mr-2">mdi-add_circle</v-icon>
          <span class="hidden-sm-and-down">Add new curent expense</span>
        </v-btn>
      </template>
    </SlickTable>
    <AddCurentExpense
      :isShow="isShowAdd"
      @closeModal="isShowAdd = false"
      @add="addExpense"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../../slick-table/SlickTable2";
import TdName from "./cell/TdName";
import TdDescription from "./cell/TdDescription";
import TdCode from "./cell/TdCode";
import TdExpenseCost from "./cell/TdExpenseCost";
import TdMatterMember from "../../../cells/TdMatterMember";
import TdAttachment from "./cell/TdAttachment";
import TdAction from "./cell/TdAction";
import AddCurentExpense from "../../../dialogs/AddCurentExpense";
export default {
  components: {
    SlickTable,
    TdName,
    TdDescription,
    TdCode,
    TdExpenseCost,
    TdMatterMember,
    TdAttachment,
    AddCurentExpense
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Expense name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Expense code",
          value: "expense_code",
          name: "expense_code"
        },
        {
          visible: true,
          sortable: false,
          text: "Members",
          value: "members",
          name: "members"
        },
        {
          visible: false,
          sortable: false,
          text: "Description",
          value: "description",
          name: "description"
        },
        {
          visible: true,
          sortable: false,
          text: "Expense Cost",
          value: "expense_cost",
          name: "expense_cost"
        },
        {
          visible: false,
          sortable: false,
          text: "Attachment",
          value: "attachment",
          name: "attachment"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShowAdd: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/status/requestTask/curentExpence", [
      "getDataCurentExpense",
      "removeCurentExpense",
      "updateCurentExpense",
      "addCurentExpense"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "expense_code") {
        return TdCode;
      }
      if (columnName === "members") {
        return TdMatterMember;
      }
      if (columnName === "expense_cost") {
        return TdExpenseCost;
      }
      if (columnName === "attachment") {
        return TdAttachment;
      }
      if (columnName === "description") {
        return TdDescription;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    deleteCurentExpense(id, value) {
      const data = {
        id: id,
        value: value
      };
      this.removeCurentExpense(data)
    },
    onEndDragRows() {},
    updateExpense(id, columnName, value) {
      const data = {
        id: id,
        columnName: columnName,
        value: value
      };
      this.updateCurentExpense(data)
    },
    addExpense(data) {
      this.addCurentExpense(data)
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestTask/curentExpence", [
      "dataCurentExpense"
    ])
  },
  mounted() {
    this.getDataCurentExpense();
  }
};
</script>
