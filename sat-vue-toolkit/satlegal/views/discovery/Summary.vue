<template>
  <v-row no-gutters>
    <v-col cols="12" class="mt-1">
      <div class="pa-2 title">Heatmap activities discovery</div>
      <v-row no-gutters>
        <v-col cols="9">
          <v-card style="width: 100%" class="pa-3 ml-1">
            <TimeEntriesHeatmap
              v-if="dataSummary.heatmap !== undefined"
              :values="dataSummary.heatmap"
              end-date="2019-02-20"
            />
          </v-card>
        </v-col>
        <v-col xs3>
          <CountDownTime
            v-if="dataSummary.heatmap !== undefined"
            :timeDeadline="dataSummary.deadline"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="mt-2 mb-2">
      <ByzantineCheckList
        nameButton="List"
        v-if="dataSummary.checkList !== undefined"
        :list="dataSummary.checkList"
        @addGroup="addGroupChecklist"
        @checkbox="checkbox"
        @addItemInGroup="addItemInGroup"
        @removeGroup="removeGroup"
        @removeItem="removeItem"
        @updateItem="updateItem"
      />
    </v-col>

    <v-col cols="12">
      <LayoutLineChart
        v-if="dataSummary.dataLineChart !== undefined"
        :dataLineChart="dataSummary.dataLineChart"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TimeEntriesHeatmap from "../../ht_components/heatmap/TimeEntriesHeatmap";
import CountDownTime from "../../ht_components/inputs/CountDownTime";
import LayoutLineChart from "../../ht_components/chart/LayoutLineChart";
import ByzantineCheckList from "../../ht_components/cards/ByzantineCheckList";

export default {
  components: {
    CountDownTime,
    TimeEntriesHeatmap,
    LayoutLineChart,
    ByzantineCheckList
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/summary", [
      "getDataDiscoverySummary",
      "addGroupChecklist",
      "removeGroupChecklist",
      "addItemInGroupChecklist",
      "removeItemInGroupChecklist",
      "updateItemInGroupChecklist",
      "checkItem"
    ]),
    removeGroup(id) {
      this.removeGroupChecklist(id);
    },
    removeItem(data) {
      this.removeItemInGroupChecklist(data);
    },
    addItemInGroup(data) {
      this.addItemInGroupChecklist(data);
    },
    checkbox(data) {
      this.checkItem(data);
    },
    updateItem(data) {
      this.updateItemInGroupChecklist(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/summary", ["dataSummary"])
  },
  mounted() {
    this.getDataDiscoverySummary();
  }
};
</script>
