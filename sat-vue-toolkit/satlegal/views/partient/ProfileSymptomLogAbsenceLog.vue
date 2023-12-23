<template>
  <v-row no-gutters>
    <LogHeader :date="date" @changeDate="changeDate" />
    <LogTable
      :dataSymptomLog="dataSymptomLog"
      :date="getMonth"
      @update="updateCell"
    />
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LogTable from "../../ht_components/partient/profile/symptom-log/LogTable";
import LogHeader from "../../ht_components/partient/profile/symptom-log/LogHeader";

export default {
  components: {
    LogTable,
    LogHeader
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7)
    };
  },
  computed: {
    getMonth() {
      return {
        year: +this.date.split("-")[0],
        month: +this.date.split("-")[1]
      };
    },
    ...mapGetters("ht_store/matter/partient/profile/detail/symptomLog", [
      "dataSymptomLog"
    ])
  },
  methods: {
    updateCell(data) {
      this.updateSymptomLogRequest(data);
    },
    changeDate(val) {
      this.date = val;
    },
    ...mapActions("ht_store/matter/partient/profile/detail/symptomLog", [
      "updateSymptomLogRequest"
    ])
  }
};
</script>
