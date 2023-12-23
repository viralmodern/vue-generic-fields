<template>
  <div>
    <div class="text-xs-right">
      <ConfigurationColumnTable
        :columns="headersFilter"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </div>
    <div class="pa-2" v-for="stage in item.list" :key="stage.value">
      <div class="title" v-if="stage.name !== 'All'">{{stage.name}}</div>
      <SlickTable
        class="py-2"
        :totals="(dataRequestTask[stage.value] || {}).totals"
        :items="(dataRequestTask[stage.value] || {}).list"
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
            @update="updateRequestTask(stage.value, props.dataRow.id, props.column.name, $event)"
            @remove="removeRequestTask(stage.value, props.dataRow.id)"
          />
        </template>
        <template v-slot:top>
          <div>
            <v-btn outlined color="primary" @click="stageAdd = stage; isShowAdd = true">
              Add new
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </template>
      </SlickTable>
    </div>
    <AddRequestTask
      :isShow="isShowAdd"
      @closeModal="isShowAdd = false"
      @add="addRequestTask"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../../slick-table/SlickTable2";
import TdName from "../../request-task/cell/TdName";
import TdRequestItem from "../../request-task/cell/TdRequestItem";
import TdDeadline from "../../request-task/cell/TdDeadline";
import TdMatterMember from "../../../cells/TdMatterMember";
import TdLitigationCode from "../../request-task/cell/TdLitigationCode";
import TdActivityCode from "../../request-task/cell/TdActivityCode";
import TdExpenceCode from "../../request-task/cell/TdExpenceCode";
import TdTimeLog from "../../request-task/cell/TdTimeLog";
import TdStatus from "../../request-task/cell/TdStatus";
import TdActachment from "../../request-task/cell/TdActachment";
import TdNote from "../../request-task/cell/TdNote";
import TdComment from "../../request-task/cell/TdComment";
import TdDescription from "../../request-task/cell/TdDescription";
import TdAction from "../../request-task/cell/TdAction";
import AddRequestTask from "../../../dialogs/AddRequestTask";
import ConfigurationColumnTable from "../../../menus/ConfigurationColumnTable";
import DropDown from "../../../menus/DropDown";
import { valueNoGroup } from "../../../../config";

export default {
  components: {
    SlickTable,
    AddRequestTask,
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
          text: "Name",
          value: "name",
          name: "name",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Request",
          value: "request_item",
          name: "request_item",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Deadline",
          value: "deadline",
          name: "deadline",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Description",
          value: "desc",
          name: "desc",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Members",
          value: "members",
          name: "members",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Litigation code",
          value: "litigation",
          name: "litigation",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Activities code",
          value: "activities",
          name: "activities",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Expence code",
          value: "expence_code",
          name: "expence_code",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Time log",
          value: "time",
          name: "time",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Status",
          value: "status",
          name: "status",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Attachment",
          value: "attachment",
          name: "attachment",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Note",
          value: "note",
          name: "note",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Comment",
          value: "comment",
          name: "comment",
          type: "cell 2"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action",
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
          field: "request_set",
          name: "Request Set",
          list: []
        }
      ],
      isShowAdd: false
    };
  },
  created() {
    this.item = this.list[0];
  },
  computed: {
    headersFilter() {
      return this.headers.filter(x => x.name !== this.item.field);
    },
    ...mapGetters("ht_store/matter/discovery/status/requestSets/task", [
      "dataRequestTask"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        this.clearData();
        this.updatePagination(
          {
            field: this.item.field,
            name: this.item.name,
            value: this.item.list.map(x => x.value)
          },
          { page: 1 }
        );
      }
    },
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "request_item") {
        return TdRequestItem;
      }
      if (columnName === "deadline") {
        return TdDeadline;
      }
      if (columnName === "members") {
        return TdMatterMember;
      }
      if (columnName === "litigation") {
        return TdLitigationCode;
      }
      if (columnName === "activities") {
        return TdActivityCode;
      }
      if (columnName === "expence_code") {
        return TdExpenceCode;
      }
      if (columnName === "time") {
        return TdTimeLog;
      }
      if (columnName === "status") {
        return TdStatus;
      }
      if (columnName === "desc") {
        return TdDescription;
      }
      if (columnName === "attachment") {
        return TdActachment;
      }
      if (columnName === "note") {
        return TdNote;
      }
      if (columnName === "comment") {
        return TdComment;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addRequestTask(data) {
      this.addRequestTaskRequest({ name: this.stageAdd.value, data });
      this.isShowAdd = false;
    },
    updateRequestTask(item, requestTaskId, name, value) {
      const data = {
        name: item,
        idParams: {
          requestTaskId
        },
        body: {
          [name]: value
        }
      };
      this.updateRequestTaskRequest(data);
    },
    removeRequestTask(name, requestTaskId) {
      const data = {
        name,
        requestTaskId
      };
      this.removeRequestTaskRequest(data);
    },
    updatePagination(stage, pagination = {}) {
      const { page } = pagination;
      const searchObject = {
        [this.item.field]: stage.value,
        page
      };
      this.getDataRequestTaskRequest({ stage, searchObject });
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
      const fromTask = this.dataRequestTask[fromListId].list.find(
        x => x.id === taskId
      );
      if (fromListId !== toListId) {
        const tasks = this.dataRequestTask[toListId].list;
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
        const tasks = this.dataRequestTask[fromListId].list;
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
          requestTaskId: drag.taskId
        },
        body: {
          [this.item.field]: toListId,
          order: drag.order
        }
      };
      this.updateRequestTaskRequest(data);
    },
    ...mapMutations("ht_store/matter/discovery/status/requestSets/task", ["clearData"]),
    ...mapActions("ht_store/matter/discovery/status/requestSets/task", [
      "getRequestTaskRequest",
      "addRequestTaskRequest",
      "updateRequestTaskRequest",
      "removeRequestTaskRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestSets", [
      "getDataCAFDiscovery"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestSets/task", [
      "getDataRequestTaskRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestItem", [
      "getDataRequestItemRequest"
    ])
  },
  mounted() {
    this.clearData();
    this.updatePagination(this.item, { page: 1 });
    this.getDataCAFDiscovery({ matterId: this.$route.params.matter || this.$route.params.projectId }).then(
      ({ results }) => {
        this.list[1].list = results.map(x => ({ name: x.name, value: x.pk }));
      }
    );
    this.getDataRequestItemRequest();
  }
};
</script>
