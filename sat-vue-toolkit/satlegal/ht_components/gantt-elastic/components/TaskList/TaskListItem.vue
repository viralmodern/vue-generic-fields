<!--
/**
 * @fileoverview TaskListItem component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */
-->
<template>
  <div class="gantt-elastic__task-list-item" :style="root.style('task-list-item')">
    <item-column
      v-for="column in $store.state.GanttElastic.options.taskList.columns"
      :key="column._id"
      :column="column"
      :task="task"
    >
      <task-list-expander
        v-if="column.expander"
        :tasks="[task]"
        :style="expanderStyle"
        :options="$store.state.GanttElastic.options.taskList.expander"
      ></task-list-expander>
      <template slot="cellTemplate" slot-scope="{task, column}">
        <slot name="cellTemplate" :task="task" :column="column"></slot>
      </template>
    </item-column>
  </div>
</template>
<script>
import TaskListExpander from '../Expander.vue';
import ItemColumn from './ItemColumn.vue';

export default {
  name: 'TaskListItem',
  components: {
    TaskListExpander,
    ItemColumn
  },
  inject: ['root'],
  props: ['task', 'expanderStyle'],
  data() {
    return {};
  }
};
</script>
