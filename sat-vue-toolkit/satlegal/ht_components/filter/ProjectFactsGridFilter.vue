<template>
  <v-btn
    rounded
    color="primary"
    :outlined="hasFilters.length > 0 ? false : true"
    @click="openRight('filterFactsGrid')"
  >
    Filter is {{hasFilters.length > 0 ? 'on' : 'off'}}
    <v-icon right>mdi-filter_list</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {$$STORE_PREFIX} from "../../utils";
export default {
  computed: {
    ...mapGetters("ht_store/project/research/facts/factsGrid", ["arrFilter"]),
    hasFilters() {
      switch (this.arrFilter && this.arrFilter.name) {
        case "creator":
          if (this.arrFilter.value) {
            localStorage.setItem(
              "creator",
              JSON.stringify(this.arrFilter.value)
            );
          } else {
            localStorage.removeItem("creator");
          }
          break;
        case "characters":
          if (this.arrFilter.value) {
            localStorage.setItem(
              "characters",
              JSON.stringify(this.arrFilter.value)
            );
          } else {
            localStorage.removeItem("characters");
          }
          break;
        case "startdate":
          if (this.arrFilter.value) {
            localStorage.setItem(
              "startdate",
              JSON.stringify(this.arrFilter.value)
            );
          } else {
            localStorage.removeItem("startdate");
          }
          break;
        case "enddate":
          if (this.arrFilter.value) {
            localStorage.setItem(
              "enddate",
              JSON.stringify(this.arrFilter.value)
            );
          } else {
            localStorage.removeItem("enddate");
          }
          break;
      }
      var creator = localStorage.getItem("creator");
      var characters = localStorage.getItem("characters");
      var startdate = localStorage.getItem("startdate");
      var enddate = localStorage.getItem("enddate");
      var resultFilter = [creator, characters, startdate, enddate];
      if (this.arrFilter === null) {
        var keysToRemove = ["creator", "characters", "startdate", "enddate"];
        keysToRemove.forEach(k => localStorage.removeItem(k));
        return [];
      } else {
        return resultFilter.filter(x => {
          return x != null;
        });
      }
    }
  },
  methods: {
    ...mapMutations("ht_store/layout", ["openRight"])
  }
};
</script>
