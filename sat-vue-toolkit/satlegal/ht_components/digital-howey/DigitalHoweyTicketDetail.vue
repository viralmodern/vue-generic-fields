<template>
  <v-card class="overflow-card">
    <v-app-bar dark color="primary">
      <v-btn
        v-for="(tab, index) in tabs"
        :key="index"
        icon
        :class="`ma-0 ${tab.isActive ? '' : 'half-opacity'}`"
        @click="toggleTab(tab)"
        :title="tab.title"
      >
        <v-icon>{{ tab.icon }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card-text style="overflow-y: auto">
      <v-slide-x-transition>
        <TaskDetailGeneral
          :stages="stages"
          :dataTaskDetail="dataTaskDetail"
          @update="updateTaskDetailRequest($event)"
          v-show="showOrHide('info')"
        />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskMileStone
          :startDate="dataTaskDetail.startDate"
          :endDate="dataTaskDetail.duaDate"
          @update="updateTaskDetailRequest($event)"
        />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskLabels
          class="my-2"
          :labels="dataTaskDetail.labels"
          @update="updateTaskDetailRequest({ labels: $event })"
          v-show="showOrHide('labels')"
        />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskMembers
          class="my-2"
          :dataMembers="dataTaskDetail.members"
          @update="updateTaskDetailRequest({ members: $event })"
          v-show="showOrHide('members')"
        />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskAttachments class="my-2" v-show="showOrHide('attachment')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskChecklists
          :checklist="dataTaskDetail.checkList"
          @update="updateTaskDetailRequest({ checkList: $event })"
          v-show="showOrHide('checklist')"
        />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskNotes v-show="showOrHide('notes')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskComments v-show="showOrHide('comments')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskWorkLogs v-show="showOrHide('worklog')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskSubTasks
          :id="dataTaskDetail.id"
          :subtasks="dataTaskDetail.subTasks"
          @update="updateTaskDetailRequest({ subTasks: $event })"
          v-show="showOrHide('subtasks')"
        />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskActivities v-show="showOrHide('activities')" />
      </v-slide-x-transition>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import TaskDetailGeneral from "./panels/TaskDetailGeneral";
import TaskMileStone from "./panels/TaskMileStone";
import TaskLabels from "./panels/TaskLabels";
import TaskMembers from "./panels/TaskMembers";
import TaskAttachments from "./panels/TaskAttachments";
import TaskChecklists from "./panels/TaskChecklists";
import TaskWorkLogs from "./panels/TaskWorkLogs";
import TaskSubTasks from "./panels/TaskSubTasks";
import TaskNotes from "./panels/TaskNotes";
import TaskComments from "./panels/TaskComments";
import TaskActivities from "./panels/TaskActivities";
export default {
  components: {
    TaskDetailGeneral,
    TaskMileStone,
    TaskLabels,
    TaskMembers,
    TaskAttachments,
    TaskChecklists,
    TaskWorkLogs,
    TaskSubTasks,
    TaskNotes,
    TaskComments,
    TaskActivities
  },
  data() {
    return {
      tabs: [
        {
          name: "info",
          icon: "today",
          title: "General information",
          isActive: true,
          isFixed: true
        },
        {
          name: "labels",
          icon: "tag",
          title: "Labels",
          isActive: true,
          isFixed: true
        },
        {
          name: "members",
          icon: "perm_identity",
          title: "Members",
          isActive: true,
          isFixed: true
        },
        {
          name: "attachment",
          icon: "attachment",
          title: "Attachments",
          isActive: true,
          isFixed: true
        },
        {
          name: "checklist",
          icon: "playlist_add_check",
          title: "Checklists",
          isActive: true,
          isFixed: true
        },
        {
          name: "watch",
          icon: "visibility_off",
          title: "Follow",
          isActive: true,
          isFixed: true
        },
        {
          name: "notes",
          icon: "note",
          title: "Notes",
          isActive: false,
          isFixed: false
        },
        {
          name: "comments",
          icon: "comment",
          title: "Comments",
          isActive: false,
          isFixed: false
        },
        {
          name: "worklog",
          icon: "access_time",
          title: "Work logs",
          isActive: false,
          isFixed: false
        },
        {
          name: "subtasks",
          icon: "link",
          title: "Sub tasks",
          isActive: false,
          isFixed: false
        },
        {
          name: "activities",
          icon: "history",
          title: "Activities",
          isActive: false,
          isFixed: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/detail", [
      "dataTaskDetail"
    ]),
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task", ["stages"])
  },
  methods: {
    toggleTab(tab) {
      if (!tab.isFixed) tab.isActive = !tab.isActive;
    },
    showOrHide(itemName) {
      return this.tabs.some(x => x.name === itemName && x.isActive);
    },
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/detail", [
      "updateTaskDetailRequest"
    ])
  },
  props: {
    isShow: Boolean
  }
};
</script>

<style scoped>
.half-opacity {
  opacity: 0.5;
}
.overflow-card {
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}
</style>
