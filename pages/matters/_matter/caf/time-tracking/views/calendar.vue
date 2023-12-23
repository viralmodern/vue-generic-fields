<template>
  <v-container fluid>
    <ViewCalendar />
  </v-container>
</template>

<script>
import ViewCalendar from '../../../../../../components/matters/caf/categories/time-tracking/time-tracking-views/calendar/ViewCalendar'
export default {
  components: { ViewCalendar },
  head() {
    return {
      title: 'UKP'
    }
  }
}
</script>
