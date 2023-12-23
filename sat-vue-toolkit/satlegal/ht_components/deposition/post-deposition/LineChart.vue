<template>
  <div :id="`main${idChart}`" class="line-Chart"></div>
</template>

<script>
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/grid";
import "echarts/lib/component/toolbox";
export default {
  props: {
    idChart: Number,
    xAxisValue: Array,
    title: String,
    legend: Array,
    dataSeries: Array
  },
  data() {
    return {};
  },
  methods: {
    renderLineChart() {
      var myChart = echarts.init(
        document.getElementById(`main${this.idChart}`)
      );
      // var date = new Date();
      var option = (option = {
        title: {
          text: this.title,
          show: true,
          textStyle: {
            color: "rgba(0, 0, 0 , .87)",
            fontFamily: "sans-serif"
          }
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            axisPointer: {
              animation: true
            }
          },
          formatter(params) {
            var colorSpan = color =>
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
              color +
              '"></span>';
            let rez = `<p> Month: ${params[0].name}</p>`;
            params.forEach(item => {
              var xx =
                "<p>" +
                colorSpan(item.color) +
                " " +
                item.seriesName +
                ": " +
                item.data +
                "</p>";
              rez += xx;
            });

            return rez;
          }
        },
        legend: {
          data: this.legend
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            show: true,
            type: "category",
            boundaryGap: false,
            data: this.xAxisValue
          }
        ],
        yAxis: {
          show: true,
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(0, 0, 0 , .54)",
              type: "dashed"
            }
          },
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              show: true,
              color: "rgba(0, 0, 0 , .54)",
              type: "dashed"
            }
          }
        },
        axisLabel: {
          show: true
        },
        series: this.dataSeries
      });
      myChart.setOption(option);
    }
  },
  mounted() {
    this.renderLineChart();
  },
  watch: {
    dataSeries(val) {
      if (val) {
        this.renderLineChart();
      }
    }
  }
};
</script>
<style scoped>
.line-Chart {
  width: 100%;
  height: 500px;
}
</style>
