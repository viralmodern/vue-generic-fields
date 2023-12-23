<template>
  <ProjectMeetingWeek :dataMeetingWeekly="dataMeetingWeekly" @updatePin="updatePin"/>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProjectMeetingWeek from "../calendar/ProjectMeeting";

export default {
  components: {
    ProjectMeetingWeek
  },
  computed: {
    ...mapGetters("ht_store/matter/briefcase/meeting/weekly", [
      "dataMeetingWeekly"
    ])
  },
  methods: {
    updatePin(id) {
      this.updatePinWeekly(id);
    },
    ...mapActions("ht_store/matter/briefcase/meeting/weekly", [
      "getDataMeetingWeeklyRequest"
    ]),
    ...mapMutations("ht_store/matter/briefcase/meeting/weekly", [
      "updatePinWeekly"
    ])
  },
  mounted() {
    this.getDataMeetingWeeklyRequest();
  }
};
</script>
