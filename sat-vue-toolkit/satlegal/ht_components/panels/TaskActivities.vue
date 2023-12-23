<template>
  <v-row no-gutters>
    <v-col>
      <h1>Activities</h1>
      <TaskUserActivities :items="dataActivities"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TaskUserActivities from "../task-detail/TaskUserActivities";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    TaskUserActivities
  },
  methods: {
    ...mapActions("ht_store/task/detail/activities", ["getDataActivitiesRequest"])
  },
  computed: {
    ...mapGetters("ht_store/task/detail/activities", ["dataActivities"])
  },
  mounted() {
    this.getDataActivitiesRequest();
  }
};
</script>

