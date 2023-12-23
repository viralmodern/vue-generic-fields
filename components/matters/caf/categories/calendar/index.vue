<template>
  <base-caf>
    <v-card :elevation="0">
      <v-card-title>
        <v-icon left>mdi-calendar</v-icon>
        Calendar
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi, eos, error excepturi illo magni,
        molestiae nemo officia quod quos tempore totam! Adipisci hic id ipsa quisquam tempora ullam vel?
      </v-card-text>
      <v-card-text>
        <calendar-meeting></calendar-meeting>
        <new-meeting></new-meeting>
      </v-card-text>
    </v-card>
  </base-caf>
</template>

<script>
import BaseCaf from "../../utils/BaseCaf";
import CalendarMeeting from "./CalendarMeeting";
import NewMeeting from "./NewMeeting";

export default {
  name: "index",
  components: {NewMeeting, CalendarMeeting, BaseCaf}
}
</script>

<style scoped>

</style>
