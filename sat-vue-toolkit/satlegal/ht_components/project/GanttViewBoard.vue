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
import GanttViewContainer from "../gantt-elastic/GanttViewContainer";
import GanttName from "../cells/gantt/GanttName";
import GanttStatus from "../cells/gantt/GanttStatus";
import GanttDuration from "../cells/gantt/GanttDuration";
import StartDate from "../cells/gantt/StartDate";
import EndDate from "../cells/gantt/EndDate";
import HourTracking from "../cells/gantt/HourTracking";
import EstimateHour from "../cells/gantt/EstimateHour";
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
              label: "Status",
              name: "gantt_cell_status",
              width: 100,
              html: true
            },
            {
              id: 4,
              label: "Start date",
              name: "gantt_cell_start_date",
              width: 100,
              html: true
            },
            {
              id: 5,
              label: "End date",
              name: "gantt_cell_end_date",
              width: 100,
              html: true
            },
            {
              id: 6,
              label: "Hour tracking",
              name: "gantt_cell_hour_tracking",
              width: 100,
              html: true
            },
            {
              id: 7,
              label: "Estimate hour",
              name: "gantt_cell_estimate_hour",
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
        case "gantt_cell_status":
          return GanttStatus;
        case "gantt_cell_start_date":
          return StartDate;
        case "gantt_cell_end_date":
          return EndDate;
        case "gantt_cell_hour_tracking":
          return HourTracking;
        case "gantt_cell_estimate_hour":
          return EstimateHour;
      }
      return "div";
    }
  }
};
</script>

<style>
</style>
