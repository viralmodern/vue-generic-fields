<template>
  <div>
    <v-btn
      rounded
      color="primary"
      :outlined="!isShowFilter"
      @click="openRight('filterDiscoveryLog')"
    >
      Filter is {{ isShowFilter ? "on" : "off" }}
      <v-icon right>mdi-filter_list</v-icon>
    </v-btn>
    <v-navigation-drawer
      fixed
      :value="rightType === 'filterDiscoveryLog'"
      right
      clipped
      app
    >
      <v-list dense>
        <v-container class="pa-2">
          <v-row no-gutters class="align-center">
            <v-col grow>
              <h2>Filters</h2>
            </v-col>
            <v-btn icon class="ma-0">
              <v-icon @click="close">mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-row class="mt-1 mb-2 pa-2" no-gutters>
          <slot name="filter">
            <FilterType @filterLog="filterLog" />
            <FilterName @filterLog="filterLog" />
            <FilterCreator @filterLog="filterLog" />
          </slot>
        </v-row>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import FilterType from "./discovery-log/FilterType";
import FilterName from "./discovery-log/FilterName";
import FilterCreator from "./discovery-log/FilterCreator";
export default {
  data() {
    return {
      isShowFilter: false
    };
  },
  components: {
    FilterType,
    FilterName,
    FilterCreator
  },
  methods: {
    ...mapMutations("ht_store/layout", ["openRight"]),
    close() {
      this.openRight("filterDiscoveryLog");
    },
    filterLog(data) {
      if (data.type === "type") {
        if (data.value.length != 0) {
          this.isShowFilter = true;
        } else {
          this.isShowFilter = false;
        }
      }
      if (data.type === "name") {
        if (data.value) {
          this.isShowFilter = true;
        } else {
          this.isShowFilter = false;
        }
      }
      this.$emit("filterLog", data);
    }
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"])
  }
};
</script>
