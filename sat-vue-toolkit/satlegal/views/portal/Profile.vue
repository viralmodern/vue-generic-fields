<template>
  <v-row class="pa-3" no-gutters>
    <v-col cols="12" class="mb-3">
      <GeneralInfo
        @updateGeneralInfo="updateGeneralInfo"
        :dataGeneralInfo="overview.dataGeneralInfo"
      />
    </v-col>
    <v-col cols="12" class="mb-3">
      <Work @updateWork="updateWork" :dataWork="overview.dataWork" />
    </v-col>
    <v-col cols="12" class="mb-3">
      <Contact
        @updateContact="updateContact"
        :dataContact="overview.dataContact"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import GeneralInfo from "../../ht_components/panels/GeneralInfo";
import Work from "../../ht_components/panels/Work";
import Contact from "../../ht_components/panels/Contact";
export default {
  components: {
    GeneralInfo,
    Work,
    Contact
  },
  methods: {
    ...mapActions("ht_store/clientPortal/profile", [
      "getDataOverViewRequest",
      "updateGeneralInfo",
      "updateWork",
      "updateContact"
    ])
  },
  computed: {
    ...mapGetters("ht_store/clientPortal/profile", ["overview"])
  },
  mounted() {
    this.getDataOverViewRequest();
  }
};
</script>
