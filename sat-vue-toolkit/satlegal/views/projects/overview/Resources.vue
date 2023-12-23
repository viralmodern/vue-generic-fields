<template>
  <div>
    <Header class="py-3" />
    <v-row no-gutters>
      <v-list class="left-resource">
        <Links />
      </v-list>
      <v-col>
        <ResourceViewerCalendar
          :resources="[]"
          :startDate="startDate"
          :endDate="endDate"
          :calendarType="type"
          backgroundColor="#1565C0"
          v-if="type !== 0"
        />
        <ResourceViewerDailyTimerHeader v-else />
      </v-col>
    </v-row>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "../../../ht_components/header-wrapper/ProjectResourcesOverview";
import ResourceViewerCalendar from "../../../ht_components/calendar/resource-viewer/Calendar";
import ResourceViewerDailyTimerHeader from "../../../ht_components/calendar/resource-viewer/DailyTimerHeader";
import Links from "../../../ht_components/links/ProjectResourceTypes.vue";
export default {
  components: {
    Header,
    ResourceViewerCalendar,
    ResourceViewerDailyTimerHeader,
    Links
  },
  computed: {
    ...mapGetters("ht_store/project/resources", ["startDate", "endDate", "type"])
  },
  mounted() {
    this.getBoards();
    this.getTeams();
  },
  methods: {
    ...mapActions("ht_store/project/resources/project", ["getBoards"]),
    ...mapActions("ht_store/project/resources/team", ["getTeams"])
  }
};
</script>

<style scoped>
.left-resource {
  width: 250px;
  border: solid 1px silver !important;
}
</style>
