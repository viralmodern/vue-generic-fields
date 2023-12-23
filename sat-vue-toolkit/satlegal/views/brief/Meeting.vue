<template>
  <v-list style="height:100%">
    <div class="px-3">
      <v-row no-gutters class="align-center justify-end">
        <v-btn @click="mode = 'agenda'" icon class="ma-0 mx-1">
          <v-icon :color="mode === 'agenda' ? 'primary' : ''" size="25"
            >mdi-view_agenda</v-icon
          >
        </v-btn>
        <v-btn @click="mode = 'weekly'" icon class="ma-0">
          <v-icon :color="mode === 'weekly' ? 'primary' : ''" size="32"
            >mdi-view_week</v-icon
          >
        </v-btn>
      </v-row>
    </div>
    <v-divider class="my-1"></v-divider>
    <div v-show="mode === 'agenda'">
      <MeetingAgenda />
    </div>
    <div v-show="mode === 'weekly'">
      <MeetingWeekly />
    </div>
  </v-list>
</template>

<script>
import MeetingAgenda from "../../ht_components/briefcase-meeting/MeetingAgenda";
import MeetingWeekly from "../../ht_components/briefcase-meeting/MeetingWeekly";
export default {
  components: {
    MeetingAgenda,
    MeetingWeekly
  },
  data() {
    return {
      mode: "agenda"
    };
  }
};
</script>
