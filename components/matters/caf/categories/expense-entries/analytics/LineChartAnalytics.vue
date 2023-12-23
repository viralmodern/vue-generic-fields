<template>
  <LineChart :options="options" :chart-data="chartdata" />
</template>

<script>
import LineChart from '../../../../../utils/charts/LineChart'
export default {
  name: 'LineChartAnalytics',
  components: { LineChart },
  data() {
    return {
      chartdata: {
        datasets: [
          {
            label: 'American Express',
            backgroundColor: 'pink',
            borderColor: 'red',
            borderWidth: 1,
            data: [3, 5, 6, 7, 3, 5, 6, 7]
          },
          {
            label: 'Mastercard',
            backgroundColor: 'lightblue',
            borderColor: 'blue',
            borderWidth: 1,
            data: [4, 7, 3, 6, 10, 7, 4, 6]
          },
          {
            label: 'Paypal',
            backgroundColor: 'lightgreen',
            borderColor: 'green',
            borderWidth: 1,
            data: [10, 7, 4, 6, 9, 7, 3, 10]
          },
          {
            label: 'Visa',
            backgroundColor: 'yellow',
            borderColor: 'orange',
            borderWidth: 1,
            data: [6, 9, 7, 3, 10, 7, 4, 6]
          }
        ],
        labels: [
          'Absence of OB',
          'Closeness',
          'Credibility',
          'Heritage',
          'M Disclosure',
          'Provenance',
          'Reliability',
          'Transparency'
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Expense grouped bar'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
  methods: {
    renderChart() {}
  }
}
</script>

<style scoped></style>
