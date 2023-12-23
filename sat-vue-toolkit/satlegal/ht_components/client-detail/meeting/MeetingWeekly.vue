<template>
  <ProjectMeetingWeek :dataMeetingWeekly="dataMeetingWeekly" @updatePin="updatePin"/>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProjectMeetingWeek from "../../calendar/ProjectMeeting";

export default {
  components: {
    ProjectMeetingWeek
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/detail/meeting/weekly", [
      "dataMeetingWeekly"
    ])
  },
  methods: {
    updatePin(id) {
      this.updatePinWeekly(id);
    },
    ...mapActions("ht_store/workspace/client/detail/meeting/weekly", [
      "getDataMeetingWeeklyRequest"
    ]),
    ...mapMutations("ht_store/workspace/client/detail/meeting/weekly", [
      "updatePinWeekly"
    ])
  },
  mounted() {
    this.getDataMeetingWeeklyRequest();
  }
};
</script>
