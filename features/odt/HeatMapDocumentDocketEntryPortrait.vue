<template>
  <v-card flat>
    <!--    {{series}}-->
    <!--<VueApexCharts
      type="heatmap"
      height="550"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>-->
    <v-card-subtitle> Files ({{ series.length }}) </v-card-subtitle>
    <v-card-text>
      <div class="list_circle d-flex flex-wrap">
        <template v-for="pdf in series">
          <div class="item_circle" :key="pdf.pk">
            <v-icon :title="pdf.name" :color="pdf.color"
              >mdi-checkbox-blank-circle
            </v-icon>
          </div>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import faker from 'faker'

const colors = [
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
]
const types = ['small', 'medium', 'large', 'stronger', 'bigger']
function generateData(count) {
  let i = 0
  let series = []
  while (i < count) {
    series.push(i)
    i++
  }
  return series
}

let categories = generateData(550)
let data = categories.map((cate) => {
  let t = {}
  let type = types[0]
  let color = 'yellow'
  if (cate <= 100) {
    type = types[1]
  } else if (cate >= 101 && cate <= 200) {
    type = types[2]
    color = 'orange'
  } else if (cate >= 201 && cate <= 350) {
    type = types[3]
    color = '#A93F55'
  } else if (cate > 350) {
    type = types[4]
    color = 'red'
  }
  t['pk'] = faker.random.uuid()
  t['name'] = `${faker.lorem.slug()}.pdf`
  t['type'] = type
  t['color'] = color
  t['value'] = faker.random.number()
  return t
})
// data.reverse()
export default {
  name: 'HeatMapDocumentDocketEntryPortrait',
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
          enabled: false,
        },
        plotOptions: {
          heatmap: {
            radius: 30,
            enableShades: false,
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

<style scoped lang="scss">
.list_circle {
  .item_circle {
    /*border: solid 1px red;*/
  }
}
</style>
