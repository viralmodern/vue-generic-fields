<template>
  <div>
    <VueApexCharts
      width="100%"
      type="heatmap"
      :height="heightChart"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<script>
import faker from 'faker'
function generateData(count, yrange) {
  let i = 0
  let series = []
  while (i < count) {
    let y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    series.push(y)
    i++
  }
  return series
}

// http://two.localhost:3000/odt/dockets/6234142/entities/entity-explorer/doc-0/entity-occurrences
export default {
  name: 'EntityOccurrenceExplorerHeatMap',
  components: {
    VueApexCharts: () => import('vue-apexcharts'),
  },
  props: {
    count: {
      type: Number,
      default: () => 20,
    },
    cellHeight: {
      type: Number,
      default: () => 30,
    },
    categories: {
      type: Array,
      default: () => [
        'Total occurrences',
        'Facts filed by Defendant',
        'Facts filed by Defendant',
        'Facts filed by Court',
        'Facts filed by N/A',
      ],
    },
    ranges: {
      type: Array,
      default: () => [
        {
          from: 0,
          to: 50,
          color: '#F3B415',
        },
        {
          from: 51,
          to: 100,
          color: '#F27036',
        },
      ],
    },
  },
  computed: {
    series() {
      console.log('renderX')
      let data = []
      for (let i = 0; i < this.count; i++) {
        let temp = {}
        temp['name'] = faker.name.findName()
        temp['data'] = generateData(this.categories.length, {
          min: 0,
          max: 90,
        })
        data.push(temp)
      }
      return data
    },
    heightChart() {
      return this.count * this.cellHeight
    },
    chartOptions() {
      let _self = this
      return {
        chart: {
          type: 'heatmap',
          events: {
            click: function (event, chartContext, config) {
              // ...
              try {
                let { seriesIndex, dataPointIndex } = config
                console.log('series', config, _self.series, _self.categories)
                let row = {
                  y: _self.categories[dataPointIndex],
                  x: _self.series[seriesIndex],
                  seriesIndex,
                  dataPointIndex,
                  value: _self.series[seriesIndex]['data'][dataPointIndex],
                }
                console.log('series', row)
                if (seriesIndex >= 0 && dataPointIndex >= 0) {
                  _self.$emit('cell-click', row)
                }
              } catch (e) {
                console.log(e.message)
              }
              return false
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          heatmap: {
            colorScale: {
              inverse: true,
              ranges: this.ranges,
            },
          },
        },
        xaxis: {
          type: 'category',
          categories: this.categories,
          position: 'top',
        },
        title: {
          text: '',
        },
        responsive: [
          {
            breakpoint: 2000,
            options: {},
          },
        ],
      }
    },
  },
  async mounted() {
    // await this.loadScripts()
  },
  methods: {
    initChart() {},
  },
}
</script>

<style scoped></style>
