<template>
  <div class="d-flex">
    <div>
      <apexchart type="line" height="35" width="100" :options="chartOptions1" :series="series1"></apexchart>
    </div>
     <div>
       <apexchart type="bar" height="35" width="100" :options="chartOptions5" :series="series5"></apexchart>
     </div>
  </div>
</template>

<script>
  import VueApexCharts from "vue-apexcharts"
  const randomizeArray = function (arg) {
    let array = arg.slice();
    let currentIndex = array.length,
      temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

  export default {
    name: "TrendBar",
    components: {
      apexchart: VueApexCharts
    },
    data() {
      return {

        series: [{
          data: randomizeArray(sparklineData)
        }],
        chartOptions: {
          chart: {
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'straight'
          },
          fill: {
            opacity: 0.3,
          },
          yaxis: {
            min: 0
          },
          colors: ['#DCE6EC'],
          title: {
            text: '$424,652',
            offsetX: 0,
            style: {
              fontSize: '24px',
            }
          },
          subtitle: {
            text: 'Sales',
            offsetX: 0,
            style: {
              fontSize: '14px',
            }
          }
        },

        seriesSpark2: [{
          data: randomizeArray(sparklineData)
        }],
        chartOptionsSpark2: {
          chart: {
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'straight'
          },
          fill: {
            opacity: 0.3,
          },
          yaxis: {
            min: 0
          },
          colors: ['#DCE6EC'],
          title: {
            text: '$235,312',
            offsetX: 0,
            style: {
              fontSize: '24px',
            }
          },
          subtitle: {
            text: 'Expenses',
            offsetX: 0,
            style: {
              fontSize: '14px',
            }
          }
        },

        seriesSpark3: [{
          data: randomizeArray(sparklineData)
        }],
        chartOptionsSpark3: {
          chart: {
            type: 'area',
            height: 160,
            sparkline: {
              enabled: true
            },
          },
          stroke: {
            curve: 'straight'
          },
          fill: {
            opacity: 0.3
          },
          xaxis: {
            crosshairs: {
              width: 1
            },
          },
          yaxis: {
            min: 0
          },
          title: {
            text: '$135,965',
            offsetX: 0,
            style: {
              fontSize: '24px',
            }
          },
          subtitle: {
            text: 'Profits',
            offsetX: 0,
            style: {
              fontSize: '14px',
            }
          }
        },

        series1: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
        chartOptions1: {
          chart: {
            type: 'line',
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
                  return ''
                }
              }
            },
            marker: {
              show: false
            }
          }
        },

        series2: [{
          data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
        }],
        chartOptions2: {
          chart: {
            type: 'line',
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
                  return ''
                }
              }
            },
            marker: {
              show: false
            }
          }
        },

        series3: [43, 32, 12, 9],
        chartOptions3: {
          chart: {
            type: 'pie',
            width: 40,
            height: 40,
            sparkline: {
              enabled: true
            }
          },
          stroke: {
            width: 1
          },
          tooltip: {
            fixed: {
              enabled: false
            },
          }
        },

        series4: [43, 32, 12, 9],
        chartOptions4: {
          chart: {
            type: 'donut',
            width: 40,
            height: 40,
            sparkline: {
              enabled: true
            }
          },
          stroke: {
            width: 1
          },
          tooltip: {
            fixed: {
              enabled: false
            },
          }
        },

        series5: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
        chartOptions5: {
          chart: {
            type: 'bar',
            width: 100,
            height: 35,
            sparkline: {
              enabled: true
            }
          },
          plotOptions: {
            bar: {
              columnWidth: '80%'
            }
          },
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          xaxis: {
            crosshairs: {
              width: 1
            },
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
                  return ''
                }
              }
            },
            marker: {
              show: false
            }
          }
        },

        series6: [{
          data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
        }],
        chartOptions6: {
          chart: {
            type: 'bar',
            width: 100,
            height: 35,
            sparkline: {
              enabled: true
            }
          },
          plotOptions: {
            bar: {
              columnWidth: '80%'
            }
          },
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          xaxis: {
            crosshairs: {
              width: 1
            },
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
                  return ''
                }
              }
            },
            marker: {
              show: false
            }
          }
        },

        series7: [45],
        chartOptions7: {
          chart: {
            type: 'radialBar',
            width: 50,
            height: 50,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: '50%'
              },
              track: {
                margin: 0
              },
              dataLabels: {
                show: false
              }
            }
          }
        },

        series8: [53, 67],
        chartOptions8: {
          chart: {
            type: 'radialBar',
            width: 40,
            height: 40,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: '50%'
              },
              track: {
                margin: 1
              },
              dataLabels: {
                show: false
              }
            }
          }
        },


      }
    }
  }
</script>

<style scoped>

</style>
