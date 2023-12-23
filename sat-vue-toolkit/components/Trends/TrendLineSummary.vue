<template>
  <v-card width="500px" flat>
    <div class="d-flex">
      <div style="flex: 5">
        <p class="caption font-weight-bold">Court of Appeals for Eleventh</p>
        <div class="d-flex align-center mb-4">
          <p class="ma-0 caption">
            % Change
          </p>
          <div class="mx-2"></div>
          <v-icon color="green" small>mdi-arrow-up-bold</v-icon>
          <div class="label-symbol-trend-cell up">+36%</div>
        </div>
        <div>
          <apexchart type="line"
                     :options="chartOptions1"
                     :series="series1"></apexchart>
        </div>
        <div>
          <apexchart type="bar"
                     :options="chartOptions5"
                     :series="series5"></apexchart>
        </div>
      </div>
      <div style="flex: 5">
        <table class="table-trend-tooltip w-100">
          <thead>
            <tr>
              <td class="caption">#</td>
              <td class="caption">Q1/2020</td>
            </tr>
          </thead>
          <tbody>
          <template v-for="m in months">
            <tr>
              <td class="caption">
                {{m}}
              </td>
              <td class="caption">
                <div class="d-flex align-center">
                  <div class="table-cell-trend">
                    <v-chip color="teal" small dark>
                      500
                    </v-chip>
                  </div>
                  <div class="table-cell-trend">
                    <v-icon small color="green">mdi-arrow-up-bold</v-icon>
                  </div>
                  <div class="table-cell-trend">
                    <div class="label-symbol-trend-cell up">+36%</div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </v-card>
</template>

<script>
  import VueApexCharts from "vue-apexcharts"
  export default {
    name: "TrendLineSummary",
    props: {
      percent: {
        type: Number,
        default: () => 85
      },
      months: {
        type: Array,
        default: () => ['Jan', 'Feb', 'Mar']
      }
    },
    components: {
      apexchart: VueApexCharts
    },
    data() {
      return {
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
              // enabled: true
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
              // enabled: true
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
    }
  }
</script>

<style scoped lang="scss">
  .table-trend-tooltip {
    border-spacing: 0;
    border-top: solid 1px;
    border-left: solid 1px;
    border-color: rgba(0,0,0,0.05);
    tr {
      td {
        border-right: solid 1px;
        border-bottom: solid 1px;
        padding: 5px;
        .table-cell-trend {
          flex: 33;
          /*border-right: solid 1px;*/
          border-color: inherit;
          /*text-align: center;*/

        }
      }
    }
    tr {
      td {
        border-color: inherit;
      }
    }
  }
  .theme--dark {
    .table-trend-tooltip {
      border-color: rgba(255,255,255,0.05);
    }
  }
</style>
