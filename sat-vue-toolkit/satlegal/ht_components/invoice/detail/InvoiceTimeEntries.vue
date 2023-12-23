<template>
  <div>
    <div class="font-weight-medium subheading">Time Entries</div>
    <SlickTable :items="dataInvoiceTimeEntries" :headers="headers.filter(x=> x.visible)" class="py-2">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateInvoiceTimeEntriesRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removeInvoiceTimeEntriesRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>add</v-icon>
          </v-btn>
          <FormCreateInvoiceTimeEntries
            :isShowPopup="isShowCreate"
            header="Add new time enty"
            @closeModal="isShowCreate = false"
            @submit="addInvoiceTimeEntries"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTimeEntries from "../cells/TdTimeEntries";
import TdTextArea from "../cells/TdTextArea";
import TdDate from "../cells/TdDate";
import TdHours from "../cells/TdHours";
import TdNumber from "../cells/TdNumber";
import TdClient from "../cells/TdClient";
import TdNumberPercent from "../cells/TdNumberPercent";
import TdAction from "../../toolbox/detail/cells/TdAction";
import FormCreateInvoiceTimeEntries from "../../dialogs/FormCreateInvoiceTimeEntries";

export default {
  components: {
    SlickTable,
    TdTimeEntries,
    TdTextArea,
    TdDate,
    TdHours,
    TdNumber,
    TdClient,
    TdNumberPercent,
    TdAction,
    FormCreateInvoiceTimeEntries
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Time entry",
          value: "timeEntry",
          name: "timeEntry"
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
          text: "Hours",
          value: "hours",
          name: "hours"
        },
        {
          visible: true,
          sortable: false,
          text: "Rate",
          value: "rate",
          name: "rate"
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
    ...mapGetters("ht_store/workspace/billing/invoice/builder/timeEntries", [
      "dataInvoiceTimeEntries"
    ])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "timeEntry") {
        return TdTimeEntries;
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
      if (columnName === "hours") {
        return TdHours;
      }
      if (columnName === "rate") {
        return TdNumberPercent;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addInvoiceTimeEntries(data) {
      this.addInvoiceTimeEntriesRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/workspace/billing/invoice/builder/timeEntries", [
      "getDataInvoiceTimeEntriesRequest",
      "addInvoiceTimeEntriesRequest",
      "updateInvoiceTimeEntriesRequest",
      "removeInvoiceTimeEntriesRequest"
    ])
  },
  mounted() {
    this.getDataInvoiceTimeEntriesRequest();
  }
};
</script>
