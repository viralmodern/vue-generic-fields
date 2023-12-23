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
        <TaskDetailGeneral v-show="showOrHide('info')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskMileStone />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskLabels v-show="showOrHide('labels')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskMembers v-show="showOrHide('members')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskAttachments v-show="showOrHide('attachment')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskChecklists v-show="showOrHide('checklist')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskNotes v-show="showOrHide('notes')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskComments v-show="showOrHide('comments')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskCitations v-show="showOrHide('citation')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskLocations v-show="showOrHide('location')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskPeople v-show="showOrHide('people')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskFavorable v-show="showOrHide('favorable')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskVulnerability v-show="showOrHide('vulnerability')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskTreatment v-show="showOrHide('treatment')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskWorkLogs v-show="showOrHide('worklog')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskSubTasks v-show="showOrHide('subtasks')" />
      </v-slide-x-transition>
      <v-slide-x-transition>
        <TaskActivities v-show="showOrHide('activities')" />
      </v-slide-x-transition>
    </v-card-text>
  </v-card>
</template>
<script>
import TaskDetailGeneral from "../panels/TaskDetailGeneral";
import TaskMileStone from "../panels/TaskMileStone";
import TaskLabels from "../panels/TaskLabels";
import TaskMembers from "../panels/TaskMembers";
import TaskAttachments from "../panels/TaskAttachments";
import TaskChecklists from "../panels/TaskChecklists";
import TaskCitations from "../panels/TaskCitations";
import TaskLocations from "../panels/TaskLocations";
import TaskPeople from "../panels/TaskPeople";
import TaskWorkLogs from "../panels/TaskWorkLogs";
import TaskSubTasks from "../panels/TaskSubTasks";
import TaskTreatment from "../panels/TaskTreatment";
import TaskVulnerability from "../panels/TaskVulnerability";
import TaskFavorable from "../panels/TaskFavorable";
import TaskNotes from "../panels/TaskNotes";
import TaskComments from "../panels/TaskComments";
import TaskActivities from "../panels/TaskActivities";
export default {
  components: {
    TaskDetailGeneral,
    TaskMileStone,
    TaskLabels,
    TaskMembers,
    TaskAttachments,
    TaskChecklists,
    TaskCitations,
    TaskLocations,
    TaskPeople,
    TaskTreatment,
    TaskVulnerability,
    TaskWorkLogs,
    TaskSubTasks,
    TaskFavorable,
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
          name: "citation",
          icon: "format_quote",
          title: "Citation",
          isActive: false,
          isFixed: false
        },
        {
          name: "location",
          icon: "location_on",
          title: "Location",
          isActive: false,
          isFixed: false
        },
        {
          name: "people",
          icon: "supervisor_account",
          title: "People",
          isActive: false,
          isFixed: false
        },
        {
          name: "favorable",
          icon: "thumb_up",
          title: "Favorable",
          isActive: false,
          isFixed: false
        },
        {
          name: "risk",
          icon: "bug_report",
          title: "Risk",
          isActive: false,
          isFixed: false
        },
        {
          name: "vulnerability",
          icon: "warning",
          title: "Vulnerability",
          isActive: false,
          isFixed: false
        },
        {
          name: "treatment",
          icon: "build",
          title: "Treatment",
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
  methods: {
    toggleTab(tab) {
      if (!tab.isFixed) tab.isActive = !tab.isActive;
    },
    showOrHide(itemName) {
      return this.tabs.some(x => x.name === itemName && x.isActive);
    }
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
