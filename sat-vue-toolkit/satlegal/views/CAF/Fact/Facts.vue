<template>
  <v-row no-gutters>
    <v-col cols="12">
      <FactsTypes @updatePagination="updatePagination" />
    </v-col>
    <router-view></router-view>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import FactsTypes from "./FactsTypes";
export default {
  layout: 'app',
  components: {
    FactsTypes
  },
  mounted() {
    this.redirectRoute();
    this.updatePagination({ page: 1 });
    // this.getDataCharacterRequest();
    this.getDataLocationRequest();
    this.getFavorableRequest();
  },
  methods: {
    updatePagination() {
      // this.getDataFactsResearchRequest({
      //   matterId: this.$route.params.matter || this.$route.params.projectId,
      //   page
      // });
    },
    redirectRoute() {
      if (!this.$route.params.listType || !this.$route.params.groupType) {
        const listType = this.$route.params.listType || "summary";
        const groupType = this.$route.params.groupType || "all-facts";
        this.$router.push({
          name: "facts",
          params: {
            ...this.$route.params,
            listType,
            groupType
          }
        });
      }
    },
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    // ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
  ...mapActions("ht_store/matter/location", ["getDataLocationRequest"]),
    ...mapActions("ht_store/workspace/favorable", ["getFavorableRequest"])
  },
  watch: {
    $route() {
      this.redirectRoute();
    }
  }
};
</script>
