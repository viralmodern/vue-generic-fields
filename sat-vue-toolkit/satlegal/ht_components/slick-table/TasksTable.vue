<template>
  <div class="px-3">
    <v-row no-gutters class="d-flex justify-space-between">
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
              <v-row class="justify-end mx-2">
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
import SlickTable from "./SlickTable";
import TreeviewMenuAdd from "../menus/TreeviewMenuAdd";
import AddTaskTaskBoard from "../inputs/AddInlineEnter";
import ConfirmItem from "../dialogs/ConfirmItem";
import EditListTaskBoard from "../menus/EditListTaskBoard";
import DialogEditTaskBoard from "../dialogs/DialogEditTaskBoard";
// General Columns
import TaskName from "../cells/TaskName";
import TaskLabels from "../cells/TaskLabels";
import TaskDueDate from "../cells/TaskDueDate";
import TaskMembers from "../cells/TaskMembers";
import TaskProgress from "../cells/TaskProgress";
import TaskCheckLists from "../cells/TaskCheckLists";
import TaskWorkLogs from "../cells/TaskWorkLogs";
import TaskAttachments from "../cells/TaskAttachments";
import TaskNotes from "../cells/TaskNotes";
import TaskComments from "../cells/TaskComments";
import TaskActivities from "../cells/TaskActivities";
import TaskSubTasks from "../cells/TaskSubTasks";
import TaskEstimation from "../cells/TaskEstimation";
// Byzantine Columns
import TaskRisk from "../cells/TaskRisk";
import TaskFavorable from "../cells/TaskFavorable";
import TaskLocations from "../cells/TaskLocations";
import TaskTreatment from "../cells/TaskTreatment";
import TdCharacters from "../cells/TdCharacters";
import TaskVulnerability from "../cells/TaskVulnerability";
import TaskCharacterGroup from "../cells/TaskCharacterGroup";
import TaskStatuteOfLimitations from "../cells/TaskStatuteOfLimitations";
import TaskDateHappened from "../cells/TaskDateHappened";
import TaskCountDown from "../cells/TaskCountDown";
import TaskGapTime from "../cells/TaskGapTime";
//Type Column
import TaskFactType from "../cells/TaskFactType";
import TaskEvidenceType from "../cells/TaskEvidenceType";
import TaskCharacterType from "../cells/TaskCharacterType";
// Date and Time Columns
import TaskCraetedDate from "../cells/TaskCraetedDate";
import TaskAddedDate from "../cells/TaskAddedDate";
import TaskCreatedBy from "../cells/TaskCreatedBy";
import TaskAddBy from "../cells/TaskAddBy";
import TaskReceivedDate from "../cells/TaskReceivedDate";
import TaskReceivedBy from "../cells/TaskReceivedBy";
// Strategy Columns
import TaskPremise from "../cells/TaskPremise";
import TaskAttackPlan from "../cells/TaskAttackPlan";
// Log Columns
import TaskPrivilegeLog from "../cells/TaskPrivilegeLog";
import TaskChainOfCustody from "../cells/TaskChainOfCustody";
import TaskCommunicationLog from "../cells/TaskCommunicationLog";
import TaskExhibitLog from "../cells/TaskExhibitLog";
// Toolbox Columns
import TaskRequestForProduction from "../cells/TaskRequestForProduction";
import TaskRequestForAdmission from "../cells/TaskRequestForAdmission";
import TaskWishlist from "../cells/TaskWishlist";
import TaskInterrogatory from "../cells/TaskInterrogatory";
import TaskDeposition from "../cells/TaskDeposition";
// Linked Columns
import TaskIssues from "../cells/TaskIssues";
import TdFacts from "../cells/TdFacts";
import TaskHearsays from "../cells/TaskHearsays";
import TdIndex from "../cells/TdIndex";
import TaskDocket from "../cells/TaskDocket";
import TdCitation from "../cells/TdCitation";
import TaskEvidences from "../cells/TaskEvidences";
import TaskTestimonials from "../cells/TaskTestimonials";
import TaskMatterHearing from "../cells/TaskMatterHearing";
import TdDocumentRequest from "../cells/TdDocumentRequest";

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
      { title: "Card name", visible: true, name: "cardName", priority: 0 },
      { title: "Labels", visible: true, name: "labels", priority: 1 },
      { title: "Due date", visible: true, name: "dueDate", priority: 2 },
      { title: "Members", visible: true, name: "members", priority: 3 },
      { title: "Progress", visible: true, name: "progress", priority: 4 },
      { title: "Check List", visible: true, name: "checkList", priority: 5 },
      {
        title: "Work logs",
        visible: true,
        name: "timeEntries",
        priority: 6
      },
      { title: "Attachment", visible: true, name: "attachment", priority: 7 },
      { title: "Notes", visible: false, name: "notes", priority: 8 },
      { title: "Comments", visible: false, name: "comments", priority: 9 },
      {
        title: "Card activities",
        visible: false,
        name: "cardActivities",
        priority: 10
      },
      { title: "Sub tasks", visible: false, name: "subTasks", priority: 11 },
      { title: "Estimation", visible: false, name: "estimation", priority: 12 },

      //Byzantine Columns
      { title: "Treatment", visible: false, name: "treatment", priority: 13 },
      { title: "Character", visible: false, name: "character", priority: 14 },
      {
        title: "Character Group",
        visible: false,
        name: "charactergroup",
        priority: 15
      },
      {
        title: "Statute of Limitations",
        visible: false,
        name: "statuteOfLimitations",
        priority: 17
      },
      { title: "Risk", visible: false, name: "risk", priority: 20 },
      { title: "Favorable", visible: false, name: "favorable", priority: 21 },
      {
        title: "Vulnerability",
        visible: false,
        name: "vulnerability",
        priority: 22
      },
      { title: "Location", visible: false, name: "location", priority: 23 },

      //Linked Column
      { title: "Issues", visible: false, name: "issues", priority: 24 },
      { title: "Facts", visible: false, name: "facts", priority: 25 },
      { title: "Hearsays", visible: false, name: "hearsays", priority: 26 },
      { title: "Index", visible: false, name: "index", priority: 27 },
      { title: "Docket", visible: false, name: "docket", priority: 28 },
      {
        title: "Citations",
        visible: false,
        name: "dataCitation",
        priority: 29
      },
      { title: "Evidences", visible: false, name: "evidences", priority: 30 },
      {
        title: "Testimony",
        visible: false,
        name: "testimony",
        priority: 31
      },
      {
        title: "Matter Hearning",
        visible: false,
        name: "matterHearing",
        priority: 32
      },
      {
        title: "Document Request",
        visible: false,
        name: "documentRequest",
        priority: 33
      },

      // Log Columns
      {
        title: "Privilege Log",
        visible: false,
        name: "privilegelog",
        priority: 34
      },
      {
        title: "Chain of Custody",
        visible: false,
        name: "chainofcustody",
        priority: 35
      },
      {
        title: "Commuication Log",
        visible: false,
        name: "commuicationlog",
        priority: 36
      },
      {
        title: "Exhibit Log",
        visible: false,
        name: "exhibitlog",
        priority: 37
      },

      // Toolbox Columns
      {
        title: "Request Of Production",
        visible: false,
        name: "requestOfProduction",
        priority: 38
      },
      {
        title: "Request Of Admissions",
        visible: false,
        name: "requestOfAdmission",
        priority: 39
      },
      { title: "Wishlist", visible: false, name: "wishlist", priority: 40 },
      {
        title: "Set of Interrogatory",
        visible: false,
        name: "interrogatory",
        priority: 41
      },
      { title: "Deposition", visible: false, name: "deposition", priority: 42 },

      // Date and Time Columns
      {
        title: "Created Date",
        visible: false,
        name: "createddate",
        priority: 43
      },
      { title: "Added Date", visible: false, name: "addeddate", priority: 44 },
      { title: "Created By", visible: false, name: "createdBy", priority: 45 },
      { title: "Add By", visible: false, name: "addBy", priority: 46 },
      {
        title: "Received Date",
        visible: false,
        name: "receiveddate",
        priority: 47
      },
      {
        title: "Received By",
        visible: false,
        name: "receivedBy",
        priority: 48
      },

      // Type Columns
      { title: "Fact Type", visible: false, name: "factType", priority: 49 },
      {
        title: "Evidence Type",
        visible: false,
        name: "evidenceType",
        priority: 50
      },
      {
        title: "Character Type",
        visible: false,
        name: "characterType",
        priority: 51
      },

      // Strategy Columns
      { title: "Premise", visible: false, name: "premise", priority: 52 },
      { title: "Attack Plan", visible: false, name: "attackplan", priority: 53 }
    ]);
  },
  updated() {
    this.initSortable();
  },
  methods: {
    ...mapMutations("ht_store/task/list", [
      "moveTask",
      "moveStage",
      "changeTaskStage",
      "editListName",
      "removeItemTaskBoard"
    ]),
    ...mapMutations("ht_store/slick", ["initializeAllColumns"]),
    ...mapActions("ht_store/task/list", [
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
        activities: [],
        attachment: [],
        checkList: [],
        dataCitation: [],
        dueDate: new Date().toISOString(),
        estimation: null,
        favorable: {
          id: 1,
          name: "Plaintiff"
        },
        hasDescription: false,
        labels: [],
        location: [],
        members: [],
        notes: [],
        people: [],
        priority: 1,
        progress: 20,
        risk: {
          id: 1,
          name: "Very Low"
        },
        subTasks: [],
        worklogs: [],
        vulnerability: {
          id: 1,
          name: "Very Low"
        },
        treatment: {
          id: 1,
          name: "Overruled"
        },
        limitaion: {
          date: new Date().toISOString(),
          time: new Date()
            .toLocaleString()
            .split(",")[1]
            .trim(),
          yearLimitation: 1
        },
        ticketMessages: [],
        cardName: name,
        stage: {
          id: stageId
        },
        character: [],
        docket: [],
        requestOfProduction: [],
        requestOfAdmission: [],
        wishlist: [],
        deposition: [],
        interrogatory: [],
        issues: [],
        facts: [],
        hearsays: [],
        evidences: [],
        testimony: [],
        privilegelog: [],
        chainofcustody: [],
        commuicationlog: [],
        exhibitlog: [],
        matterHearing: [],
        createdBy: 1,
        addBy: 1,
        receivedBy: 1,
        createdDate: "2019-06-21T04:32:28.056Z",
        addedDate: "2019-06-23T13:11:26.421Z",
        receivedDate: "2019-06-23T13:11:26.421Z",
        factType: 1,
        characterType: 1,
        evidenceType: 1,
        index: [],
        documentRequest: []
      };
      this.addItemTaskBoard(data);
    },
    getDisplayComponent(columnName) {
      // General Columns
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
        return TaskMembers;
      }
      if (columnName === "progress") {
        return TaskProgress;
      }
      if (columnName === "checkList") {
        return TaskCheckLists;
      }
      if (columnName === "timeEntries") {
        return TaskWorkLogs;
      }
      if (columnName === "attachment") {
        return TaskAttachments;
      }
      if (columnName === "notes") {
        return TaskNotes;
      }
      if (columnName === "comments") {
        return TaskComments;
      }
      if (columnName === "cardActivities") {
        return TaskActivities;
      }
      if (columnName === "subTasks") {
        return TaskSubTasks;
      }
      if (columnName === "estimation") {
        return TaskEstimation;
      }
      //Byzantine Columns
      if (columnName === "treatment") {
        return TaskTreatment;
      }
      if (columnName === "character") {
        return TdCharacters;
      }
      if (columnName === "charactergroup") {
        return TaskCharacterGroup;
      }
      if (columnName === "statuteOfLimitations") {
        return TaskStatuteOfLimitations;
      }
      if (columnName === "gaptime") {
        return TaskGapTime;
      }
      if (columnName === "countdown") {
        return TaskCountDown;
      }
      if (columnName === "datehappened") {
        return TaskDateHappened;
      }
      if (columnName === "risk") {
        return TaskRisk;
      }
      if (columnName === "favorable") {
        return TaskFavorable;
      }
      if (columnName === "vulnerability") {
        return TaskVulnerability;
      }
      if (columnName === "location") {
        return TaskLocations;
      }
      //Type Column
      if (columnName === "factType") {
        return TaskFactType;
      }
      if (columnName === "evidenceType") {
        return TaskEvidenceType;
      }
      if (columnName === "characterType") {
        return TaskCharacterType;
      }
      // Date and Time Columns
      if (columnName === "createddate") {
        return TaskCraetedDate;
      }
      if (columnName === "addeddate") {
        return TaskAddedDate;
      }
      if (columnName === "createdBy") {
        return TaskCreatedBy;
      }
      if (columnName === "addBy") {
        return TaskAddBy;
      }
      if (columnName === "receiveddate") {
        return TaskReceivedDate;
      }
      if (columnName === "receivedBy") {
        return TaskReceivedBy;
      }
      // Strategy Columns
      if (columnName === "premise") {
        return TaskPremise;
      }
      if (columnName === "attackplan") {
        return TaskAttackPlan;
      }
      // Log Columns
      if (columnName === "privilegelog") {
        return TaskPrivilegeLog;
      }
      if (columnName === "chainofcustody") {
        return TaskChainOfCustody;
      }
      if (columnName === "commuicationlog") {
        return TaskCommunicationLog;
      }
      if (columnName === "exhibitlog") {
        return TaskExhibitLog;
      }
      // Toolbox Columns
      if (columnName === "requestOfProduction") {
        return TaskRequestForProduction;
      }
      if (columnName === "requestOfAdmission") {
        return TaskRequestForAdmission;
      }
      if (columnName === "wishlist") {
        return TaskWishlist;
      }
      if (columnName === "interrogatory") {
        return TaskInterrogatory;
      }
      if (columnName === "deposition") {
        return TaskDeposition;
      }
      // Linked Columns
      if (columnName === "issues") {
        return TaskIssues;
      }
      if (columnName === "facts") {
        return TdFacts;
      }
      if (columnName === "hearsays") {
        return TaskHearsays;
      }
      if (columnName === "index") {
        return TdIndex;
      }
      if (columnName === "docket") {
        return TaskDocket;
      }
      if (columnName === "dataCitation") {
        return TdCitation;
      }
      if (columnName === "evidences") {
        return TaskEvidences;
      }
      if (columnName === "testimony") {
        return TaskTestimonials;
      }
      if (columnName === "matterHearing") {
        return TaskMatterHearing;
      }
      if (columnName === "documentRequest") {
        return TdDocumentRequest;
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
    ...mapGetters("ht_store/task/list", ["tasksInStages", "loading"]),
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
