<template>
  <SlickTable class="mt-2" :items="items" :headers="headers">
    <template slot="cell" slot-scope="props">
      <component
        :is="getDisplayComponent(props.column.name)"
        :column="props.column"
        :dataRow="props.dataRow"
        :index="parseInt(props.index)+1"
      />
    </template>
    <template v-slot:top>
      <v-row justify="end" no-gutters class="ma-2">
        <AddNewClient />
      </v-row>
    </template>
  </SlickTable>
</template>

<script>
import SlickTable from "../slick-table/SlickTable2";
import TdClientName from "../client/cells/TdClientName";
import TdAccountType from "../client/cells/TdAccountType";
import TdStatus from "../client/cells/TdStatus";
import TdAssignee from "../client/cells/TdAssignee";
import TdMatter from "../client/cells/TdMatter";
import TdViewDetail from "../client/cells/TdViewDetail";
import AddNewClient from "../dialogs/AddNewClient";
import { mapActions } from "vuex";

export default {
  components: {
    SlickTable,
    TdClientName,
    TdAccountType,
    TdStatus,
    TdAssignee,
    TdMatter,
    TdViewDetail,
    AddNewClient
  },
  props: {
    items: Array
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "View Detail",
          value: "view",
          name: "view"
        },
        {
          visible: true,
          sortable: false,
          text: "Client Name",
          value: "clientname",
          name: "clientname"
        },
        {
          visible: true,
          sortable: false,
          text: "Account Type",
          value: "accounttype",
          name: "accounttype"
        },
        {
          visible: true,
          sortable: false,
          text: "Status",
          value: "status",
          name: "status"
        },
        {
          visible: true,
          sortable: false,
          text: "Assignee",
          value: "assignee",
          name: "assignee"
        },
        {
          visible: true,
          sortable: false,
          text: "Matter",
          value: "matter",
          name: "matter"
        }
      ]
    };
  },
  methods: {
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),

    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdViewDetail;
      }
      if (columnName === "clientname") {
        return TdClientName;
      }
      if (columnName === "accounttype") {
        return TdAccountType;
      }
      if (columnName === "status") {
        return TdStatus;
      }
      if (columnName === "assignee") {
        return TdAssignee;
      }
      if (columnName === "matter") {
        return TdMatter;
      }
      return "td";
    }
  },
  mounted() {
    this.getDataCharacterRequest();
  }
};
</script>
