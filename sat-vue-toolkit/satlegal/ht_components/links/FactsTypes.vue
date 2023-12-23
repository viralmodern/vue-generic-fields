<template>
  <v-row no-gutters class="mt-2">
    <v-col cols="12">
      <v-row no-gutters class="d-flex justify-end">
        <FactsGroup v-if="listType === 2" />
        <div>
          <v-row class="mr-2">
            <FactsList />
            <div class="btn-config">
              <ConfigurationMenu v-if="listType === 2" />
            </div>
          </v-row>
        </div>
      </v-row>
    </v-col>
    <v-col cols="12">
      <HomeFacts
        @updatePagination="paging => $emit('updatePagination', paging)"
        :groupType="groupType"
        :type="listType"
      ></HomeFacts>
    </v-col>
    <v-navigation-drawer fixed :value="rightType==='filterFactsGrid'" right clipped app>
      <FactsGridFilterRightMenu>
        <template slot="filter">
          <FilterCreator />
          <FilterCharacters />
          <FilterStartDate />
          <FilterEndDate />
        </template>
      </FactsGridFilterRightMenu>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import FactsList from "./FactsList";
import FactsGroup from "./FactsGroup";
import HomeFacts from "../research/facts/HomeFacts";
import ConfigurationMenu from "../menus/ConfigurationMenu";
import FactsGridFilterRightMenu from "../right-menus/FactsGridFilterRightMenu";
import FilterCreator from "../filter/facts-grid/FilterCreator";
import FilterCharacters from "../filter/facts-grid/FilterCharacters";
import FilterStartDate from "../filter/facts-grid/FilterStartDate";
import FilterEndDate from "../filter/facts-grid/FilterEndDate";
export default {
  components: {
    FactsGroup,
    FactsList,
    HomeFacts,
    FactsGridFilterRightMenu,
    ConfigurationMenu,
    FilterCreator,
    FilterCharacters,
    FilterStartDate,
    FilterEndDate
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    listType() {
      return this.$route.params.listType === "summary"
        ? 1
        : this.$route.params.listType === "grid"
        ? 2
        : this.$route.params.listType === "character-group"
        ? 3
        : this.$route.params.listType === "slickgrid-version"
        ? 6
        : this.$route.params.listType === "card"
        ? 4
        : 5;
    },
    groupType() {
      return this.$route.params.groupType;
    }
  }
};
</script>
