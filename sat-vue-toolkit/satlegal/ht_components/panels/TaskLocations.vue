<template>
  <v-row  no-gutters>
    <v-col class="mt-2">
      <span class="title">Location</span>
    </v-col>
    <TaskLocation :taskDetail="taskDetail" :items="dataLocation"/>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TaskLocation from "../chips/TaskLocation";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    TaskLocation
  },
  methods: {
    ...mapActions("ht_store/task/detail/location", ["getDataLocationRequest"]),
    ...mapActions("ht_store/task/detail/description", ["getDataTaskDetailRequest"])
  },
  computed: {
    ...mapGetters("ht_store/task/detail/location", ["dataLocation"]),
    ...mapGetters("ht_store/task/detail/description", ["taskDetail"])
  },
  mounted() {
    this.getDataLocationRequest();
    this.getDataTaskDetailRequest();
  }
};
</script>

