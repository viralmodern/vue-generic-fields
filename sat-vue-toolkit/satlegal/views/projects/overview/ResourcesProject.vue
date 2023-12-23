<template>
  <div>
    <v-row no-gutters v-for="(board, index) in boards" :key="index">
      <div
        class="left-resource"
        :style="{ borderLeftColor: boardColor(index) }"
      >
        <BoardSummary :board="board" :color="boardColor(index)" />
      </div>
      <v-col>
        <ResourceViewerCalendar
          hide-header
          :type="1"
          :resources="board.resources"
          :backgroundColor="boardColor(index)"
          :startDate="startDate"
          :endDate="endDate"
          :calendarType="type"
          v-if="type !== 0"
        />
        <DailyTimerBody
          hide-header
          :type="1"
          :resources="board.resources"
          :backgroundColor="boardColor(index)"
          :startDate="startDate"
          :endDate="endDate"
          :calendarType="type"
          v-else
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { resourceViewerColors } from "../../../config";
import ResourceViewerCalendar from "../../../ht_components/calendar/resource-viewer/Calendar";
import DailyTimerBody from "../../../ht_components/calendar/resource-viewer/DailyTimerBody";
import BoardSummary from "../../../ht_components/panels/ProjectResourceBoardSummary.vue";
export default {
  components: {
    DailyTimerBody,
    ResourceViewerCalendar,
    BoardSummary
  },
  computed: {
    ...mapGetters("ht_store/project/resources", ["startDate", "endDate", "type"]),
    ...mapGetters("ht_store/project/resources/project", ["boards"])
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
