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
    <div class="pa-2" v-for="stage in groupList" :key="stage.id">
      <div class="title" v-if="stage.keyName !== 'ungroup'">{{stage.name}}</div>
      <SlickTable
        class="py-2"
        :totals="totalsConvert(dataRequestTask, stage)"
        :items="itemsConvert(dataRequestTask, stage)"
        :headers="headersFilter.filter(x => x.visible)"
        :idGroup="stage.id+''"
        :group="stage"
        @watchPagination="watchPagination(stage, $event)"
        @onEndDragRows="onEndDragRows"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            @update="updateRequestTask(stage, props.dataRow.id, props.column.name, $event)"
            @remove="removeRequestTask(stage, props.dataRow)"
          />
        </template>
        <template v-slot:top>
          <v-row justify="end" no-gutters class="ma-2">
            <v-btn
              outlined
              color="primary"
              @click="stageAdd = stage; isShowAdd = true; callDataRequestItems()"
            >
              Add new
              <v-icon dark>mdi-add</v-icon>
            </v-btn>
          </v-row>
        </template>
      </SlickTable>
    </div>
    <AddRequestTask
      :isShowFieldRequestSet="true"
      :isShow="isShowAdd"
      @closeModal="isShowAdd = false; stageAdd = {}"
      @add="addRequestTask"
      :stageAdd="stageAdd"
      ref="dialogs"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdView from "./cell/TdView";
import TdName from "./cell/TdName";
import TdRequestItem from "./cell/TdRequestItem";
import TdRequestSet from "./cell/TdRequestSet";
import TdDeadline from "./cell/TdDeadline";
import TdMatterMember from "../../cells/TdMatterMember";
import TdLitigationCode from "./cell/TdLitigationCode";
import TdActivityCode from "./cell/TdActivityCode";
import TdExpenceCode from "./cell/TdExpenceCode";
import TdTimeLog from "./cell/TdTimeLog";
import TdStatus from "./cell/TdStatus";
import TdActachment from "./cell/TdActachment";
import TdNote from "./cell/TdNote";
import TdComment from "./cell/TdComment";
import TdDescription from "./cell/TdDescription";
import TdAction from "./cell/TdAction";
import AddRequestTask from "../../dialogs/AddRequestTask";
import ConfigurationColumnTable from "../../menus/ConfigurationColumnTable";
import DropDown from "../../menus/DropDown";

