<template>
  <GanttViewContainer :tasks="tasks" :options="options">
    <template slot="cellTemplate" slot-scope="{task, column}">
      <component
        :is="getDisplayComponent(column.name)"
        :column="column"
        :dataRow="task"
        :idAdd="idAdd"
        @add="$emit('addTask', $event)"
        @openAdd="idAdd = task.id"
        @closeAdd="idAdd = ''"
      />
    </template>
  </GanttViewContainer>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import GanttViewContainer from "../../../gantt-elastic/GanttViewContainer";
import GanttName from "./cells/GanttName";
import GanttDuration from "../../../cells/gantt/GanttDuration";
import GanttStartDate from "./cells/GanttStartDate";
import GanttEndDate from "./cells/GanttEndDate";
Vue.use(Vuex);
const store = new Vuex.Store({});
export default {
  components: {
    GanttViewContainer
  },
  store,
  props: {
    tasks: Array
  },
  data() {
    return {
      idAdd: "",
      options: {
        calendar: {
          hour: {
            display: false
          }
        },
        taskList: {
          columns: [
            {
              id: 1,
              label: "Name",
              name: "gantt_cell_name",
              width: 300,
              expander: true,
              html: true
            },
            {
              id: 2,
              label: "Duration",
              name: "gantt_cell_duration",
              width: 100,
              html: true
            },
            {
              id: 3,
              label: "Start",
              name: "gantt_cell_start_date",
              width: 100,
              html: true
            },
            {
              id: 4,
              label: "Finish",
              name: "gantt_cell_end_date",
              width: 100,
              html: true
            }
          ]
        }
      }
    };
  },
  methods: {
    getDisplayComponent(columnName) {
      switch (columnName) {
        case "gantt_cell_name":
          return GanttName;
        case "gantt_cell_duration":
          return GanttDuration;
        case "gantt_cell_start_date":
          return GanttStartDate;
        case "gantt_cell_end_date":
          return GanttEndDate;
      }
      return "div";
    }
  }
};
</script>

<style>
</style>
