<template>
  <gantt-elastic :tasks="tasks" :options="options">
    <template slot="cellTemplate" slot-scope="{task, column}">
      <slot name="cellTemplate" :task="task" :column="column"/>
    </template>
  </gantt-elastic>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import GanttElastic from "./GanttElastic";
Vue.use(Vuex);
const store = new Vuex.Store({});
export default {
  components: {
    GanttElastic
  },
  store,
  props: {
    tasks: Array,
    options: Object
  }
};
</script>

<style>
</style>
