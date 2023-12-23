<template>
  <v-col>
    <span class="text-body-2">{{date | formatDMY}} :</span>

    <EventScheduleCard
      class="mt-2"
      v-for="item in events"
      :key="item.id"
      :startTime="item.timeStart"
      :endTime="item.timeEnd"
      :category="item.meetingName"
      :description="item.description"
      :colorLable="item.colorLable"
    />
  </v-col>
</template>

<script>
import { colorsListForAvatars } from "../../config";
import EventScheduleCard from "../cards/EventScheduleCard";
export default {
  components: {
    EventScheduleCard
  },
  props: {
    date: String,
    events: Array
  },
  data() {
    return {
      colorsListForAvatars
    };
  }
};
</script>
