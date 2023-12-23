<template>
  <v-menu
    v-if="!!listEvent.length"
    :close-on-content-click="false"
    :nudge-width="200"
    max-width="450"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" outlined rounded>
        <v-icon>star</v-icon>
        You have {{ listEvent.length }} pinned agenda
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <div
          class="px-3 py-2"
          v-for="(item, index) in Object.keys(eventsMap)"
          :key="index"
        >
          <div class="py-2 pl-1 subheading text--secondary">
            {{ item | $formatFullDateTime }}
          </div>
          <PinnedAgendaItem
            class="px-1 pt-2"
            v-for="(event, index) in eventsMap[item]"
            :key="index"
            :duration="event.duration"
            :title="event.title"
            :description="event.description"
            :time="event.time"
            :numberOfContinuouslyDays="event.numberOfContinuouslyDays"
            :members="event.members"
          />
        </div>
      </v-list>
    </v-card>
  </v-menu>
  <v-btn v-else color="primary" outlined rounded>
    <v-icon>star</v-icon>
    You have {{ listEvent.length }} pinned agenda
  </v-btn>
</template>
<script>
import PinnedAgendaItem from "../cards/PinnedAgendaItem";
import { $formatFullDateTime } from "@/sat-vue-toolkit/functions"
export default {
  filters: {
    $formatFullDateTime
  },
  components: {
    PinnedAgendaItem
  },
  props: {
    listEvent: Array
  },
  computed: {
    eventsMap() {
      const map = {};
      this.listEvent.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  }
};
</script>
