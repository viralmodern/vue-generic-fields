<template>
  <v-row no-gutters>
    <v-col cols="12" class="ml-2 mt-3">
      <ActivityExecutor
        :imageUrl="myDataTimerTracking.imageUrl"
        name="You last activities"
      />
      <v-row
        no-gutters
        v-for="v in myDataTimerTracking.myData"
        :key="v.id"
        row
        class="mt-3"
      >
        <v-col sm="10" class="ml-1">
          <v-row no-gutters>
            <span>
              <v-icon color="primary" size="15">local_offer</v-icon>
              {{ v.nameTracking }}
            </span>
            <TimerLabel :time="v.dateTime" class="ml-3" />
          </v-row>
        </v-col>
        <v-col sm="4">
          <span class="primary--text font-weight-bold">
            <v-icon size="15" color="primary">alarm</v-icon>
            {{ v.timer.minutes }}:{{ v.timer.seconds }}
          </span>
        </v-col>
      </v-row>
    </v-col>
    <ListMemberTimeTracking
      :dataMemberTimerTracking="dataMemberTimerTracking"
    />
  </v-row>
</template>
<script>
import TimerLabel from "../labels/TimerLabel";
import ActivityExecutor from "../cards/ActivityExecutor";
import ListMemberTimeTracking from "./ListMemberTimeTracking";
export default {
  components: {
    ActivityExecutor,
    ListMemberTimeTracking,
    TimerLabel
  },
  props: {
    myDataTimerTracking: Object,
    dataMemberTimerTracking: Array
  }
};
</script>
