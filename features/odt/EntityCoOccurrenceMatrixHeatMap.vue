<template>
  <div>
    <VueApexCharts
      type="heatmap"
      height="550"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<script>
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
const categories = [
  'Ghislaine Maxwell',
  'Virginia Roberts',
  'Bill Clinton',
  'Jeffery Epstein',
  'eslie Wexner',
  'Tarama Foundation',
  'Jane Doe 001',
]
let data = categories.map((cate) => {
  let t = {}
  t['name'] = cate
  t['data'] = generateData(categories.length, {
    min: 0,
    max: 90,
  })
  return t
})
// data.reverse()
export default {
  name: 'EntityCoOccurrenceMatrixHeatMap',
  components: {
    VueApexCharts: () => import('vue-apexcharts'),
  },
  computed: {
    series() {
      return data
    },
    chartOptions() {
      let _self = this
      return {
        chart: {
          height: 350,
          type: 'heatmap',
          events: {
            click: function (event, chartContext, config) {
              // ...
              try {
                let { seriesIndex, dataPointIndex } = config
                let row = {
                  y: categories[dataPointIndex],
                  x: data[seriesIndex],
                  seriesIndex,
                  dataPointIndex,
                  value: data[seriesIndex]['data'][dataPointIndex],
                }
                console.log('series', row)
                if (seriesIndex >= 0 && dataPointIndex >= 0) {
                  _self.$emit('cell-click', row)
                }
              } catch (e) {}
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
            },
          },
        },
        colors: [
          '#F3B415',
          '#F27036',
          '#663F59',
          '#6A6E94',
          '#4E88B4',
          '#00A7C6',
          '#18D8D8',
          '#A9D794',
          '#46AF78',
          '#A93F55',
          '#8C5E58',
          '#2176FF',
          '#33A1FD',
          '#7A918D',
          '#BAFF29',
        ],
        xaxis: {
          type: 'category',
          categories: categories,
          // position: 'top',
        },
        title: {
          text: 'Entity Cooccurrence Matrix',
        },
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
