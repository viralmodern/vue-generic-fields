<template>
  <div>
    <v-tooltip bottom v-for="item in items" :key="item.id">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon :to="item.route" active-class="primary--text">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ item.tooltip }}</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          route: {
            name: "Helpdesk",
            params: {
              type: "table"
            }
          },
          icon: "view_list",
          tooltip: "Table"
        },
        {
          id: 2,
          route: {
            name: "Helpdesk",
            params: {
              type: "kanban"
            }
          },
          icon: "table_chart",
          tooltip: "Kanban"
        },
        {
          id: 3,
          route: {
            params: {
              name: "Helpdesk",
              type: "group"
            }
          },
          icon: "dashboard",
          tooltip: "Group"
        }
      ]
    };
  }
};
</script>
