<template>
  <td>
    <a href="#" @click="showDialog=true">{{ dataRow[column.name].length }} sub task(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2">
        <SubTaskDetail
          :subTaskValue="dataRow[column.name]"
          :dataSubTask="tasksJoin"
          @update="$emit('update', $event)"
        />
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapGetters } from "vuex";
import SubTaskDetail from "../../task-detail/SubTaskDetail";
export default {
  components: {
    SubTaskDetail
  },
  data() {
    return {
      showDialog: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task", ["tasks"]),
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/labels", ["dataLabels"]),
    tasksJoin() {
      const filterTask = this.tasks.filter(x => this.dataRow.id !== x.id);
      return filterTask.map(x1 => {
        const labelsJoin = this.dataLabels.filter(label =>
          x1.labels.includes(label.id)
        );
        return { ...x1, code: x1.id, name: x1.cardName, tags: labelsJoin };
      });
    }
  }
};
</script>
