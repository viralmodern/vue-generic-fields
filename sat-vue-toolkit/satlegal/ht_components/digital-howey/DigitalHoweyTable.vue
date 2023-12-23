<template>
  <div class="px-3">
    <v-row class="d-flex justify-space-between ma-2">
      <div>
        <TreeviewMenuAdd
          requireName="Name table is required"
          label="Name table"
          nameBtn="Add a List"
          class="btn-add"
          @add="createAListTable"
        />
      </div>
      <ConfigurationMenu />
    </v-row>
    <draggable
      class="list-group"
      tag="div"
      v-model="stages"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group tag="div" type="transition" :name="!drag ? 'flip-list' : null">
        <div v-for="item in tasksInStages" :key="item.alias" class="pb-2">
          <v-row no-gutters class="drag-handler justify-space-between">
            <h2>
              <v-icon>mdi-drag_indicator</v-icon>
              {{ item.name }}
            </h2>
            <EditListTaskBoard
              @editNameTaskboard="openModalEditTaskList(item)"
              @deleteItemTaskboard="opentModalDelete(item)"
            />
          </v-row>
          <SlickTable
            :items="item.tasks"
            :loading="loading"
            :pagination.sync="pagination"
            :filterObject.sync="filterObject"
            :dragging="drag"
            :ref="item.alias"
          >
            <template slot="cell" slot-scope="props">
              <component
                :is="getDisplayComponent(props.column.name)"
                :column="props.column"
                :dataRow="props.dataRow"
                @update="
                  updateTask2Request({
                    id: props.dataRow.id,
                    [props.column.name]: $event
                  })
                "
                @click.native.stop
              />
            </template>
            <template slot="cellFilter" slot-scope="props">
              <component
                :is="getFilterComponent(props.column.name)"
                :column="props.column"
                :filterObject="props.filterObject"
                :changeFilter="props.changeFilter"
              />
            </template>
            <template v-slot:top>
              <v-row class="justify-end mx-3">
                <AddTaskTaskBoard
                  class="pl-3 py-2"
                  style="width:400px"
                  requireName="Name task is required"
                  label="Add new task"
                  hint="Enter to add new task"
                  prepend-inner-icon="mdi-plus"
                  @add="addTask({ stageId: item.id, name: $event })"
                />
              </v-row>
            </template>
          </SlickTable>
        </div>
      </transition-group>
    </draggable>
    <DialogEditTaskBoard
      title="Edit title board list"
      :itemList="itemList"
      :isDialogEdit="isDialogEdit"
      label="Name list"
      @add="editNameList"
      requireName="Name list is required"
      @closeDialog="isDialogEdit = false"
    />
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="confirmDeleteTaskBoard"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import ConfigurationMenu from "./ConfigurationMenu";
import Sortable from "sortablejs";
import SlickTable from "../slick-table/SlickTable";
import TreeviewMenuAdd from "../menus/TreeviewMenuAdd";
import AddTaskTaskBoard from "../inputs/AddInlineEnter";
import ConfirmItem from "../dialogs/ConfirmItem";
import EditListTaskBoard from "../menus/EditListTaskBoard";
import DialogEditTaskBoard from "../dialogs/DialogEditTaskBoard";
// General Columns
import TaskAction from "./cells/TaskAction";
import TaskName from "./cells/TaskName";
import TaskLabels from "./cells/TaskLabels";
import TaskDueDate from "./cells/TaskDueDate";
import TdMembers from "../cells/TdMembers";
import TaskProgress from "./cells/TaskProgress";
import TaskCheckLists from "./cells/TaskCheckLists";
import TaskWorkLogs from "./cells/TaskWorkLogs";
import TaskAttachments from "./cells/TaskAttachments";
import TaskNotes from "./cells/TaskNotes";
import TaskComments from "./cells/TaskComments";
import TaskActivities from "./cells/TaskActivities";
import TaskSubTasks from "./cells/TaskSubTasks";
import TaskEstimation from "./cells/TaskEstimation";

