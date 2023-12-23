<template>
  <td>
    <v-dialog v-model="showDialog" width="800" style="width: 200px">
      <template v-slot:activator="{ on }">
        <span v-on="on">
          Last updated by
          <a href="#">{{name}}</a>
        </span>
      </template>
      <TaskUserActivities :items="dataRow.activities"/>
    </v-dialog>
  </td>
</template>
<script>
import TaskUserActivities from "../task-detail/TaskUserActivities";

export default {
  components: {
    TaskUserActivities
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      showDialog: false
    };
  },
  computed: {
    name() {
      return this.dataRow.activities[0]
        ? this.dataRow.activities[0].executor.name
        : "";
    }
  }
};
</script>
