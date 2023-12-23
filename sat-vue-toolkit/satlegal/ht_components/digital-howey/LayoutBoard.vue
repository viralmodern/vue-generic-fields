<template>
  <div>
    <v-col cols="12">
      <DigitalHoweyHeader />
    </v-col>
    <v-row fill-height no-gutters class="pt-2">
      <v-col>
        <DigitalHoweyKanban v-if="type === 1" />
        <DigitalHoweyTable v-else-if="type === 2" />
        <DigitalHoweyTreeview class="py-1" v-else-if="type === 3" />
        <DigitalHoweyGantt v-else-if="type === 4" :tasks="tasksInGantt" @addTask="addTaskGantt" />
      </v-col>
      <slot></slot>
    </v-row>
    <v-navigation-drawer fixed :value="rightType === 'filterBoard'" right clipped app>
      <TaskBoardFilterRightMenu />
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DigitalHoweyHeader from "./DigitalHoweyHeader";
import DigitalHoweyKanban from "./DigitalHoweyKanban";
import DigitalHoweyTreeview from "./DigitalHoweyTreeview";
import DigitalHoweyGantt from "./DigitalHoweyGantt";
import DigitalHoweyTable from "./DigitalHoweyTable";
import TaskBoardFilterRightMenu from "../right-menus/TaskBoardFilter";
export default {
  components: {
    DigitalHoweyHeader,
    DigitalHoweyKanban,
    DigitalHoweyTable,
    DigitalHoweyTreeview,
    DigitalHoweyGantt,
    TaskBoardFilterRightMenu
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task", [
      "tasksInGantt",
      "optionsInGantt"
    ])
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHoweyChecklist", ["getDataListBoardRequest"]),
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
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task", [
      "getAllTasks",
      "getAllTaskStages",
      "addTopicTaskBoard",
      "addItemTaskBoard",
      "addSubTaskBoard"
    ]),
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/labels", [
      "getDataLabelsRequest"
    ])
  },
  created() {
    this.getAllTasks();
    this.getAllTaskStages();
    this.getDataListBoardRequest();
    this.getDataMemberRequest();
    this.getDataLabelsRequest();
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
