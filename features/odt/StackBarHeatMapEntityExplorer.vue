<template>
  <div>
    <CalendarHeadMapChart :chart-options="chartOptions" :id-chart="idChart" />
  </div>
</template>

<script>
import CalendarHeadMapChart from '@/sat-vue-toolkit/components/charts/CalendarHeadMapChart.vue'
import { $$resultsStackBar } from '@/sat-vue-toolkit/components/slick-grid/helpers/chart'
import moment from 'moment'
window.moment = moment
export default {
  name: 'StackBarHeatMapEntityExplorer',
  components: { CalendarHeadMapChart },
  props: {
    idChart: {
      type: String,
      required: true,
    },
  },
  computed: {
    chartOptions() {
      return $$resultsStackBar()
    },
  },
}
</script>

<style scoped></style>
