<template>
  <v-row no-gutters>
    <v-col cols="12" class="d-flex justify-space-between">
      <span class="text-h6 ml-3 mt-3">{{namePage}}</span>
      <div>
        <v-row class="px-2">
          <DiscoveryGroup />
          <ConfigurationMenu />
        </v-row>
      </div>
    </v-col>
    <AddItemEvidences class="addLog" />
    <v-col cols="12">
      <HomeDiscovery :groupType="groupType"></HomeDiscovery>
    </v-col>
    <v-navigation-drawer fixed :value="rightType==='filterDiscovery'" right clipped app>
      <FactsGridFilterRightMenu>
        <template slot="filter">
          <FilterCreator @updateFilterValue="updateFilterValue" />
          <FilterAssignee @updateFilterValue="updateFilterValue" />
          <FilterTag @updateFilterValue="updateFilterValue" />
        </template>
      </FactsGridFilterRightMenu>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import DiscoveryGroup from "./DiscoveryGroup";
import HomeDiscovery from "./HomeDiscovery";
import ConfigurationMenu from "./ConfigurationMenu";
import FactsGridFilterRightMenu from "../../right-menus/FactsGridFilterRightMenu";
import FilterCreator from "../../filter/discovery/FilterCreator";
import FilterAssignee from "../../filter/discovery/FilterAssignee";
import FilterTag from "../../filter/discovery/FilterTag";
import AddItemEvidences from "../../dialogs/AddItemEvidences";

export default {
  components: {
    DiscoveryGroup,
    HomeDiscovery,
    ConfigurationMenu,
    FactsGridFilterRightMenu,
    FilterCreator,
    FilterAssignee,
    FilterTag,
    AddItemEvidences
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    groupType() {
      return this.$route.params.groupType;
    },
    namePage() {
      var groupName = this.$route.params.groupType;
      return groupName === "testimony-grid"
        ? "Testimony"
        : groupName === "hearsay-grid"
        ? "Hearsay"
        : groupName === "evidences-grid"
        ? "Evidences"
        : "";
    }
  },
  methods: {
    ...mapMutations("ht_store/matter/discovery/filters", ["updateFilterValue"]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"])
  },
  mounted() {
    this.getDataTagsRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      type: "tag"
    });
  }
};
</script>
<style scoped>
.addLog {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
