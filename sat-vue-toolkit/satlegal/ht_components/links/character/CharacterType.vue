<template>
  <v-row  no-gutters>
    <v-col cols="12">
      <v-row  no-gutters>
        <CharacterList/>
      </v-row>
    </v-col>
    <v-col cols="12">
      <Activities :type="listType"/>
    </v-col>
    <v-navigation-drawer fixed :value="rightType==='filterFactsGrid'" right clipped app>
      <FactsGridFilterRightMenu>
        <template slot="filter">
          <FilterCreator/>
          <FilterAssignee/>
          <FilterTag/>
          <FilterStartDate/>
          <FilterEndDate/>
        </template>
      </FactsGridFilterRightMenu>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import CharacterList from "./CharacterList";
import Activities from "../../research/characters/Activities";
import FactsGridFilterRightMenu from "../../right-menus/FactsGridFilterRightMenu";

import FilterCreator from "../../filter/character/FilterCreator";
import FilterAssignee from "../../filter/character/FilterAssignee";
import FilterTag from "../../filter/character/FilterTag";
import FilterStartDate from "../../filter/character/FilterStartDate";
import FilterEndDate from "../../filter/character/FilterEndDate";

export default {
  components: {
    CharacterList,
    Activities,
    FactsGridFilterRightMenu,
    FilterCreator,
    FilterAssignee,
    FilterTag,
    FilterStartDate,
    FilterEndDate
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    listType() {
      return this.$route.params.listType === "grid"
        ? 1
        : this.$route.params.listType === "timeline"
        ? 2
        : 3;
    }
  }
};
</script>
