<template>
  <v-btn
    rounded
    color="primary"
    :outlined="hasFilters.length > 0 ? false : true"
    @click="openRight('filterClientTable')"
  >
    Filter is {{hasFilters.length > 0 ? 'on' : 'off'}}
    <v-icon right>mdi-filter_list</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/workspace/client/filters", ["dataFilter"]),
    hasFilters() {
      switch (this.dataFilter && this.dataFilter.name) {
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
        case "matter":
          if (this.dataFilter.value) {
            localStorage.setItem(
              "matter",
              JSON.stringify(this.dataFilter.value)
            );
          } else {
            localStorage.removeItem("matter");
          }
          break;
      }
      var assignee = localStorage.getItem("assignee");
      var matter = localStorage.getItem("matter");
      var resultFilter = [assignee, matter];
      if (this.dataFilter === null) {
        var keysToRemove = ["assignee", "matter"];
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
