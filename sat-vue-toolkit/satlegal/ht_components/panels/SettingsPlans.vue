<template>
  <div>
    <div class="title mb-3">Your current plans</div>
    <v-row no-gutters>
      <v-col cols="6">
        <CardSettingPlan v-if="!!settingPlan" :item="settingPlan"/>
      </v-col>
      <v-col cols="6" class="ml-4">
        <CardSettingTotal v-if="!!settingTotal" :item="settingTotal"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardSettingPlan from "../cards/CardSettingPlan";
import CardSettingTotal from "../cards/CardSettingTotal";

export default {
  components: {
    CardSettingPlan,
    CardSettingTotal
  },
  computed: {
    ...mapGetters("ht_store/setting/plans", ["settingPlan", "settingTotal"])
  }
};
</script>
