<template class="flex">
  <div class="white flex">
    <v-row no-gutters flex>
      <v-col cols="4" class="_item _left">
        <v-card dense>
          <v-card-text
            dense
            class="layout justify-space-between"
            color="rgba(0,0,0,0)"
          >
            <v-toolbar-title>
              <div>
                <div class="text-h5 px-0">Project 3</div>
              </div>
              <v-chip
                small
                class="mx-0 text-caption"
                color="primary"
                text-color="white"
                >Filing Project</v-chip
              >
              <v-chip small color="green text-caption" text-color="white">
                <v-avatar>
                  <v-icon>mdi-check_circle</v-icon>
                </v-avatar>
                Active
              </v-chip>
            </v-toolbar-title>
            <div>
              <MenuSetting @onClickMenu="onClickMenu" />
            </div>
          </v-card-text>
          <v-card-text dense class="pt-0">
            <v-divider></v-divider>
            <div class="v-subheader px-0">Creator:</div>
            <v-chip>
              <v-avatar>
                <img
                  src="https://randomuser.me/api/portraits/men/35.jpg"
                  alt="trevor"
                />
              </v-avatar>
              Trevor Hansen
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
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                Dropdown
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in [1, 2, 3]" :key="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
    <ManageMember ref="ManageMember" />
  </div>
</template>

<script>
import WorkFlowList from "./WorkFlowList";
import MenuSetting from "./MenuSetting";
import ManageMember from "./ManageMember";
import { LINKS } from "./constant";
export default {
  name: "ProjectOverView",
  components: { WorkFlowList, ManageMember, MenuSetting },
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
  mounted() {},
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },

  methods: {
    onClickMenu(type) {
      switch (type) {
        case LINKS.WORKFLOW:
          this.$router.push({
            path: "/project/" + this.$route.params.matter || this.$route.params.projectId + "/manage"
          });
          break;
        case LINKS.MANAGE:
          this.$refs.ManageMember.toggleModal();
          break;
        default:
          break;
      }
    }
  }
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
