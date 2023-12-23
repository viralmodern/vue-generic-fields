<template>
  <div>
    <v-row no-gutters>
      <DropDown :item="item" :list="list" key-text="name" @click="handleGroupBy" />
      <v-spacer></v-spacer>
      <ConfigurationColumnTable
        :columns="headersFilter"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </v-row>
    <div class="pa-2" v-for="stage in item.list" :key="stage.value">
      <div class="title" v-if="stage.name !== 'All'">{{stage.name}}</div>
      <SlickTable
        class="py-2"
        :totals="(dataRequestItem[stage.value] || {}).totals"
        :items="(dataRequestItem[stage.value] || {}).list"
        :headers="headersFilter.filter(x => x.visible)"
        :idGroup="stage.value+''"
        :group="stage"
        @watchPagination="updatePagination(stage, $event)"
        @onEndDragRows="onEndDragRows"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            @update="updateRequestItem(stage.value, props.dataRow, props.column.name, $event)"
            @remove="removeRequestItem(stage.value, props.dataRow)"
          />
        </template>
        <template v-slot:top>
          <v-row justify="end" no-gutters class="ma-2">
            <v-btn outlined color="primary" @click="stageAdd = stage; isShowCreate = true">
              Add new
              <v-icon dark>mdi-add</v-icon>
            </v-btn>
          </v-row>
        </template>
      </SlickTable>
    </div>
    <FormCreateRequestItem
      :isShowFieldRequestSet="true"
      :isShowPopup="isShowCreate"
      header="Add new request item"
      :stageAdd="{field: this.item.field, ...this.stageAdd}"
      @closeModal="isShowCreate = false"
      @submit="addRequestItem"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdAction from "./cells/TdAction";
// import TdName from "./cells/TdName";
// import TdTextArea from "./cells/TdTextArea";
import TdInlineEdit from "../../cells/TdInlineEdit";
import TdRequestType from "./cells/TdRequestType";
import TdRequestTask from "./cells/TdRequestTask";
import TdRequestStatus from "./cells/TdRequestStatus";
import TdResponseStatus from "./cells/TdResponseStatus";
import TdResponseContent from "./cells/TdResponseContent";
import TdPriority from "./cells/TdPriority";
import TdSwitch from "./cells/TdSwitch";
import TdResponse from "./cells/TdResponse";
import TdObjection from "./cells/TdObjection";
import TdDate from "./cells/TdDate";
import TdAttachment from "./cells/TdAttachment";
import TdNote from "./cells/TdNote";
import TdCountdown from "./cells/TdCountdown";
import TdTimeLog from "./cells/TdTimeLog";
import TdMatterMember from "../../cells/TdMatterMember";
import AddTaskTaskBoard from "../../inputs/AddInlineEnter";
import FormCreateRequestItem from "../../dialogs/FormCreateRequestItem";
import ConfigurationColumnTable from "../../menus/ConfigurationColumnTable";
import DropDown from "../../menus/DropDown";

import { valueNoGroup } from "../../../config";

