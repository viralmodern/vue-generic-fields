<template>
  <div>
    <div>
      <TimeLinePreview :previewData="timeline" @activePreviewDay="changeActiveDay"/>
    </div>
    <div>
      <CardViewItem
        v-for="(item, index) in compileDataFacts"
        :key="index"
        :type="item.type"
        :types="types"
        :items="item"
        :character="character"
        :creator="members"
        :location="locations"
        class="ma-3"
      />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
import CardViewItem from "../cards/CardViewItem";
import TimeLinePreview from "../calendar/timeline-preview/TimeLinesPreview";
export default {
  components: {
    CardViewItem,
    TimeLinePreview
  },
  data() {
    return {
      selectedDay: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataFactsReSearch"]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/matter/location", ["locations"]),
    ...mapGetters("ht_store/matter/type", ["types"]),
    timeline() {
      var arrTimeLine =
        this.dataFactsReSearch &&
        this.dataFactsReSearch.map(e => {
          return {
            event: {
              id: e.id,
              name: this.members.filter(x => {
                return x.id === e.creator;
              }),
              color: e.status.color
            },
            time: {
              from: e.dateTime.from,
              to: e.dateTime.to
            },
            place: {
              id: Math.random(),
              shortName: e.causeOfActions,
              name: e.subjectMatter
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
    },
    compileDataFacts() {
      if (this.selectedDay) {
        return (this.dataFactsReSearch || []).filter(x => {
          return (
            moment(x.dateTime.from).format("YYYY-MM-DD") === this.selectedDay
          );
        });
      } else {
        return (this.dataFactsReSearch || []);
      }
    }
  },
  methods: {
    changeActiveDay(day) {
      this.selectedDay = day;
    }
  }
};
</script>
