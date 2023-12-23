<template>
  <div>
    <v-row no-gutters class="py-2 align-center">
      <span class="text-h5 text--secondary px-4">{{ today | formatMY }}</span>
      <div>
        <v-btn icon class="grey lighten-4 ma-0" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron_left</v-icon>
        </v-btn>
        <v-btn
          icon
          class="grey lighten-4 ma-0 ml-1"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron_right</v-icon>
        </v-btn>
      </div>
      <PinnedAgendaList :listEvent="dataPin" />
    </v-row>
    <v-divider></v-divider>
    <v-calendar
      ref="calendar"
      :value="today"
      @input="changeDate"
      color="primary"
      type="week"
    >
      <template slot="dayBody" slot-scope="{ date, timeToY, minutesToPixels }">
        <MeetingSlotOnCalendar
          v-for="(event, index) in eventsMap[date]"
          :key="index"
          :duration="event.duration"
          :title="event.title"
          :description="event.description"
          :time="event.time"
          :numberOfContinuouslyDays="event.numberOfContinuouslyDays"
          :timeToY="timeToY"
          :minutesToPixels="minutesToPixels"
          :members="event.members"
          :isPinned="event.isPinned"
          @updatePin="updatePin(event.id)"
        />
      </template>
    </v-calendar>
  </div>
</template>

<script>
import moment from "moment";
import MeetingSlotOnCalendar from "../cards/MeetingSlotOnCalendar";
import PinnedAgendaList from "../menus/PinnedAgendaList";
export default {
  components: {
    MeetingSlotOnCalendar,
    PinnedAgendaList
  },
  props: {
    dataMeetingWeekly: Array
  },
  data: () => ({
    today: moment(new Date()).format("YYYY-MM-DD"),
    dataPin: []
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.dataMeetingWeekly.forEach(e =>
        (map[e.date] = map[e.date] || []).push(e)
      );
      return map;
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  methods: {
    open(event) {
      alert(event.title);
    },
    getEvents(date) {
      return this.eventsMap[date];
    },
    changeDate(day) {
      if (typeof day === "string") {
        this.today = day;
      }
    },
    getDaysOfWeek(start) {
      const result = [start.format("YYYY-MM-DD")];
      while (result.length < 7)
        result.push(start.add(1, "d").format("YYYY-MM-DD"));
      return result;
    },
    updatePin(id) {
      this.$emit("updatePin", id);
    },
    getDataPinOfWeek(weekdays, eventsMap) {
      let result = [];
      weekdays.map(x => {
        if (eventsMap[x]) {
          result = [...result, ...eventsMap[x].filter(e => e.isPinned)];
        }
        return x;
      });
      return result;
    }
  },
  watch: {
    today(day) {
      const start = moment(day).startOf("week");
      let dayListOfWeek = this.getDaysOfWeek(start);
      this.dataPin = this.getDataPinOfWeek(dayListOfWeek, this.eventsMap);
    },
    eventsMap(data) {
      const start = moment(this.today).startOf("week");
      let dayListOfWeek = this.getDaysOfWeek(start);
      this.dataPin = this.getDataPinOfWeek(dayListOfWeek, data);
    }
  }
};
</script>