import FilterTaskName from "../filter/TaskCardName";
export default {
  components: {
    SlickTable,
    ConfigurationMenu,
    EditListTaskBoard,
    DialogEditTaskBoard,
    ConfirmItem,
    draggable,
    TreeviewMenuAdd,
    AddTaskTaskBoard
  },
  data() {
    return {
      pagination: null,
      filterObject: {},
      drag: false,
      isDialogEdit: false,
      itemList: null,
      isShowPopup: false
    };
  },
  mounted() {
    this.initializeAllColumns([
      // General Columns
      { title: "View detail", visible: true, name: "action", priority: 0 },
      { title: "Card name", visible: true, name: "cardName", priority: 1 },
      { title: "Labels", visible: true, name: "labels", priority: 2 },
      { title: "Due date", visible: true, name: "dueDate", priority: 3 },
      { title: "Members", visible: true, name: "members", priority: 4 },
      { title: "Progress", visible: true, name: "progress", priority: 5 },
      { title: "Check List", visible: true, name: "checkList", priority: 6 },
      {
        title: "Work logs",
        visible: false,
        name: "worklogs",
        priority: 7
      },
      { title: "Attachment", visible: false, name: "attachment", priority: 8 },
      { title: "Notes", visible: false, name: "notes", priority: 9 },
      {
        title: "Comments",
        visible: false,
        name: "ticketMessages",
        priority: 10
      },
      {
        title: "Card activities",
        visible: false,
        name: "activities",
        priority: 11
      },
      { title: "Sub tasks", visible: false, name: "subTasks", priority: 12 },
      { title: "Estimation", visible: false, name: "estimation", priority: 13 }
    ]);
  },
  updated() {
    this.initSortable();
  },
  methods: {
    ...mapMutations("ht_store/matter/digitalHoweyChecklist/task", [
      "moveTask",
      "moveStage",
      "changeTaskStage",
      "editListName",
      "removeItemTaskBoard"
    ]),
    ...mapMutations("ht_store/slick", ["initializeAllColumns"]),
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task", [
      "updateTask2Request",
      "addTopicTaskBoard",
      "addItemTaskBoard"
    ]),
    openModalEditTaskList(item) {
      this.itemList = item;
      this.isDialogEdit = true;
    },
    opentModalDelete(item) {
      this.itemList = item;
      this.isShowPopup = true;
    },
    confirmDeleteTaskBoard() {
      this.removeItemTaskBoard(this.itemList);
      this.isShowPopup = false;
    },
    createAListTable(o) {
      const data = {
        id: Math.random(),
        name: o.name,
        alias: o.name.toLowerCase()
      };
      this.addTopicTaskBoard(data);
    },
    addTask({ stageId, name }) {
      const data = {
        id: Math.random(),
        cardName: name,
        labels: [],
        dueDate: new Date().toISOString(),
        startDate: new Date().toISOString(),
        progress: 0,
        members: [],
        checkList: [],
        worklogs: 0,
        attachment: 0,
        notes: 0,
        activities: [
          {
            id: 1,
            executor: {
              name: "Thuan Ho",
              imageUrl:
                "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
              department: {
                link: "/department/1902",
                name: "htactive"
              }
            },
            task: "#12 - Add some color scheme",
            executedDate: "2019-01-20T17:00:00.000Z",
            destinationObject: {
              type: "task",
              link: "/task/18921",
              title: "Something Messes up the text color in chrome"
            },
            action: {
              text: "Modify on",
              icon: { name: "create", color: "default" },
              changes: [
                {
                  title: "Priority",
                  from: "4",
                  to: "3"
                },
                {
                  title: "Status",
                  from: "Todo",
                  to: "Doing"
                }
              ]
            }
          },
          {
            id: 2,
            executor: {
              name: "Thuan Ho",
              imageUrl:
                "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
              department: {
                link: "/department/1902",
                name: "htactive"
              }
            },
            task: "#12 - Add some color scheme",
            executedDate: "2019-01-20T17:00:00.000Z",
            destinationObject: {
              type: "task",
              link: "/task/18921",
              title: "Something Messes up the text color in chrome"
            },
            action: {
              text: "Modify on",
              icon: { name: "create", color: "default" },
              changes: [
                {
                  title: "Priority",
                  from: "4",
                  to: "3"
                },
                {
                  title: "Status",
                  from: "Todo",
                  to: "Doing"
                }
              ]
            }
          }
        ],
        subTasks: [],
        estimation: null,
        ticketMessages: 0,
        stage: {
          id: stageId
        }
      };
      this.addItemTaskBoard(data);
    },
    getDisplayComponent(columnName) {
      // General Columns
      if (columnName === "action") {
        return TaskAction;
      }
      if (columnName === "cardName") {
        return TaskName;
      }
      if (columnName === "labels") {
        return TaskLabels;
      }
      if (columnName === "dueDate") {
        return TaskDueDate;
      }
      if (columnName === "members") {
        return TdMembers;
      }
      if (columnName === "progress") {
        return TaskProgress;
      }
      if (columnName === "checkList") {
        return TaskCheckLists;
      }
      if (columnName === "worklogs") {
        return TaskWorkLogs;
      }
      if (columnName === "attachment") {
        return TaskAttachments;
      }
      if (columnName === "notes") {
        return TaskNotes;
      }
      if (columnName === "ticketMessages") {
        return TaskComments;
      }
      if (columnName === "activities") {
        return TaskActivities;
      }
      if (columnName === "subTasks") {
        return TaskSubTasks;
      }
      if (columnName === "estimation") {
        return TaskEstimation;
      }
      return "td";
    },
    getFilterComponent(columnName) {
      if (columnName === "cardName") {
        return FilterTaskName;
      }
      return FilterTaskName;
    },
    initSortable() {
      this.tasksInStages.forEach(stage => {
        const ref = this.$refs[stage.alias];
        if (!ref) return;
        const tbody = ref[0].$el.getElementsByTagName("tbody")[0];
        if (!tbody) return;
        const _self = this;
        const stageId = stage.id;
        tbody.setAttribute("stage-id", stageId);

        Sortable.create(tbody, {
          onEnd(event) {
            const fromStageId = stageId;
            const targetStageId = parseInt(event.to.getAttribute("stage-id"));

            const fromStage = _self.tasksInStages.filter(
              x => x.id === fromStageId
            )[0];
            const targetStage = _self.tasksInStages.filter(
              x => x.id === targetStageId
            )[0];
            const fromStageIndex = _self.tasksInStages.indexOf(fromStage);
            const targetStageIndex = _self.tasksInStages.indexOf(targetStage);
            if (!fromStage || !targetStage) return;
            const fromElement = fromStage.tasks[event.oldIndex];
            const toElement = targetStage.tasks[event.newIndex] || {
              priority: 1000
            };
            if (!toElement || !fromElement) return;
            _self.moveTask({
              id: fromElement.id,
              priority: toElement.priority,
              isMoveUp:
                fromStageId === targetStageId
                  ? event.newIndex - event.oldIndex < 0
                  : targetStageIndex - fromStageIndex
            });
            if (fromStageId !== targetStageId) {
              _self.changeTaskStage({
                id: fromElement.id,
                newStageId: targetStageId
              });
            }
            _self.drag = false;
          },
          onStart() {
            _self.drag = true;
          },
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        });
      });
    },
    editNameList(data) {
      this.editListName(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task", [
      "tasksInStages",
      "loading"
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: "stages",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    stages: {
      get() {
        return this.tasksInStages.map(x => x.id);
      },
      set(value) {
        this.moveStage(value);
      }
    }
  }
};
</script>

<style scoped>
.drag-handler {
  cursor: move;
}
</style>

<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.v-datatable__actions > div:first-child {
  flex: 1;
}
</style>
