<template>
  <td>
    <a href="#" @click="showDialog=true">{{ dataRow.subTasks.length }} sub task(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card class="pa-2">
        <SubTaskDetail
          @addSubTask="addSubTask"
          @deleteSubTask="deleteSubTask"
          :dataSubTask="dataRow.subTasks"
        />
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions } from "vuex";
import SubTaskDetail from "../task-detail/SubTaskDetail";
export default {
  data() {
    return {
      treatment: "",
      showDialog: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  components: {
    SubTaskDetail
  },
  methods: {
    ...mapActions("ht_store/task/list", ["updateTask"]),
    ...mapActions("ht_store/task/list/subtask", [
      "addSubTaskRequest",
      "removeSubTaskRequest"
    ]),
    async deleteSubTask(id) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "removeSubTask",
          id: id
        }
      };
      const result = await this.removeSubTaskRequest(data);
      if (result) {
        this.updateTask(data);
      }
    },
    async addSubTask(val) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          handleName: "createSubTask",
          id: Math.random(),
          name: val.name
        }
      };
      const result = await this.addSubTaskRequest(data);
      if (result) {
        this.updateTask(data);
      }
    }
  }
};
</script>
