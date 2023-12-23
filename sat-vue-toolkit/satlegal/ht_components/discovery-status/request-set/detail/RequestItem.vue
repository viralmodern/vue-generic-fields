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
        :items="((dataRequestItem[stage.value] || {}).list || []).map(x => ({...x, id: x.pk}))"
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
            @update="updateRequestItem(stage.value, props.dataRow.id, props.column.name, $event)"
            @remove="removeRequestItem(stage.value, props.dataRow.id)"
          />
        </template>
        <template v-slot:top>
          <div>
            <v-btn outlined color="primary" @click="stageAdd = stage; isShowCreate = true">
              Add new
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </template>
      </SlickTable>
    </div>
    <FormCreateRequestItem
      :isShowPopup="isShowCreate"
      header="Add new request item"
      :stageAdd="{field: this.item.field, ...this.stageAdd}"
      @closeModal="isShowCreate = false"
      @submit="addRequestItem"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SlickTable from "../../../slick-table/SlickTable2";
import TdAction from "../../request-item/cells/TdAction";
import TdTextArea from "../../request-item/cells/TdTextArea";
import TdRequestType from "../../request-item/cells/TdRequestType";
import TdRequestTask from "../../request-item/cells/TdRequestTask";
import TdRequestStatus from "../../request-item/cells/TdRequestStatus";
import TdResponseStatus from "../../request-item/cells/TdResponseStatus";
import TdResponseContent from "../../request-item/cells/TdResponseContent";
import TdPriority from "../../request-item/cells/TdPriority";
import TdSwitch from "../../request-item/cells/TdSwitch";
import TdResponse from "../../request-item/cells/TdResponse";
import TdObjection from "../../request-item/cells/TdObjection";
import TdDate from "../../request-item/cells/TdDate";
import TdAttachment from "../../request-item/cells/TdAttachment";
import TdNote from "../../request-item/cells/TdNote";
import TdCountdown from "../../request-item/cells/TdCountdown";
import TdTimeLog from "../../request-item/cells/TdTimeLog";
import TdMatterMember from "../../../cells/TdMatterMember";
import AddTaskTaskBoard from "../../../inputs/AddInlineEnter";
import FormCreateRequestItem from "../../../dialogs/FormCreateRequestItem";
import ConfigurationColumnTable from "../../../menus/ConfigurationColumnTable";
import DropDown from "../../../menus/DropDown";

import { valueNoGroup } from "../../../../config";

export default {
  components: {
    SlickTable,
    TdTextArea,
    TdRequestType,
    TdRequestStatus,
    TdResponseStatus,
    TdResponseContent,
    TdPriority,
    TdSwitch,
    TdResponse,
    TdObjection,
    TdDate,
    TdMatterMember,
    AddTaskTaskBoard,
    FormCreateRequestItem,
    ConfigurationColumnTable,
    DropDown
  },
  props: {
    dataRequestDetail: Object,
    members: Array,
    currentUser: Object
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
          value: "under_oath",
          name: "under_oath",
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
        {
          id: 2,
          field: "priority",
          name: "Priority",
          list: []
        },
        {
          id: 3,
          field: "members",
          name: "Assigned to",
          list: []
        },
        {
          id: 4,
          field: "request_status",
          name: "Request Status",
          list: []
        },
        {
          id: 5,
          field: "response_status",
          name: "Response Status",
          list: []
        },
        {
          id: 6,
          field: "dispute",
          name: "Dispute",
          list: [
            { name: "Dispute true", value: true },
            { name: "Dispute false", value: false }
          ]
        },
        {
          id: 7,
          field: "under_oath",
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
    ...mapGetters("ht_store/matter/discovery/status/requestSets/requestItem", [
      "dataRequestItem"
    ]),
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
      if (columnName === "name") {
        return TdTextArea;
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
      if (columnName === "under_oath") {
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
      this.addRequestItemRequest({ name: this.stageAdd.value, data });
      this.isShowCreate = false;
    },
    updateRequestItem(item, requestItemId, name, value) {
      const data = {
        name: item,
        idParams: {
          requestItemId
        },
        body: {
          [name]: value
        }
      };
      this.updateRequestItemRequest(data);
    },
    removeRequestItem(name, requestItemId) {
      const data = {
        name,
        requestItemId
      };
      this.removeRequestItemRequest(data);
    },
    updatePagination(stage, pagination = {}) {
      const { page } = pagination;
      const searchObject = {
        [this.item.field]: stage.value,
        page
      };
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
          requestItemId: drag.taskId
        },
        body: {
          [this.item.field]: toListId,
          order: drag.order
        }
      };
      this.updateRequestItemRequest(data);
    },
    ...mapMutations("ht_store/matter/discovery/status/requestSets/requestItem", [
      "cleanUpPageData"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestSets/requestItem", [
      "getDataRequestItemRequest",
      "addRequestItemRequest",
      "updateRequestItemRequest",
      "removeRequestItemRequest"
    ])
  },
  mounted() {
    this.updatePagination(this.item, { page: 1 });
    this.list[1].list = this.appConfigs.listPriority;
    this.list[2].list = this.members
      .filter(x => x.id !== this.currentUser.pk)
      .map(x => ({ name: x.name, value: x.id }));
    this.list[3].list = this.appConfigs.requestStatus;
    this.list[4].list = this.appConfigs.responseStatus;
  },
  watch: {
    members(val) {
      const data = val.filter(x => x.id !== this.currentUser.pk);
      this.list[2].list = data.map(x => ({ name: x.name, value: x.id }));
    }
  }
};
</script>
