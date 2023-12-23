<template>
  <div>
    <v-btn rounded color="primary" :outlined="!hasFilters" @click="openRight('filterExpense')">
      Filter is {{hasFilters ? 'on' : 'off'}}
      <v-icon right>filter_list</v-icon>
    </v-btn>
    <v-navigation-drawer fixed :value="rightType==='filterExpense'" right clipped app>
      <v-list dense>
        <div class="pa-2">
          <v-row no-gutters class="align-center">
            <h2>Filters</h2>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-0">
              <v-icon @click="close">close</v-icon>
            </v-btn>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div class="pa-2">
          <div>
            <v-autocomplete
              v-model="status"
              :items="itemStatus"
              label="Status"
              item-value="id"
              item-text="name"
              @change="filterRequest"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="item.color" small class="white--text">
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-autocomplete>
          </div>
          <div>
            <v-autocomplete
              v-model="categories"
              :items="category"
              label="Category"
              item-value="id"
              item-text="name"
              @change="filterRequest"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" :color="'#'+item.color" small class="white--text">
                  <span>{{ item.name }}</span>
                </v-chip>
              </template>
            </v-autocomplete>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { itemStatus } from "../../config";

export default {
  props: {
    hasFilters: Boolean
  },
  data() {
    return {
      status: "",
      isShowFilter: false,
      itemStatus,
      categories: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/layout", ["rightType"]),
    ...mapGetters("ht_store/matter/helpDesk/category", ["category"])
  },
  methods: {
    filterRequest() {
      let req = {
        category: this.categories || "",
        status: this.status || "",
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      this.$emit("filterHelpDesk", req);
    },
    close() {
      this.openRight("filterExpense");
    },
    ...mapMutations("ht_store/layout", ["openRight"])
  }
};
</script>
