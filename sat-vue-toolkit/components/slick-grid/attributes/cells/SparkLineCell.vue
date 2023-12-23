<template>
  <div class="d-flex align-center fill-height flex-grow-1 px-0" :title="$$attribute.label">
    <div class="fill-height w-100">
      <!--<v-sparkline :value="v" color="teal"
                   :fill="fill"
                   :line-width="1"
                   :padding="0"
                   smooth
                   auto-draw
      ></v-sparkline>-->
      <div class="d-flex fill-height">
        <div class="d-flex align-center justify-center">
          <apexchart type="line" height="35" width="110" :options="chartOptions1" :series="series1"></apexchart>
        </div>
        <v-divider vertical class="mx-1 trend-border"/>
        <div class="d-flex align-center justify-center">
          <apexchart type="bar" height="35" width="110" :options="chartOptions5" :series="series5"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import mxAttributeItem from "@/sat-vue-toolkit/components/slick-grid/attributes/mixins/mxAttributeItem"
  import VueApexCharts from "vue-apexcharts"
  export default {
    name: "SparkLineCell",
    components: {
      apexchart: VueApexCharts
    },
    data () {
      return {
        val: {},
        fill: true,
        gradient: ["#f72047", "#ffd200", "#1feaea"],
        series1: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
        series5: [{
          data: [25, -66, 41, -89, 63, -25, 44, 12, 36, 9, 54]
        }],
        chartOptions1: {
          chart: {
            type: "line",
            width: 100,
            height: 35,
            sparkline: {
              enabled: true
            }
          },
          tooltip: {
            fixed: {
              enabled: false
            },
            x: {
              show: false
            },
            y: {
              title: {
                formatter: function (seriesName) {
                  return ""
                }
              }
            },
            marker: {
              show: false
            }
          }
        },
        chartOptions5: {
          chart: {
            type: "bar",
            width: 100,
            height: 35,
            sparkline: {
              enabled: true
            }
          },
          plotOptions: {
            bar: {
              columnWidth: "80%",
              colors: {
                ranges: [{
                  from: -100,
                  to: -1,
                  color: '#F15B46'
                }]
              },
            }
          },
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          xaxis: {
            crosshairs: {
              width: 1
            }
          },
          tooltip: {
            fixed: {
              enabled: false
            },
            x: {
              show: false,
              color: 'red'
            },
            y: {
              title: {
                formatter: function (seriesName) {
                  return ""
                }
              }
            },
            marker: {
              show: false
            }
          }
        }
      }
    },
    mixins: [mxAttributeItem],
    computed: {},
    watch: {
      value: {
        immediate: true,
        handler (v) {
          this.val = v
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .theme--dark {
    .trend-border {
      border-color: rgba(255,255,255, 0.05);
    }
  }
  .trend-border {
    border-color: rgba(0,0,0,0.05);
  }

</style>
