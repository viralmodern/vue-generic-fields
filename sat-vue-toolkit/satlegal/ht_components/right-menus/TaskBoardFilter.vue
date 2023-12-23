<template>
  <v-list dense>
    <v-container class="pa-2">
      <v-row no-gutters class="align-center">
        <v-col grow>
          <h2>Filters</h2>
        </v-col>
        <v-btn icon class="ma-0">
          <v-icon @click="close">close</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-row class="mt-2 mb-2 justify-center">
      <MenuConfigFilters
        @turnOnOffFilter="turnOnOffFilter"
        :filters="filters"
      />
    </v-row>
    <v-divider></v-divider>
    <v-slide-x-transition group>
      <v-row
        no-gutters
        class="pa-1 align-item"
        v-for="filter in activeFilters"
        :key="filter.name"
      >
        <v-col>
          <component :is="getDisplayComponent(filter.name)" :filter="filter">{{
            filter.name
          }}</component>
        </v-col>
        <v-btn
          icon
          small
          class="ml-1"
          color="error"
          @click="toggleFilter({ filterName: filter.name, active: false })"
        >
          <v-icon>mdi-delete_outline</v-icon>
        </v-btn>
      </v-row>
    </v-slide-x-transition>
    <v-btn v-if="hasFilters" color="primary" @click="deactiveAllFilter"
      >Clear filter</v-btn
    >
  </v-list>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import MenuConfigFilters from "../menus/MenuConfigFilters";
import FilterCardName from "../filter/task-board/CardName";
import FilterAttachment from "../filter/task-board/Attachments";
import FilterDuaDate from "../filter/task-board/DueDate";
import FilterEstimation from "../filter/task-board/Estimation";
import FilterFavorable from "../filter/task-board/Favorable";
import FilterLabels from "../filter/task-board/Labels";
import FilterLocation from "../filter/task-board/Locations";
import FilterMembers from "../filter/task-board/Members";
import FilterPeople from "../filter/task-board/People";
import FilterProgress from "../filter/task-board/Progress";
import FilterRisk from "../filter/task-board/Risk";
import FilterTreatment from "../filter/task-board/Treatment";
import FilterVulnerability from "../filter/task-board/Vulnerability";
export default {
  components: {
    MenuConfigFilters
  },
  methods: {
    ...mapMutations("ht_store/layout", ["openRight"]),
    ...mapMutations("ht_store/project/board/filter", [
      "toggleFilter",
      "deactiveAllFilter"
    ]),
    turnOnOffFilter(filter) {
      this.toggleFilter({ filterName: filter.name, active: !filter.active });
    },
    close() {
      this.openRight("filterBoard");
    },
    getDisplayComponent(filterName) {
      switch (filterName) {
        case "cardName":
          return FilterCardName;
        case "labels":
          return FilterLabels;
        case "dueDate":
          return FilterDuaDate;
        case "members":
          return FilterMembers;
        case "progress":
          return FilterProgress;
        case "location":
          return FilterLocation;
        case "people":
          return FilterPeople;
        case "favorable":
          return FilterFavorable;
        case "risk":
          return FilterRisk;
        case "vulnerability":
          return FilterVulnerability;
        case "treatment":
          return FilterTreatment;
        case "attachment":
          return FilterAttachment;
        case "estimation":
          return FilterEstimation;
      }
      return "div";
    }
  },
  computed: {
    ...mapGetters("ht_store/project/board/filter", [
      "filters",
      "activeFilters",
      "hasFilters"
    ])
  }
};
</script>
