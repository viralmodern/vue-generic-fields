<template>
  <v-row no-gutters>
    <v-col class="mt-2">
      <span class="title">Work log</span>
      <Worklog
        v-for="item in dataWorkLog"
        :key="item.id"
        :user="item.user"
        :createdDate="item.createdDate"
        :comment="item.comment"
        :timeSpent="item.timeSpent"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Worklog from "../../cards/Worklog";
export default {
  components: {
    Worklog
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/worklog", ["getDataWorkLogRequest"])
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/worklog", ["dataWorkLog"])
  },
  mounted() {
    this.getDataWorkLogRequest();
  }
};
</script>

