<template>
  <div>
    <CalendarHeatMapEntityExplorer
      id-chart="CalendarHeatMapEntityExplorer-2020"
    />
  </div>
</template>

<script>
import CalendarHeatMapEntityExplorer from '~/features/odt/CalendarHeatMapEntityExplorer'
export default {
  components: { CalendarHeatMapEntityExplorer },
  mounted() {
    // alert('calendar')
  },
}
</script>

<style scoped></style>
