<template>
  <v-row no-gutters>
    <v-col>
      <SubTaskDetail
        :subTaskValue="subtasks"
        :dataSubTask="tasksJoin"
        @update="$emit('update', $event)"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import SubTaskDetail from "../../task-detail/SubTaskDetail";

export default {
  components: {
    SubTaskDetail
  },
  props: {
    id: [String, Number],
    subtasks: Array
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task", ["tasks"]),
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/labels", ["dataLabels"]),
    tasksJoin() {
      const filterTask = this.tasks.filter(x => this.id !== x.id);
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

