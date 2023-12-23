<template>
  <v-col cols="12">
    <LineChart
      v-if="Object.keys(dataStatistics).length > 0"
      title="Question"
      :legend="legend"
      :xAxisValue="xAxisValue"
      :dataSeries="dataStatistics"
      :idChart="241"
    />
  </v-col>
</template>

<script>
import LineChart from "./LineChart";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    LineChart
  },
  computed: {
    legend() {
      return [
        "Question",
        "Question has Answer",
        "Key Testimony",
        "Followup",
        "Question Alert"
      ];
    },
    xAxisValue() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    },
    ...mapGetters("ht_store/matter/discovery/deposition/postDeposition", [
      "dataStatistics"
    ])
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/postDeposition", [
      "getDataStatistics"
    ])
  },
  mounted() {
    this.getDataStatistics();
  }
};
</script>
