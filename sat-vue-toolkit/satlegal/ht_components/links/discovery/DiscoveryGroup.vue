<template>
  <v-row no-gutters>
    <v-col cols="12" class="text-xs-right">
      <v-spacer />
      <FilterDiscovery />
      <v-tooltip bottom v-for="item in items" :key="item.id">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon :to="item.route" active-class="primary--text">
            <v-icon>{{ item.route.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ item.tooltip }}</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>
<script>
import FilterDiscovery from "../../filter/FilterDiscovery";
export default {
  components: {
    FilterDiscovery
  },
  data() {
    return {
      items: [
        {
          id: 1,
          tooltip: "Evidences",
          route: {
            name: "evidences",
            params: {
              groupType: "evidences-grid"
            },
            icon: "local_library"
          }
        },
        {
          id: 2,
          tooltip: "Hearsay",
          route: {
            name: "evidences",
            params: {
              groupType: "hearsay-grid"
            },
            icon: "record_voice_over"
          }
        },
        {
          id: 3,
          tooltip: "Testimony",
          route: {
            name: "evidences",
            params: {
              groupType: "testimony-grid"
            },
            icon: "chrome_reader_mode"
          }
        }
      ]
    };
  }
};
</script>
