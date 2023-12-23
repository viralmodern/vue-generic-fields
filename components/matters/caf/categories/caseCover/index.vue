<template>
  <base-caf>
    <v-card :elevation="0">
      <v-card-title>
        <v-icon left>mdi-timetable</v-icon>
        Case Cover
        <v-spacer />
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        animi, eos, error excepturi illo magni, molestiae nemo officia quod quos
        tempore totam! Adipisci hic id ipsa quisquam tempora ullam vel?
      </v-card-text>
      <v-card-text>
        <p class="text-subtitle-2">Recent Updates</p>
        <snapshot-statistics />
      </v-card-text>
      <v-card-text>
        <div class="d-flex">
          <p class="text-subtitle-2">Activities</p>
          <v-spacer />
          <date-range />
        </div>
        <activities-stream />
      </v-card-text>
    </v-card>
    <v-card> </v-card>
  </base-caf>
</template>

<script>
import BaseCaf from '../../utils/BaseCaf'
import SnapshotStatistics from './SnapshotStatistics'
import ActivitiesStream from './ActivitiesStream'
import DateRange from '../../../../utils/DateRange'

export default {
  name: 'index',
  components: { DateRange, ActivitiesStream, SnapshotStatistics, BaseCaf },
}
</script>

<style scoped></style>
