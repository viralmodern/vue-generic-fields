<template>
  <div>
    <v-rowt no-gutters v-for="(team, index) in teams" :key="index">
      <div
        class="left-resource resource-board-wrapper"
        :style="{ borderLeftColor: boardColor(index) }"
      >
        <TeamSummary :team="team" :color="boardColor(index)" />
      </div>
      <v-col>
        <ResourceViewerCalendar
          hide-header
          :type="0"
          :resources="team.resources"
          :startDate="startDate"
          :backgroundColor="boardColor(index)"
          :endDate="endDate"
          :calendarType="type"
          v-if="type !== 0"
        />
        <DailyTimerBody
          hide-header
          :type="0"
          :resources="team.resources"
          :startDate="startDate"
          :backgroundColor="boardColor(index)"
          :endDate="endDate"
          v-else
        />
      </v-col>
    </v-rowt>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { resourceViewerColors } from "../../../config";
import ResourceViewerCalendar from "../../../ht_components/calendar/resource-viewer/Calendar";
import DailyTimerBody from "../../../ht_components/calendar/resource-viewer/DailyTimerBody";
import TeamSummary from "../../../ht_components/panels/ProjectResourceTeamSummary.vue";
export default {
  components: {
    ResourceViewerCalendar,
    DailyTimerBody,
    TeamSummary
  },
  computed: {
    ...mapGetters("ht_store/project/resources", ["startDate", "endDate", "type"]),
    ...mapGetters("ht_store/project/resources/team", ["teams"])
  },
  methods: {
    boardColor(index) {
      return resourceViewerColors[index % resourceViewerColors.length];
    }
  }
};
</script>

<style scoped>
.left-resource {
  width: 250px;
  border-left: 3px solid transparent;
}
</style>
