<template>
  <v-row fill-height no-gutters>
    <v-col cols="12" class="mt-2">
      <ProjectBoardHeader />
    </v-col>
    <v-row fill-height no-gutters class="pt-2">
      <v-col cols="12">
        <ProjectMainBoard v-if="type === 1" />
        <TasksTable v-else-if="type === 2" />
        <TreeViewBoard class="py-1" v-else-if="type === 3" />
        <GanttViewBoard v-else-if="type === 4" :tasks="tasksInGantt" @addTask="addTaskGantt" />
        <DeskRaci v-else-if="type === 5" />
      </v-col>
      <slot></slot>
    </v-row>
    <v-navigation-drawer fixed :value="rightType === 'filterBoard'" right clipped app>
      <TaskBoardFilterRightMenu />
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ProjectBoardHeader from "../header-wrapper/ProjectBoardHeader";
import ProjectMainBoard from "./ProjectMainBoard";
import TreeViewBoard from "./TreeViewBoard";
import GanttViewBoard from "./GanttViewBoard";
import DeskRaci from "./DeskRaci";
import TasksTable from "../slick-table/TasksTable";
import TaskBoardFilterRightMenu from "../right-menus/TaskBoardFilter";
export default {
  components: {
    ProjectBoardHeader,
    ProjectMainBoard,
    TasksTable,
    TreeViewBoard,
    GanttViewBoard,
    DeskRaci,
    TaskBoardFilterRightMenu
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapGetters({
      dataProject: "projectBoard/getDataProject"
    }),
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/task/list", ["tasksInGantt", "optionsInGantt"]),
    checkListData() {
      return this.dataProject.checkList;
    }
  },
  methods: {
    ...mapActions({
      fetchDataProject: "projectBoard/getDataProject"
    }),
    ...mapActions("ht_store/project/board/list", ["getDataListBoardRequest"]),
    addTaskGantt(data) {
      if (data.handle === "add_list") {
        delete data.handle;
        this.addTopicTaskBoard(data);
      }
      if (data.handle === "add_task") {
        delete data.handle;
        this.addItemTaskBoard(data);
      }
      if (data.handle === "add_subTask") {
        delete data.handle;
        this.addSubTaskBoard(data);
      }
    },
    ...mapActions("ht_store/task/list", [
      "getAllTasks",
      "getAllTaskStages",
      "addTopicTaskBoard",
      "addItemTaskBoard",
      "addSubTaskBoard"
    ]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    ...mapActions("ht_store/matter/citations", ["getDataCitationsFromApi"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/briefcase/docket", ["getDataDocketRequest"]),
    ...mapActions("ht_store/matter/discovery/toolbox", ["getDataToolboxRequest"]),
    ...mapActions("ht_store/task/detail/labels", ["getDataListLabelRequest"]),
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    ...mapActions("ht_store/matter/discovery/evidences", ["getDataDiscoveryEvidences"]),
    ...mapActions("ht_store/matter/discovery/log", ["getDataDiscoveryLogRequest"]),
    ...mapActions("ht_store/matter/discovery/index", ["getDataIndexDiscovery"]),
    ...mapActions("ht_store/matter/hearing", ["getDataMatterHearingRequest"]),
    ...mapActions("ht_store/document/all", ["getDocumentAllRequest"]),
    ...mapActions("ht_store/task/list/issue", ["getDataDeskIssueRequest"])
  },
  created() {
    this.fetchDataProject();
    this.getAllTasks();
    this.getAllTaskStages();
    this.getDataListBoardRequest();
    this.getDataMemberRequest();
    this.getDataCitationsFromApi();
    this.getDataCharacterRequest();
    this.getDataDocketRequest();
    this.getDataToolboxRequest();
    this.getDataListLabelRequest();
    this.getDataFactsResearchRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      page: 1
    });
    this.getDataDiscoveryEvidences();
    this.getDataDiscoveryLogRequest();
    this.getDataMatterHearingRequest();
    this.getDataIndexDiscovery();
    this.getDocumentAllRequest(1);
    this.getDataDeskIssueRequest();
  },
  watch: {
    $route: function() {
      // call api
    }
  }
};
</script>

<style scoped>
.left-menu {
  width: 250px;
  border-right: 1px solid silver;
}
</style>
