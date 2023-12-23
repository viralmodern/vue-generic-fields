<template>
  <div style="position: relative">
    <div class="plans-title title">Subscription plans</div>
    <v-tabs right>
      <v-tab>Month</v-tab>
      <v-tab>Year</v-tab>
      <v-tab-item>
        <v-row no-gutters>
          <v-col
            xs-4
            v-for="(item,index) in availablePlansForMonth"
            :key="index"
            :class="{'pl-2':!!index}"
          >
            <PlanPricing
              :packageName="item.packageName"
              :price="item.price"
              :unit="item.unit"
              :features="item.features"
              :active="!!item.active"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row no-gutters>
          <v-col
            xs-4
            v-for="(item,index) in availablePlansForYear"
            :key="index"
            :class="{'pl-2':!!index}"
          >
            <PlanPricing
              :packageName="item.packageName"
              :price="item.price"
              :unit="item.unit"
              :features="item.features"
              :active="!!item.active"
            />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlanPricing from "../cards/PlanPricing";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    PlanPricing
  },
  computed: {
    ...mapGetters("ht_store/setting/plans", [
      "availablePlansForYear",
      "availablePlansForMonth"
    ])
  }
};
</script>

<style scoped>
.plans-title {
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 1;
}
</style>

