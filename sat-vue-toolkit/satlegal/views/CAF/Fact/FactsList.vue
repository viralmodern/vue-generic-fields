<template>
  <v-row no-gutters>
    <v-col cols="12" class="text-xs-right">
      <v-spacer />
      <v-tooltip bottom v-for="item in itemFactsList" :key="item.id">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon :to="item.route" active-class="primary--text">
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ item.tooltip }}</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      itemFactsList: [
        {
          id: 1,
          route: {
            name: "facts",
            params: {
              listType: "summary",
              groupType: this.$route.params.groupType
            }
          },
          icon: "mdi-chart-bar",
          tooltip: "Summary"
        },
        {
          id: 2,
          route: {
            name: "facts",
            params: {
              listType: "grid",
              groupType: this.$route.params.groupType
            }
          },
          icon: "mdi-view-module",
          tooltip: "Grid"
        },
        // {
        //   id: 3,
        //   route: {
        //     params: {
        //       name: "facts",
        //       listType: "character-group",
        //       groupType: this.$route.params.groupType
        //     }
        //   },
        //   icon: "group",
        //   tooltip: "Character group"
        // },
        // {
        //   id: 4,
        //   route: {
        //     name: "facts",
        //     params: {
        //       listType: "card",
        //       groupType: this.$route.params.groupType
        //     }
        //   },
        //   icon: "view_list",
        //   tooltip: "Card"
        // },
        // {
        //   id: 5,
        //   route: {
        //     name: "facts",
        //     params: {
        //       listType: "timeline",
        //       groupType: this.$route.params.groupType
        //     }
        //   },
        //   icon: "timeline",
        //   tooltip: "Timeline"
        // },
        {
          id: 6,
          route: {
            name: "facts",
            params: {
              listType: "slickgrid-version",
              groupType: this.$route.params.groupType
            }
          },
          icon: "mdi-invert-colors",
          tooltip: "Fact Version Slickgrid"
        },
      ]
    };
  }
};
</script>
