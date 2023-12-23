<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-app-bar>
        <DigitalHoweyListBoard />
        <v-spacer />
        <DigitalHoweyFilter />
        <v-btn
          icon
          :to="{
            name: 'DigitalHoweyChecklist',
            params: { id: $route.params.id, type: 'kanban' }
          }"
          active-class="primary--text"
        >
          <v-icon>mdi-view_quilt</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{
            name: 'DigitalHoweyChecklist',
            params: { id: $route.params.id, type: 'table' }
          }"
          active-class="primary--text"
        >
          <v-icon>mdi-view_list</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{
            name: 'DigitalHoweyChecklist',
            params: { id: $route.params.id, type: 'tree' }
          }"
          active-class="primary--text"
        >
          <v-icon>mdi-table_chart</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{
            name: 'DigitalHoweyChecklist',
            params: { id: $route.params.id, type: 'gantt' }
          }"
          active-class="primary--text"
        >
          <v-icon>mdi-show_chart</v-icon>
        </v-btn>
      </v-app-bar>
    </v-col>
  </v-row>
</template>
<script>
import DigitalHoweyFilter from "./DigitalHoweyFilter";
import DigitalHoweyListBoard from "./DigitalHoweyListBoard";
export default {
  components: {
    DigitalHoweyFilter,
    DigitalHoweyListBoard
  }
};
</script>
