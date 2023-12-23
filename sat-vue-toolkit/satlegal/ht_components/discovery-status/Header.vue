<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-app-bar>
        <v-spacer />
        <v-tooltip bottom v-for="item in items" :key="item.id">
          <template v-slot:activator="{ on }">
            <v-btn icon :to="item.to" active-class="primary--text" v-on="on">
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.name }}</span>
        </v-tooltip>
      </v-app-bar>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Request Set",
          icon: "view_quilt",
          to: {
            name: "discoveryStatus",
            params: { type: "request-set" }
          }
        },
        {
          id: 2,
          name: "Request Item",
          icon: "view_list",
          to: {
            name: "discoveryStatus",
            params: { type: "status-slickgrid" }
          }
        },
        {
          id: 3,
          name: "Request Task",
          icon: "widgets",
          to: {
            name: "discoveryStatus",
            params: { type: "request-task" }
          }
        },
        {
          id: 4,
          name: "Request Task Kanban",
          icon: "view_headline",
          to: {
            name: "discoveryStatus",
            params: { type: "request-task-kanban" }
          }
        },
        {
          id: 5,
          name: "Request Status",
          icon: "view_stream",
          to: {
            name: "discoveryStatus",
            params: { type: "request-status" }
          }
        },
        {
          id: 6,
          name: "Response Status",
          icon: "view_compact",
          to: {
            name: "discoveryStatus",
            params: { type: "response-status" }
          }
        },
        {
          id: 7,
          name: "Priority",
          icon: "view_column",
          to: {
            name: "discoveryStatus",
            params: { type: "priority" }
          }
        }
      ]
    };
  }
};
</script>
