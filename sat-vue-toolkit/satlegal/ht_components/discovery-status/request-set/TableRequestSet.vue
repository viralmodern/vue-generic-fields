<template>
  <div>
    <v-row class="d-flex justify-end mx-3">
      <ConfigurationColumnTable
        :columns="headers"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </v-row>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataCAFDiscovery"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
      :loading="isLoading"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="update(props.column.name, props.dataRow.id, $event)"
          @remove="removeRequestSet({id: $event, matterId:$route.params.matter || $route.params.projectId})"
        />
      </template>
      <template v-slot:top>
        <v-row justify="end" no-gutters class="ma-2">
          <v-btn outlined color="primary" @click="isShow = true">
            <span>Add new</span>
            <v-icon class="pl-1">add</v-icon>
          </v-btn>
        </v-row>
      </template>
    </SlickTable>
    <AddRequestSet :isShow="isShow" @closeModal="isShow = false; updatePagination" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConfigurationColumnTable from "../../menus/ConfigurationColumnTable";
import SlickTable from "../../slick-table/SlickTable2";
import AddRequestSet from "../../dialogs/AddRequestSet";
import TdActions from "./cells/TdActions";
import TdAssignee from "./cells/TdAssignee";
import TdRequestSet from "./cells/TdRequestSet";
import TdPriority from "./cells/TdPriority";
import TdCurrentProgress from "./cells/TdCurrentProgress";
import TdNumberOfRequest from "./cells/TdNumberOfRequest";
import TdTotalTimeLog from "./cells/TdTotalTimeLog";
import TdAttachments from "./cells/TdAttachments";
import TdNotes from "./cells/TdNotes";

export default {
  components: {
    SlickTable,
    ConfigurationColumnTable,
    TdActions,
    TdAssignee,
    TdRequestSet,
    TdPriority,
    TdCurrentProgress,
    TdNumberOfRequest,
    TdTotalTimeLog,
    TdAttachments,
    AddRequestSet,
    TdNotes
  },
  data() {
    return {
      isShow: false,
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
          text: "Request Set",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Number Of Request",
          value: "numberOfRequest",
          name: "numberOfRequest"
        },
        {
          visible: true,
          sortable: false,
          text: "Assignee",
          value: "members",
          name: "members"
        },
        {
          visible: true,
          sortable: false,
          text: "Current Progress",
          value: "currentProgress",
          name: "currentProgress"
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
          text: "Total Time Log",
          value: "totalTimeLog",
          name: "totalTimeLog"
        },
        {
          visible: false,
          sortable: false,
          text: "Attachments",
          value: "attachments",
          name: "attachments"
        },
        {
          visible: false,
          sortable: false,
          text: "Notes",
          value: "notes",
          name: "notes"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestSets", [
      "dataCAFDiscovery",
      "totals",
      "isLoading"
    ])
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    this.getDataMembersRequest({ matterId });
  },
  methods: {
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName) {
      if (columnName === "actions") {
        return TdActions;
      }
      if (columnName === "members") {
        return TdAssignee;
      }
      if (columnName === "currentProgress") {
        return TdCurrentProgress;
      }
      if (columnName === "numberOfRequest") {
        return TdNumberOfRequest;
      }
      if (columnName === "priority") {
        return TdPriority;
      }
      if (columnName === "totalTimeLog") {
        return TdTotalTimeLog;
      }
      if (columnName === "name") {
        return TdRequestSet;
      }
      if (columnName === "attachments") {
        return TdAttachments;
      }
      if (columnName === "notes") {
        return TdNotes;
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
        }
      };
      this.updateRequest(dataRequest);
    },
    remove(rowId) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rowId
      };
      return data;
    },
    updatePagination({ page }) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      this.getDataCAFDiscovery({ matterId, page, task_null: false });
    },
    ...mapActions("ht_store/matter/discovery/status/requestSets", [
      "getDataCAFDiscovery",
      "removeRequestSet",
      "updateRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
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
