<template>
  <div>
    <div>
      <TimeLinePreview :previewData="timeline" @activePreviewDay="changeActiveDay"/>
    </div>
    <div>
      <TimeLineHeader class="timeline-preview-header"/>
    </div>
    <div>
      <TimeLineBody :list="timeline[selectedDay]"/>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
import TimeLineHeader from "../../calendar/resource-viewer/DailyTimerHeader";
import TimeLinePreview from "../../calendar/timeline-preview/TimeLinesPreview";
import TimeLineBody from "../../calendar/timeline/TimeLineBody";
export default {
  components: {
    TimeLineHeader,
    TimeLinePreview,
    TimeLineBody
  },
  data() {
    return {
      selectedDay: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile", [
      "dataProfileCharacter"
    ]),
    timeline() {
      var arrTimeLine =
        this.dataProfileCharacter &&
        this.dataProfileCharacter.map(e => {
          return {
            event: {
              id: e.id,
              name: e.factName,
              color: e.status.color
            },
            time: {
              from: e.dateTime.from,
              to: e.dateTime.to
            },
            place: {
              id: Math.random(),
              shortName: e.factName,
              name: e.factName
            }
          };
        });
      const map = {};
      arrTimeLine &&
        arrTimeLine.forEach(e =>
          (map[moment(e.time.from).format("YYYY-MM-DD")] =
            map[moment(e.time.from).format("YYYY-MM-DD")] || []).push(e)
        );
      return map;
    }
  },
  methods: {
    changeActiveDay(day) {
      this.selectedDay = day;
    }
  }
};
</script>
<style scoped>
.timeline-preview-header /deep/ .v-calendar-daily__head {
  margin-right: 0px !important;
}
</style>