export default {
  components: {
    SlickTable,
    AddTaskTaskBoard,
    FormCreateRequestItem,
    ConfigurationColumnTable,
    DropDown
  },
  data() {
    return {
      valueNoGroup,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Request Set",
          value: "request_set_name",
          name: "request_set_name",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Request",
          value: "name",
          name: "name",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Assigned To",
          value: "members",
          name: "members",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Request Type",
          value: "request_type",
          name: "request_type",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Request Task",
          value: "request_task",
          name: "request_task",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Priority",
          value: "priority",
          name: "priority",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Response Status",
          value: "response_status",
          name: "response_status",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Request Status",
          value: "request_status",
          name: "request_status",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Under Oath?",
          value: "under_oauth",
          name: "under_oauth",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Response",
          value: "response",
          name: "response",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Objection",
          value: "objection",
          name: "objection",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Deadline",
          value: "deadline",
          name: "deadline",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Dispute",
          value: "dispute",
          name: "dispute",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Attachment",
          value: "total_attachments",
          name: "total_attachments",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Note",
          value: "total_notes",
          name: "total_notes",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Countdown",
          value: "countdown",
          name: "countdown",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Response Content",
          value: "response_content",
          name: "response_content",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Time Log",
          value: "time_log",
          name: "time_log",
          type: "cell 2"
        }
      ],
      item: {},
      stageAdd: {},
      list: [
        {
          id: 1,
          field: "all",
          name: "All",
          list: [{ value: valueNoGroup, name: "All" }]
        },
        // {
        //   id: 2,
        //   field: "request_set",
        //   name: "Request Set",
        //   list: []
        // },
        {
          id: 3,
          field: "priority",
          name: "Priority",
          list: []
        },
        // {
        //   id: 4,
        //   field: "deadline",
        //   name: "Sort by Deadline",
        //   list: []
        // },
        // {
        //   id: 5,
        //   field: "members",
        //   name: "Assigned to",
        //   list: []
        // },
        {
          id: 6,
          field: "request_status",
          name: "Request Status",
          list: []
        },
        {
          id: 7,
          field: "response_status",
          name: "Response Status",
          list: []
        },
        {
          id: 8,
          field: "dispute",
          name: "Dispute",
          list: [
            { name: "Dispute true", value: true },
            { name: "Dispute false", value: false }
          ]
        },
        // {
        //   id: 9,
        //   field: "objection",
        //   name: "Objection",
        //   list: []
        // },
        {
          id: 10,
          field: "under_oauth",
          name: "Under Oath",
          list: [
            { name: "Under oath true", value: true },
            { name: "Under oath false", value: false }
          ]
        }
      ],
      isShowCreate: false
    };
  },
  created() {
    this.item = this.list[0];
  },
  computed: {
    headersFilter() {
      return this.headers.filter(x => x.name !== this.item.field);
    },
    ...mapGetters("ht_store/user", ["currentUser"]),
    ...mapGetters("ht_store/matter/discovery/status/requestItem", ["dataRequestItem"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        this.updatePagination(
          {
            field: this.item.field,
            name: this.item.name,
            value: this.item.list.map(x => x.value)
          },
          { page: 1 }
        );
        this.cleanUpPageData();
      }
    },
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName) {
      if (columnName === "action") {
        return TdAction;
      }
      if (columnName === "request_set_name") {
        return TdRequestTask;
      }
      if (columnName === "name") {
        return TdInlineEdit;
      }
      if (columnName === "members") {
        return TdMatterMember;
      }
      if (columnName === "request_type") {
        return TdRequestType;
      }
      if (columnName === "request_task") {
        return TdRequestTask;
      }
      if (columnName === "priority") {
        return TdPriority;
      }
      if (columnName === "response_status") {
        return TdResponseStatus;
      }
      if (columnName === "request_status") {
        return TdRequestStatus;
      }
      if (columnName === "under_oauth") {
        return TdSwitch;
      }
      if (columnName === "response") {
        return TdResponse;
      }
      if (columnName === "objection") {
        return TdObjection;
      }
      if (columnName === "deadline") {
        return TdDate;
      }
      if (columnName === "dispute") {
        return TdSwitch;
      }
      if (columnName === "total_attachments") {
        return TdAttachment;
      }
      if (columnName === "total_notes") {
        return TdNote;
      }
      if (columnName === "countdown") {
        return TdCountdown;
      }
      if (columnName === "response_content") {
        return TdResponseContent;
      }
      if (columnName === "time_log") {
        return TdTimeLog;
      }
      return "td";
    },
    addRequestItem(data) {
      const idParams = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: data.request_set
      };
      this.addRequestItemRequest({ name: this.stageAdd.value, idParams, data });
      this.isShowCreate = false;
    },
    updateRequestItem(item, dataRow, name, value) {
      const data = {
        name: item,
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetId: dataRow.request_set_pk,
          requestItemId: dataRow.id
        },
        body: {
          [name]: value
        }
      };
      this.updateRequestItemRequest(data);
    },
    removeRequestItem(name, dataRow) {
      const data = {
        name,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        requestSetId: dataRow.request_set_pk,
        requestItemId: dataRow.id
      };
      this.removeRequestItemRequest(data);
    },
    updatePagination(stage, pagination = {}) {
      const { page } = pagination;
      const searchObject = {
        group_items: stage.value,
        page
      };
      if (this.item.field === "all") {
        searchObject.ungroup = true;
      } else {
        searchObject.group_by = this.item.field;
      }
      this.getDataRequestItemRequest({ stage, searchObject });
    },
    onEndDragRows(event) {
      const { taskId, fromListId, newIndex, oldIndex, toListId } = event;
      let order = 0;
      const drag = {
        taskId,
        fromListId,
        newIndex,
        oldIndex,
        toListId
      };
      const fromTask = this.dataRequestItem[fromListId].list.find(
        x => x.id === taskId
      );
      if (fromListId !== toListId) {
        const tasks = this.dataRequestItem[toListId].list;
        if (!tasks.length) {
          order = fromTask.order;
        } else {
          if (newIndex == 0) {
            order = tasks[newIndex].order - 1000000;
          } else {
            if (newIndex === tasks.length) {
              order = tasks[newIndex - 1].order + 1000000;
            } else {
              order = (tasks[newIndex].order + tasks[newIndex - 1].order) / 2;
            }
          }
        }
        drag.order = order;
      } else {
        const tasks = this.dataRequestItem[fromListId].list;
        if (newIndex > oldIndex) {
          if (newIndex == tasks.length - 1) {
            order = tasks[newIndex].order + 1000000;
          } else {
            order = (tasks[newIndex].order + tasks[newIndex + 1].order) / 2;
          }
        } else {
          if (newIndex == 0) {
            order = tasks[newIndex].order - 1000000;
          } else {
            order = (tasks[newIndex].order + tasks[newIndex - 1].order) / 2;
          }
        }
        drag.order = order;
      }
      let data = {
        drag,
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          requestSetId: fromTask.request_set_pk,
          requestItemId: drag.taskId
        },
        body: {
          [this.item.field]: toListId,
          order: drag.order
        }
      };
      this.updateRequestItemRequest(data);
    },
    ...mapMutations("ht_store/matter/discovery/status/requestItem", ["cleanUpPageData"]),
    ...mapActions("ht_store/matter/discovery/status/requestSets", [
      "getDataCAFDiscovery"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestItem", [
      "getDataRequestItemRequest",
      "addRequestItemRequest",
      "updateRequestItemRequest",
      "removeRequestItemRequest"
    ])
  },
  mounted() {
    this.updatePagination(this.item, { page: 1 });
    this.getDataCAFDiscovery({ matterId: this.$route.params.matter || this.$route.params.projectId });
    // .then(
    //   ({ results }) => {
    //     this.list[1].list = results.map(x => ({ name: x.name, value: x.pk }));
    //   }
    // );
    this.list[1].list = this.appConfigs.listPriority;
    // this.list[4].list = this.members
    //   .filter(x => x.id !== this.currentUser.pk)
    //   .map(x => ({ name: x.name, value: x.id }));
    this.list[2].list = this.appConfigs.requestStatus;
    this.list[3].list = this.appConfigs.responseStatus;
  }
  // watch: {
  //   members(val) {
  //     const data = val.filter(x => x.id !== this.currentUser.pk);
  //     this.list[4].list = data.map(x => ({ name: x.name, value: x.id }));
  //   }
  // }
};
</script>
