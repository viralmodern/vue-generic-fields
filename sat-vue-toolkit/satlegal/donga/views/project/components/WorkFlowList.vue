<template>
  <v-card max-width="400">
    <div class="subheading">{{ getWorkFlowName }}</div>
    <!--<div class="text-caption font-weight-light"> Last update&nbsp;<i>19 Feb 2015</i></div>-->
    <v-card-text class="pa-0">
      <v-timeline align-top dense class="pt-0 mt-3">
        <v-timeline-item
          v-for="(item, idx) in stagesWorkFlow"
          :key="item.stage_name"
          :color="'#' + item.color"
          small
          class="pa-0 pb-3 brb-1"
        >
          <v-row no-gutters pt-3>
            <v-col>
              {{ item.stage_name }}
              <v-chip
                v-if="getStageDefault(idx)"
                class="white--text"
                color="#999"
                label
                small
              >
                Default
              </v-chip>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  name: "WorkFlowList",
  data: () => ({}),
  computed: {
    ...mapGetters("ht_store/projectDetail", ["stagesWorkFlow", "workflowProject"]),
    getWorkFlowName() {
      try {
        return this.workflowProject.name;
      } catch (e) {
        return "";
      }
    }
  },
  methods: {
    getStageDefault(idx) {
      let _itemDf = this.stagesWorkFlow[idx];
      let orderMax = this.$underscore.maxBy(
        this.stagesWorkFlow,
        item => item.order
      );
      let orderMin = this.$underscore.minBy(
        this.stagesWorkFlow,
        item => item.order
      );
      // let orderZero = _itemDf.order === 0;
      // return orderZero || orderMax.order === _itemDf.order || orderMin.order === _itemDf.order;
      return (
        orderMax.order === _itemDf.order || orderMin.order === _itemDf.order
      );
    }
  }
};
</script>

<style scoped>
.theme--light.v-timeline:before {
  width: 1px;
}
</style>
<style>
.brb-1 {
  border-bottom: solid 1px rgba(0, 0, 0, 0.12) !important;
}

.brb-1:last-child {
  border-bottom: solid 1px rgba(0, 0, 0, 0) !important;
}
</style>
