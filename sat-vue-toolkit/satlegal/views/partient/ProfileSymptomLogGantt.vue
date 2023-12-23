<template>
  <div class="py-2">
    <GanttLog :tasks="dataInSymptomLogGantt" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GanttLog from "../../ht_components/partient/profile/symptom-log/GanttLog";

export default {
  components: {
    GanttLog
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/detail/symptomLog", [
      "dataInSymptomLogGantt"
    ])
  }
};
</script>
