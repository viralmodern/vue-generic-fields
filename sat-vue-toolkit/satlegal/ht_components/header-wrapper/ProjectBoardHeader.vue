<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-app-bar>
        <ProjectListBoard />
        <v-spacer />
        <ProjectBoardFilter />
        <v-btn
          icon
          :to="{
            name: 'ProjectTaskBoard',
            params: { id: $route.params.id, type: 'kanban' }
          }"
          active-class="primary--text"
        >
          <v-icon>mdi-view_quilt</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{
            name: 'ProjectTaskBoard',
            params: { id: $route.params.id, type: 'table' }
          }"
          active-class="primary--text"
        >
          <v-icon>mdi-view_list</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{
            name: 'ProjectTaskBoard',
            params: { id: $route.params.id, type: 'tree' }
          }"
          active-class="primary--text"
        >
          <v-icon>mdi-table_chart</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{
            name: 'ProjectTaskBoard',
            params: { id: $route.params.id, type: 'gantt' }
          }"
          active-class="primary--text"
        >
          <v-icon>mdi-show_chart</v-icon>
        </v-btn>
        <v-btn
          :to="{
            name: 'ProjectTaskBoard',
            params: { id: $route.params.id, type: 'raci' }
          }"
          :outlined="$route.params.type !== 'raci'"
          color="primary"
          >RACI</v-btn
        >
      </v-app-bar>
    </v-col>
  </v-row>
</template>
<script>
import ProjectBoardFilter from "../filter/ProjectBoardFilter";
import ProjectListBoard from "../filter/ProjectListBoard";
export default {
  components: {
    ProjectBoardFilter,
    ProjectListBoard
  }
};
</script>
