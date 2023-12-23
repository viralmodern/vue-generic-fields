<template>
  <div>
    <div class="title pa-2" v-if="$route.params.type === 'group'">{{name}}</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="itemsTickets"
      :headers="headers"
      class="py-2"
      :loading="isLoading"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="update(props.column.name, props.dataRow.id, $event)"
          @remove="remove({id: $event, matterId:$route.params.matter || $route.params.projectId})"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-row justify="end" no-gutters class="ma-2">
            <v-btn outlined color="primary" @click="isShow = true; typeName = name">
              <span>Add new</span>
              <v-icon class="pl-1">add</v-icon>
            </v-btn>
          </v-row>
        </div>
      </template>
    </SlickTable>
    <AddTicketHelpDesk
      :keyName="keyName"
      :typeName="typeName"
      :keyGroup="keyGroup"
      :isShow="isShow"
      @closeModal="isShow = false; updatePagination"
    />
  </div>
</template>

<script>
import SlickTable from "../../slick-table/SlickTable2";
import AddTicketHelpDesk from "../../dialogs/AddTicketHelpDesk";

import TdCategory from "../cells/TdCategory";
import TdClient from "../cells/TdClient";
import TdDate from "../cells/TdDate";
import TdGroupMatter from "../cells/TdGroupMatter";
import TdMembers from "../cells/TdMembers";
import TdPriority from "../cells/TdPriority";
import TdStatus from "../cells/TdStatus";
import TdTicketId from "../cells/TdTicketId";
import tdName from "../cells/tdName";
import TdUrgency from "../cells/TdUrgency";
import TdActions from "../cells/TdActions";

export default {
  components: {
    SlickTable,
    TdCategory,
    TdClient,
    TdDate,
    TdGroupMatter,
    TdMembers,
    TdPriority,
    TdStatus,
    TdTicketId,
    tdName,
    TdUrgency,
    TdActions,
    AddTicketHelpDesk
  },
  props: {
    itemsTickets: Array,
    isLoading: Boolean,
    totals: Number,
    name: String,
    keyGroup: [Number, Boolean, String],
    keyName: String
  },
  data() {
    return {
      isShow: false,
      typeName: null,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Actions",
          value: "actions",
          name: "actions"
        },
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
          text: "Received Date",
          value: "received_date",
          name: "received_date"
        },
        {
          visible: true,
          sortable: false,
          text: "Assigned Agent",
          value: "members",
          name: "members"
        },
        {
          visible: true,
          sortable: false,
          text: "Client",
          value: "client_name",
          name: "client_name"
        },
        {
          visible: true,
          sortable: false,
          text: "Tickets Id",
          value: "ticket_id",
          name: "ticket_id"
        },
        {
          visible: true,
          sortable: false,
          text: "Matter Group",
          value: "matter_group",
          name: "matter_group"
        },
        {
          visible: true,
          sortable: false,
          text: "Priority",
          value: "priority",
          name: "priority"
        },
        {
          visible: false,
          sortable: false,
          text: "Urgency",
          value: "urgency",
          name: "urgency"
        },
        {
          visible: false,
          sortable: false,
          text: "Category",
          value: "category",
          name: "category"
        },
        {
          visible: false,
          sortable: false,
          text: "Status",
          value: "status",
          name: "status"
        }
      ],
      isShowCreate: false
    };
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "actions") {
        return TdActions;
      }
      if (columnName === "name") {
        return tdName;
      }
      if (columnName === "received_date") {
        return TdDate;
      }
      if (columnName === "members") {
        return TdMembers;
      }
      if (columnName === "client_name") {
        return TdClient;
      }
      if (columnName === "ticket_id") {
        return TdTicketId;
      }
      if (columnName === "matter_group") {
        return TdGroupMatter;
      }
      if (columnName === "priority") {
        return TdPriority;
      }
      if (columnName === "urgency") {
        return TdUrgency;
      }
      if (columnName === "category") {
        return TdCategory;
      }
      if (columnName === "status") {
        return TdStatus;
      }
      return "td";
    },
    update(columnName, rowId, newValue) {
      const dataRequest = {
        columnName,
        rowId,
        newValue,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        bodyRequest: {
          [columnName]: newValue
        },
        keyName: this.keyName
      };
      this.$emit("updateTickets", dataRequest);
    },
    remove(params) {
      this.$emit("removeTickets", { ...params, keyName: this.keyName });
    },
    updatePagination({ page }) {
      // const matterId = this.$route.params.matter || this.$route.params.projectId;
      // this.getDataCAFDiscovery({ matterId, page });
      return page;
    }
  }
};
</script>

<style scoped>
.add {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
