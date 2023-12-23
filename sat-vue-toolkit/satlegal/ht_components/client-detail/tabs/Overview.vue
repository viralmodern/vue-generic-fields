<template>
  <v-row class="pa-3" no-gutters>
    <v-col cols="12" class="my-3">
      <GeneralInfo
        @updateGeneralInfo="updateGeneralInfo"
        :dataGeneralInfo="overview.dataGeneralInfo"
      />
    </v-col>
    <v-col cols="12" class="my-3">
      <Work @updateWork="updateWork" :dataWork="overview.dataWork" />
    </v-col>
    <v-col cols="12" class="my-3">
      <Contact
        @updateContact="updateContact"
        :dataContact="overview.dataContact"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import GeneralInfo from "../../panels/GeneralInfo";
import Work from "../../panels/Work";
import Contact from "../../panels/Contact";
export default {
  components: {
    GeneralInfo,
    Work,
    Contact
  },
  methods: {
    ...mapActions("ht_store/workspace/client/detail/overview", [
      "getDataOverViewRequest",
      "updateGeneralInfo",
      "updateWork",
      "updateContact"
    ])
  },
  computed: {
    ...mapGetters("ht_store/workspace/client/detail/overview", ["overview"])
  },
  mounted() {
    this.getDataOverViewRequest();
  }
};
</script>
