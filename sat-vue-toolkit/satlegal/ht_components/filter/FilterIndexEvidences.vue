<template>
  <v-btn
    rounded
    color="primary"
    :outlined="hasFilters.length > 0 ? false : true"
    @click="openRight('filterIndex')"
  >
    Filter is {{ hasFilters.length > 0 ? "on" : "off" }}
    <v-icon right>filter_list</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/discovery/filtersIndex", ["dataFilter"]),
    hasFilters() {
      switch (this.dataFilter && this.dataFilter.name) {
        case "creator":
          if (this.dataFilter.value) {
            localStorage.setItem(
              "creator",
              JSON.stringify(this.dataFilter.value)
            );
          } else {
            localStorage.removeItem("creator");
          }
          break;
        case "assignee":
          if (this.dataFilter.value) {
            localStorage.setItem(
              "assignee",
              JSON.stringify(this.dataFilter.value)
            );
          } else {
            localStorage.removeItem("assignee");
          }
          break;
        case "tag":
          if (this.dataFilter.value) {
            localStorage.setItem("tag", JSON.stringify(this.dataFilter.value));
          } else {
            localStorage.removeItem("tag");
          }
          break;
      }
      var creator = localStorage.getItem("creator");
      var assignee = localStorage.getItem("assignee");
      var tag = localStorage.getItem("tag");
      var resultFilter = [creator, assignee, tag];
      if (this.dataFilter === null) {
        var keysToRemove = ["creator", "assignee", "tag"];
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
