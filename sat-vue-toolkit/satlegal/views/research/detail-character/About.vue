<template>
  <v-row class="pa-3" no-gutters>
    <v-col cols="12" class="mb-3">
      <GeneralInfo
        @updateGeneralInfo="updateGeneralInfo"
        :dataGeneralInfo="abouts.dataGeneralInfo"
      />
    </v-col>
    <v-col cols="12" class="mb-3">
      <Work @updateWork="updateWork" :dataWork="abouts.dataWork" />
    </v-col>
    <v-col cols="12" class="mb-3">
      <Contact
        @updateContact="updateContact"
        :dataContact="abouts.dataContact"
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import GeneralInfo from "../../../ht_components/panels/GeneralInfo";
import Work from "../../../ht_components/panels/Work";
import Contact from "../../../ht_components/panels/Contact";
import {$$STORE_PREFIX} from "@/sat-vue-toolkit/satlegal/utils";
export default {
  components: {
    GeneralInfo,
    Work,
    Contact
  },
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile/about", ["abouts"])
  },
  methods: {
    ...mapMutations("ht_store/matter/character/characterProfile/about", [
      "updateGeneralInfo",
      "updateContact",
      "updateWork"
    ])
  }
};
</script>
