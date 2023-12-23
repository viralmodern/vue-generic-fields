<template>
  <div class="flex">
    <v-row no-gutters>
      <v-col cols="4" class="_item _left">
        <v-card dense>
          <v-card-text
            dense
            class="layout justify-space-between"
            color="rgba(0,0,0,0)"
          >
            <v-toolbar-title>
              <InfoThumbnailProject />
            </v-toolbar-title>
          </v-card-text>
          <v-card-text dense class="pt-0">
            <v-divider></v-divider>
            <div class="v-subheader px-0">Creator:</div>
            <v-chip>
              <v-avatar>
                <img
                  src="https://randomuser.me/api/portraits/men/35.jpg"
                  alt="trevor"
                /> </v-avatar
              >Trevor Hansen
            </v-chip>
          </v-card-text>
          <v-card-text dense class="pt-0">
            <v-divider></v-divider>
            <div class="v-subheader px-0 py-0">Assignees:</div>
            <v-chip v-for="(item, index) in people" :key="'member-' + index">
              <v-avatar>
                <img :src="item.avatar" />
              </v-avatar>
              {{ item.name }}
            </v-chip>
          </v-card-text>
          <v-card-text dense class="pt-0">
            <v-divider></v-divider>
            <div class="v-subheader px-0">Workflow:</div>
            <WorkFlowList />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8" class="_item _right">
        <div v-if="workflowOverview">
          <v-subheader>Manage workflow</v-subheader>
          <v-card class="flex">
            <WorkflowDetail />
          </v-card>
        </div>
        <div v-else>
          <v-subheader>Activities</v-subheader>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WorkFlowList from "./components/WorkFlowList";
import WorkflowDetail from "./components/WorkflowDetail";
import InfoThumbnailProject from "./components/InfoThumbnailProject";

export default {
  name: "ProjectOverView",
  components: { InfoThumbnailProject, WorkflowDetail, WorkFlowList },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    };

    return {
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      people: [
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] }
      ],
      title: "The summer breeze"
    };
  },
  created() {},
  mounted() {},
  computed: {
    workflowOverview() {
      return this.$route.hash === "#workflow";
    }
  },
  methods: {}
};
</script>

<style scoped>
._item {
  border-top: solid 10px #fafafa;
  border-bottom: solid 10px #fafafa;
}

._item._left {
  border-right: solid 5px #fafafa;
}

._item._right {
  border-left: solid 5px #fafafa;
}
</style>
