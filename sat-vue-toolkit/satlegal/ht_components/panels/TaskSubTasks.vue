<template>
  <v-row no-gutters>
    <v-col>
      <SubTaskDetail @addSubTask="addSubTask" @deleteSubTask="deleteSubTask" :dataSubTask="dataSubTask"/>
    </v-col>
  </v-row>
</template>

<script>
import SubTaskDetail from "../task-detail/SubTaskDetail";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    SubTaskDetail
  },
  methods: {
    ...mapActions("ht_store/task/detail/subtask", ["getDataSubTaskRequest"]),
    ...mapMutations("ht_store/task/detail/subtask", ["deleteItemSubTask", "addItemSubTask"]),
    deleteSubTask(id) {
      this.deleteItemSubTask(id);
    },
    addSubTask(data){
      this.addItemSubTask(data)
    }
  },
  computed: {
    ...mapGetters("ht_store/task/detail/subtask", ["dataSubTask"])
  },
  mounted() {
    this.getDataSubTaskRequest();
  }
};
</script>

