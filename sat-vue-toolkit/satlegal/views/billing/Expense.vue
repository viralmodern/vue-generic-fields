<template>
  <v-row class="ma-2" no-gutters>
    <v-col cols="12">
      <v-row no-gutters class="justify-end">
        <FilterExpense @filterExpence="filterExpence" />
        <ConfigurationExpense />
      </v-row>
    </v-col>
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
          <v-btn color="primary" outlined @click="isShowCreateExpense = true">
            <v-icon class="mr-2">mdi-add_circle</v-icon>
            <span class="hidden-sm-and-down">Add new expense</span>
          </v-btn>
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
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import Name from "../../ht_components/expense/Name";
import Amount from "../../ht_components/expense/Amount";
import BilledBy from "../../ht_components/expense/BilledBy";
import Contact from "../../ht_components/expense/Contact";
import CreatedBy from "../../ht_components/expense/CreatedBy";
import CreatedDate from "../../ht_components/expense/CreatedDate";
import CreatedTime from "../../ht_components/expense/CreatedTime";
import DateExpense from "../../ht_components/expense/Date";
import Receipt from "../../ht_components/expense/Receipt";
import Status from "../../ht_components/expense/Status";
import Action from "../../ht_components/expense/Action";
import FilterExpense from "../../ht_components/filter/FilterExpense";
import ConfigurationExpense from "../../ht_components/menus/ConfigurationExpense";
import AddExpense from "../../ht_components/dialogs/AddExpense";
export default {
  data() {
    return {
      isShowCreateExpense: false
    };
  },
  components: {
    SlickTable,
    FilterExpense,
    ConfigurationExpense,
    AddExpense
  },
  methods: {
    ...mapActions("ht_store/workspace/billing/expense", [
      "getDataExpenseRequest",
      "updateExpenseRequest",
      "deleteExpenseRequest",
      "addExpenseRequest",
      "addAtachmentRequest"
    ]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
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
      if (columnName === "contact") {
        return Contact;
      }
      if (columnName === "createBy") {
        return CreatedBy;
      }
      if (columnName === "createdDate") {
        return CreatedDate;
      }
      if (columnName === "createdTime") {
        return CreatedTime;
      }
      if (columnName === "date") {
        return DateExpense;
      }
      if (columnName === "receipt") {
        return Receipt;
      }
      if (columnName === "action") {
        return Action;
      }
      return "td";
    },
    filterExpence() {}
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/expense", ["expense"]),
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    headers() {
      return this.visibleColumns.map(x => ({
        text: x.title,
        value: x.name,
        name: x.name,
        sortable: false
      }));
    }
  },
  mounted() {
    this.getDataExpenseRequest();
    this.getDataMemberRequest();
  }
};
</script>
