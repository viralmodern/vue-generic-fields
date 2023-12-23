<template>
  <v-scroll-y-transition mode="out-in">
    <v-container class="mt-0 pa-0 fill-height">
      <v-row no-gutters class="fill-height">
        <v-col cols="12" sm="3" class="layout column fill-height _item">
          <v-subheader>Manage</v-subheader>
          <v-card class="flex">
            <v-list color="primary">
              <template v-for="(item, index) in items">
                <v-list-item
                  :key="item.title"
                  :color="item.active ? 'primary' : 'default'"
                >
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  :key="index"
                  v-if="index !== items.length - 1"
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12" sm="9" class="layout column fill-height _item">
          <v-subheader>Manage workflow</v-subheader>
          <v-card class="flex">
            <WorkflowDetail />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-scroll-y-transition>
</template>

<script>
import WorkflowDetail from "./components/WorkflowDetail";

export default {
  name: "ManageProject",
  components: { WorkflowDetail },
  metaInfo: {
    title: "Workflow"
  },
  data() {
    return {
      items: [
        {
          title: "Workflow",
          icon: "playlist_add_check",
          active: true
        },
        {
          title: "Task label",
          icon: "label"
        },
        {
          title: "People",
          icon: "verified_user"
        }
      ]
    };
  }
};
</script>

<style scoped>
._item {
  border: solid 5px #fafafa;
}
</style>
