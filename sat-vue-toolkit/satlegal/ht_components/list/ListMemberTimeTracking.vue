<template>
  <v-row no-gutters>
    <v-col
      v-for="v in dataMemberTimerTracking"
      :key="v.id"
      cols="12"
      class="ml-2 mt-3"
    >
      <ActivityExecutor
        :imageUrl="v.imageUrl"
        :name="v.name"
        :department="v.department"
      />
      <v-row
        no-gutters
        v-for="i in v.dataTracking"
        :key="i.id"
        row
        class="mt-3"
      >
        <v-col sm="10" class="ml-1">
          <v-row no-gutters>
            <span>
              <v-icon color="primary" size="15">local_offer</v-icon>
              {{ i.nameTracking }}
            </span>
            <TimerLabel :time="`2019-03-02T03:00:23.167Z`" class="ml-3" />
          </v-row>
        </v-col>
        <v-col sm="4">
          <span class="primary--text font-weight-bold">
            <v-icon size="15" color="primary">alarm</v-icon>
            {{ i.timer.minutes }}:{{ i.timer.seconds }}
          </span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import TimerLabel from "../labels/TimerLabel";
import ActivityExecutor from "../cards/ActivityExecutor";
export default {
  components: {
    TimerLabel,
    ActivityExecutor
  },
  props: {
    dataMemberTimerTracking: Array
  }
};
</script>