import { valueNoGroup } from "../../../config";

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
          text: "View Detail",
          value: "view",
          name: "view",
          type: "cell"
        },
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
          text: "Request Set",
          value: "request_set",
          name: "request_set",
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
          visible: true,
          sortable: false,
          text: "Attachment",
          value: "attachments",
          name: "attachments",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Notes",
          value: "note",
          name: "notes",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Comments",
          value: "comments",
          name: "comments",
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
          field: "ungroup",
          name: "All",
          list: [{ value: valueNoGroup, name: "All" }]
        },
        {
          id: 2,
          field: "litigation",
          name: "Litigation",
          list: []
        },
        {
          id: 3,
          field: "activities",
          name: "Activities",
          list: []
        },
        {
          id: 4,
          field: "status",
          name: "Status",
          list: []
        }
      ],
      isShowAdd: false,
      groupList: [],
      valueGroup: []
    };
  },
  created() {
    this.item = this.list[0];
    this.groupList = [{ id: 1, keyName: "ungroup" }];
  },
  computed: {
    headersFilter() {
      return this.headers.filter(x => x.name !== this.item.field);
    },
    ...mapGetters("ht_store/matter/discovery/status/requestTask", ["dataRequestTask"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    itemsConvert(item, stage) {
      if (stage.keyName === "status" || stage.keyName === "ungroup") {
        return ((item[stage.id] || {}).results || []).map(x => ({
          ...x,
          id: x.pk
        }));
      } else if (
        stage.keyName === "litigation" ||
        stage.keyName === "activities"
      ) {
        return ((item[stage.code] || {}).results || []).map(x => ({
          ...x,
          id: x.pk
        }));
      }
    },
    totalsConvert(item, stage) {
      if (stage.keyName === "status" || stage.keyName === "ungroup") {
        return (item[stage.id] || {}).totals;
      } else if (
        stage.keyName === "litigation" ||
        stage.keyName === "activities"
      ) {
        return (item[stage.code] || {}).totals;
      }
    },

    handleGroupBy(item) {
      if (item.field === "status") {
        this.groupList = this.appConfigs.itemStatus;
        this.valueGroup = this.groupList.map(x => x.id);
      } else if (item.field === "activities") {
        this.groupList = this.appConfigs.activitiesCode;
        this.valueGroup = this.groupList.map(x => x.code);
      } else if (item.field === "litigation") {
        this.groupList = this.appConfigs.litigationCode;
        this.valueGroup = this.groupList.map(x => x.code);
      } else if (item.field === "ungroup") {
        this.groupList = [{ id: 1, keyName: "ungroup" }];
      }

      if (this.item.name !== item.name) {
        this.item = item;
        this.clearData();
        const params =
          this.item.name !== "All"
            ? {
                group_by: this.item.field,
                name: this.item.name,
                group_items: this.valueGroup.toString(),
                ungroup: false,
                page: 1
              }
            : { page: 1, ungroup: true };
        this.updatePagination(params);
      }
    },
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdView;
      }
      if (columnName === "name") {
        return TdName;
      }
      if (columnName === "request_item") {
        return TdRequestItem;
      }
      if (columnName === "request_set") {
        return TdRequestSet;
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
      if (columnName === "attachments") {
        return TdActachment;
      }
      if (columnName === "notes") {
        return TdNote;
      }
      if (columnName === "comments") {
        return TdComment;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addRequestTask(data) {
      this.addRequestTaskRequest({
        key: this.stageCheck(this.stageAdd, this.stageAdd.keyName),
        data
      });
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
    removeRequestTask(stage, row) {
      const name = this.item.field;
      const data = {
        name: this.stageCheck(stage, name),
        requestTaskId: row.id,
        request_sets: row.request_set,
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      this.removeRequestTaskRequest(data);
    },
    updatePagination(stage) {
      const body = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        params: { ...stage, page: stage.page || 1 }
      };
      this.getDataRequestTaskRequest(body);
    },
    watchPagination(stage, pagination) {
      const params =
        this.item.name !== "All"
          ? {
              group_by: this.item.field,
              name: this.item.name,
              group_items: this.valueGroup.toString(),
              ungroup: false,
              page: pagination.page
            }
          : { page: pagination.page, ungroup: true };
      this.updatePagination(params);
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
      const convertObject = Object.keys(this.dataRequestTask).reduce(
        (items, key, index) => ({
          ...items,
          ...{
            [[index + 1] || index]: {
              ...this.dataRequestTask[key],
              key
            }
          }
        }),
        {}
      );

      const fromTask = convertObject[fromListId].results.find(
        x => x.pk === taskId
      );
      const keyNameFromList = convertObject[fromListId].key;
      const keyNameToList = convertObject[toListId].key;

      if (fromListId !== toListId) {
        const tasks = convertObject[toListId].results;
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
        const tasks = convertObject[fromListId].results;
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
        drag: {
          ...drag,
          keyNameFromList,
          keyNameToList
        },
        idParams: {
          requestTaskId: drag.taskId,
          matterId: this.$route.params.matter || this.$route.params.projectId,
          request_set: fromTask.request_set
        },
        body: {
          [this.item.field]: keyNameToList,
          order: drag.order
        }
      };
      this.updateRequestTaskRequest(data);
    },
    stageCheck(stage, name) {
      return name === "status" || name === "ungroup"
        ? stage.id
        : name === "activities" || name === "litigation"
        ? stage.code
        : null;
    },
    ...mapMutations("ht_store/matter/discovery/status/requestTask", ["clearData"]),
    ...mapActions("ht_store/matter/discovery/status/requestTask", [
      "getRequestTaskRequest",
      "addRequestTaskRequest",
      "updateRequestTaskRequest",
      "removeRequestTaskRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestTask", [
      "getDataRequestTaskRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestSets/requestItem", [
      "getDataRequestItemRequest"
    ]),
    callDataRequestItems() {
      const stage = { name: "All", page: 1 };
      this.getDataRequestItemRequest({ stage, searchObject: {} });
    }
  },
  mounted() {
    this.clearData();
    this.updatePagination({
      page: 1,
      ungroup: true
    });
    this.callDataRequestItems();
  }
};
</script>
