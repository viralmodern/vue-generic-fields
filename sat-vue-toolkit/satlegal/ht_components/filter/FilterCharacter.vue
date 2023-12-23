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
export default {
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile/character", [
      "characterFilter"
    ]),
    hasFilters() {
      switch (this.characterFilter && this.characterFilter.name) {
        case "creator":
          if (this.characterFilter.value) {
            localStorage.setItem(
              "creator",
              JSON.stringify(this.characterFilter.value)
            );
          } else {
            localStorage.removeItem("creator");
          }
          break;
        case "assignee":
          if (this.characterFilter.value) {
            localStorage.setItem(
              "assignee",
              JSON.stringify(this.characterFilter.value)
            );
          } else {
            localStorage.removeItem("assignee");
          }
          break;
        case "tag":
          if (this.characterFilter.value) {
            localStorage.setItem(
              "tag",
              JSON.stringify(this.characterFilter.value)
            );
          } else {
            localStorage.removeItem("tag");
          }
          break;
        case "startdate":
          if (this.characterFilter.value) {
            localStorage.setItem(
              "startdate",
              JSON.stringify(this.characterFilter.value)
            );
          } else {
            localStorage.removeItem("startdate");
          }
          break;
        case "enddate":
          if (this.characterFilter.value) {
            localStorage.setItem(
              "enddate",
              JSON.stringify(this.characterFilter.value)
            );
          } else {
            localStorage.removeItem("enddate");
          }
          break;
      }
      var creator = localStorage.getItem("creator");
      var assignee = localStorage.getItem("assignee");
      var tag = localStorage.getItem("tag");
      var startdate = localStorage.getItem("startdate");
      var enddate = localStorage.getItem("enddate");
      var resultFilter = [creator, assignee, tag, startdate, enddate];
      if (this.characterFilter === null) {
        var keysToRemove = [
          "creator",
          "assignee",
          "tag",
          "startdate",
          "enddate"
        ];
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
