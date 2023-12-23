<template>
  <v-row no-gutters>
    <v-col cols="12" v-if="$route.name === 'client'">
      <v-row no-gutters>
        <v-col cols="12" class="mt-1">
          <v-row no-gutters class="justify-end">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon color="primary" :to="redericChat" v-on="on"
                  ><v-icon>mdi-insert_comment</v-icon></v-btn
                >
              </template>
              <span>See all messenger</span>
            </v-tooltip>
            <FilterTableClient />
          </v-row>
        </v-col>
        <v-col cols="12" class="pa-2">
          <TableManagementClient :items="dataClient" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" v-else>
      <router-view></router-view>
    </v-col>
    <v-navigation-drawer
      fixed
      :value="rightType === 'filterClientTable'"
      right
      clipped
      app
    >
      <FactsGridFilterRightMenu>
        <template slot="filter">
          <FilterAssignee @updateFilterValue="updateFilterValue" />
          <FilterMatter @updateFilterValue="updateFilterValue" />
        </template>
      </FactsGridFilterRightMenu>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableManagementClient from "../../ht_components/tables/TableManagementClient";
import FactsGridFilterRightMenu from "../../ht_components/right-menus/FactsGridFilterRightMenu";
import FilterTableClient from "../../ht_components/filter/FilterTableClient";
import FilterAssignee from "../../ht_components/filter/discovery/FilterAssignee";
import FilterMatter from "../../ht_components/filter/client-grid/FilterMatter";

export default {
  components: {
    TableManagementClient,
    FactsGridFilterRightMenu,
    FilterTableClient,
    FilterAssignee,
    FilterMatter
  },
  methods: {
    ...mapMutations("ht_store/workspace/client/filters", ["updateFilterValue"]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"])
  },
  computed: {
    ...mapGetters("ht_store/workspace/client", ["dataClient"]),
    ...mapGetters("ht_store/layout", ["rightType"]),
    redericChat() {
      return this.$route.path + "/chat";
    }
  },
  mounted() {
    this.getDataClientRequest();
  }
};
</script>
