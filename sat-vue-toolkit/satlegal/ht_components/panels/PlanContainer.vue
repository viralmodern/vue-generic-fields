<template>
  <v-card>
    <v-card-text>
      <SettingsPlans/>
      <v-divider class="my-3"/>
      <SubscriptionsPlans/>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import SettingsPlans from "./SettingsPlans";
import SubscriptionsPlans from "./SubscriptionsPlans";

export default {
  components: {
    SettingsPlans,
    SubscriptionsPlans
  },
  created() {
    this.getCurrentPlan();
    this.getAvailablePlans();
  },
  methods: {
    ...mapActions("ht_store/setting/plans", ["getCurrentPlan", "getAvailablePlans"])
  }
};
</script>
