<template>
  <v-row class="ma-2" no-gutters>
    <v-col cols="12">
      <SlickTable :items="expense" :headers="headers">
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            :index="parseInt(props.index) + 1"
            @onChange="updateExpenseRequest($event)"
            @deleteExpense="deleteExpenseRequest"
            @addAtachment="addAtachmentRequest"
          />
        </template>
        <template v-slot:top>
          <v-row justify="end" no-gutters class="ma-2">
            <v-btn color="primary" outlined @click="isShowCreateExpense = true">
              <v-icon class="mr-2">mdi-add_circle</v-icon>
              <span class="hidden-sm-and-down">Add new expense</span>
            </v-btn>
          </v-row>
        </template>
      </SlickTable>
      <AddExpense
        :isShow="isShowCreateExpense"
        @closeModal="isShowCreateExpense = false"
        @addExpense="addExpenseRequest"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import Name from "../briefcase-expense/Name";
import Amount from "../briefcase-expense/Amount";
import BilledBy from "../briefcase-expense/BilledBy";
import CreatedBy from "../briefcase-expense/CreatedBy";
import CreatedDate from "../briefcase-expense/CreatedDate";
import Receipt from "../briefcase-expense/Receipt";
import Status from "../briefcase-expense/Status";
import Action from "../briefcase-expense/Action";
import AddExpense from "../dialogs/AddExpense";
export default {
  data() {
    return {
      isShowCreateExpense: false,
      headers: [
        {
          visible: true,
          text: "Name",
          name: "name",
          value: "options",
          sortable: false
        },
        {
          visible: true,
          text: "Created by",
          name: "createBy",
          sortable: false,
          value: "createBy"
        },
        {
          visible: true,
          text: "Receipt",
          name: "receipt",
          sortable: false,
          value: "receipt"
        },
        {
          visible: true,
          text: "Amount",
          name: "amount",
          sortable: false,
          value: "amount"
        },
        {
          visible: true,
          text: "Billed by",
          name: "billedBy",
          sortable: false,
          value: "billedBy"
        },
        {
          visible: true,
          text: "Created Date",
          name: "createdDate",
          sortable: false,
          value: "createdDate"
        },
        {
          visible: true,
          text: "Status",
          name: "status",
          sortable: false,
          value: "status"
        },
        {
          visible: true,
          text: "Action",
          name: "action",
          sortable: false,
          value: "action"
        }
      ]
    };
  },
  components: {
    SlickTable,
    AddExpense
  },
  methods: {
    ...mapActions("ht_store/matter/briefcase/billing/expense", [ // eslint-disable-line
      "getDataExpenseRequest",
      "updateExpenseRequest",
      "deleteExpenseRequest",
      "addExpenseRequest",
      "addAtachmentRequest"
    ]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]), // eslint-disable-line
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return Name;
      }
      if (columnName === "status") {
        return Status;
      }
      if (columnName === "amount") {
        return Amount;
      }
      if (columnName === "billedBy") {
        return BilledBy;
      }
      if (columnName === "createBy") {
        return CreatedBy;
      }
      if (columnName === "createdDate") {
        return CreatedDate;
      }
      if (columnName === "receipt") {
        return Receipt;
      }
      if (columnName === "action") {
        return Action;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/briefcase/billing/expense", ["expense"]) // eslint-disable-line
  },
  mounted() {
    this.getDataExpenseRequest();
    this.getDataMemberRequest();
  }
};
</script>
