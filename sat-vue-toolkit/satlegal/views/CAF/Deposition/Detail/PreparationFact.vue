<template>
  <FactChronology v-if="isShowFactChronology" />
</template>

<script>
import { mapGetters } from "vuex";
import FactChronology from "./FactChronology";
import appConfigMixin from "@/sat-vue-toolkit/satlegal/ht_mixins/appConfigMixin";

export default {
  mixins: [appConfigMixin],
  components: {
    FactChronology
  },
  computed: {
    isShowFactChronology() {
      const checkObject = (object = {}) => Object.keys(object).length;
      if (checkObject(this.appConfigListContentType)) {
        return checkObject(this.dataDepositionDetail);
      }
      return false;
    },
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ])
  }
};
</script>
