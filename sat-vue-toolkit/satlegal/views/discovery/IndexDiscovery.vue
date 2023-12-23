<template>
  <v-row no-gutters>
    <v-col cols="12" class="d-flex justify-end text-xs-right my-2">
      <FilterIndexEvidences />
      <ConfigurationTableIndex />
    </v-col>
    <v-col cols="12">
      <TableIndexDiscovery :dataIndex="dataIndexDiscovery" />
      <AddIndexDiscovery class="btn-add" />
      <v-navigation-drawer fixed :value="rightType === 'filterIndex'" right clipped app>
        <FactsGridFilterRightMenu>
          <template slot="filter">
            <FilterCreator @updateFilterValue="updateFilterValue" />
            <FilterAssignee @updateFilterValue="updateFilterValue" />
            <FilterTag @updateFilterValue="updateFilterValue" />
          </template>
        </FactsGridFilterRightMenu>
      </v-navigation-drawer>
    </v-col>
    <router-view></router-view>
  </v-row>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import FactsGridFilterRightMenu from "../../ht_components/right-menus/FactsGridFilterRightMenu";
import TableIndexDiscovery from "../../ht_components/tables/TableIndexDiscovery";
import AddIndexDiscovery from "../../ht_components/dialogs/AddIndexDiscovery";
import FilterIndexEvidences from "../../ht_components/filter/FilterIndexEvidences";
import FilterCreator from "../../ht_components/filter/discovery/FilterCreator";
import FilterAssignee from "../../ht_components/filter/discovery/FilterAssignee";
import FilterTag from "../../ht_components/filter/discovery/FilterTag";
import ConfigurationTableIndex from "../../ht_components/menus/ConfigurationTableIndex";

export default {
  components: {
    TableIndexDiscovery,
    FilterIndexEvidences,
    AddIndexDiscovery,
    FactsGridFilterRightMenu,
    FilterCreator,
    FilterAssignee,
    FilterTag,
    ConfigurationTableIndex
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/index", ["getDataIndexDiscovery"]),
    ...mapMutations("ht_store/matter/discovery/filtersIndex", ["updateFilterValue"])
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/matter/discovery/index", ["dataIndexDiscovery"])
  },
  mounted() {
    this.getDataIndexDiscovery();
  }
};
</script>
<style scoped>
.btn-add {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
