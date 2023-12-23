<template>
  <v-card>
    <v-row no-gutters>
      <v-row no-gutters>
        <v-col cols="4">
          <CardTotalOfCharts
            @getYear="getYear"
            :totalChartOfCard="dataSeriesPie.totalChartOfCard"
          />
        </v-col>
        <v-col cols="8">
          <v-row no-gutters>
            <v-select
              v-model="nameClient[0]"
              :items="nameClient"
              item-text="name"
              item-value="id"
              label="Select Client"
              persistent-hint
              return-object
              class="select"
              @change="selectClient"
            ></v-select>
            <LineChart
              idLineChart="billingSumaryLineChart"
              title="Received"
              :colorChart="colorLineChart"
              :arrxAxis="arrxAxis"
              :dataSeries="dataSeriesLine"
              class="line-chart mt-5"
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters class="justify-space-between align-center">
        <v-col cols="3">
          <PieChart
            v-if="dataSeriesPie.resultToal.length > 0"
            idPieChart="billingSumaryPieChart"
            class="pie-Chart"
            title="Structure"
            :dataPieChart="dataSeriesPie.resultToal"
            :colorPieChart="colorPieChart"
          />
        </v-col>
        <v-col cols="9" class="pa-2">
          <BarChart
            idBarChart="billingSumaryBarChart"
            title="Invoiced vs Expense"
            :arrxAxis="arrxAxis"
            :dataSeries="dataSeriesBar"
            :colorChart="colorBarChart"
            :dataLegend="dataLegendBar"
            class="bar-chart"
          />
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import LineChart from "../../ht_components/chart/Line";
import BarChart from "../../ht_components/chart/BarChart";
import PieChart from "../../ht_components/chart/PieChart";
import CardTotalOfCharts from "../../ht_components/cards/CardTotalOfCharts";
export default {
  components: {
    BarChart,
    PieChart,
    LineChart,
    CardTotalOfCharts
  },
  data() {
    return {
      colorPieChart: ["#2B65F0", "#26C9A8", "#FFDB5C"],
      colorLineChart: ["#6FBAE1"],
      colorBarChart: ["#2B65F0", "#26C9A8"],
      dataLegendBar: ["Invoiced", "Expense"],
      select: { id: 0, name: "All Client" },
      see: "All Client",
      currentYears: new Date().getFullYear()
    };
  },
  computed: {
    ...mapGetters("ht_store/workspace/billing/summary", ["dataChartOfSummary"]),
    nameClient() {
      var arrUser = this.dataChartOfSummary.map(x => x.user);
      var result = [this.select, ...arrUser];
      return result;
    },

    //**Config Of Chart */
    arrxAxis() {
      return Array.apply(0, Array(12)).map((_, i) => {
        return moment()
          .month(i)
          .format("MMM");
      });
    },

    //**Return value of  client */
    arrOfClient() {
      if (this.see === "All Client") {
        return this.dataChartOfSummary.filter(item => {
          return (
            item.years &&
            item.years
              .toLowerCase()
              .includes(`${this.currentYears}`.toLowerCase())
          );
        });
      } else {
        return this.dataChartOfSummary.filter(item => {
          return (
            item.years &&
            item.years
              .toLowerCase()
              .includes(`${this.currentYears}`.toLowerCase()) &&
            item.name.toLowerCase().includes(this.see.toLowerCase())
          );
        });
      }
    },

    //**Data of Pie Chart */
    dataSeriesPie() {
      if (this.see === "All Client") {
        var pie = this.arrOfClient.map(e => e.dataStructurePie);
        var total = {};
        pie.map(b => {
          b.map(x => {
            if (total[x.name]) {
              total[x.name] += x.value;
            } else {
              total[x.name] = x.value;
            }
          });
        });
        var resultToal = [
          {
            name: "Invoiced",
            value: total.Invoiced,
            color: "#2B65F0"
          },
          {
            name: "Collected",
            value: total.Collected,
            color: "#26C9A8"
          },
          {
            name: "Outstanding",
            value: total.Outstanding,
            color: "#FFDB5C"
          }
        ];
        const totalChartOfCard = {
          outstanding:
            total.Outstanding &&
            total.Outstanding.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            }),
          collected:
            total.Collected &&
            total.Collected.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            }),
          countUser: this.arrOfClient.length
        };
        return { resultToal, totalChartOfCard };
      } else {
        const resultToal =
          this.arrOfClient.length !== 0
            ? this.arrOfClient[0].dataStructurePie
            : [];

        const totalChartOfCard = {
          outstanding:
            resultToal.length !== 0
              ? resultToal[2].value &&
                resultToal[2].value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD"
                })
              : 0,
          collected:
            resultToal.length !== 0
              ? resultToal[1].value &&
                resultToal[1].value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD"
                })
              : 0,
          countUser: this.arrOfClient.length
        };

        return { resultToal, totalChartOfCard };
      }
    },
    //**Data of Line Chart */
    dataSeriesLine() {
      if (this.see === "All Client") {
        var line = this.arrOfClient.map(e => e.dataLineChart);
        var total = line.reduce((prev, curr) => {
          curr.forEach((d, i) => {
            prev[i] = (prev[i] || 0) + d;
          });
          return prev;
        }, []);
        var resultTotal = [
          {
            data: total,
            type: "line",
            areaStyle: {},
            smooth: true
          }
        ];
        return resultTotal;
      } else {
        return [
          {
            data:
              this.arrOfClient.length !== 0
                ? this.arrOfClient[0].dataLineChart
                : null,
            type: "line",
            areaStyle: {},
            smooth: true
          }
        ];
      }
    },
    //**Data of Bar Chart */
    dataSeriesBar() {
      if (this.see === "All Client") {
        //dataExpense
        var dataExpense = this.arrOfClient.map(e => e.dataExpense);
        var totalExpense = dataExpense.reduce((prev, curr) => {
          curr.forEach((d, i) => {
            prev[i] = (prev[i] || 0) + d;
          });
          return prev;
        }, []);
        //dataInvoiced
        var dataInvoiced = this.arrOfClient.map(e => e.dataInvoiced);
        var totalInvoiced = dataInvoiced.reduce((prev, curr) => {
          curr.forEach((d, i) => {
            prev[i] = (prev[i] || 0) + d;
          });
          return prev;
        }, []);

        var resultTotal = [
          {
            name: "Invoiced",
            type: "bar",
            barGap: 0,
            data: totalInvoiced
          },
          {
            name: "Expense",
            type: "bar",
            data: totalExpense
          }
        ];
        return resultTotal;
      } else {
        return [
          {
            name: "Invoiced",
            type: "bar",
            barGap: 0,
            data:
              this.arrOfClient.length !== 0
                ? this.arrOfClient[0].dataInvoiced
                : null
          },
          {
            name: "Expense",
            type: "bar",
            data:
              this.arrOfClient.length !== 0
                ? this.arrOfClient[0].dataExpense
                : null
          }
        ];
      }
    }
  },
  methods: {
    ...mapActions("ht_store/workspace/billing/summary", ["getDataChartSummary"]),
    ...mapActions("ht_store/workspace/client", ["getDataClientRequest"]),
    getYear(e) {
      this.currentYears = e.state;
    },
    selectClient(e) {
      this.see = e.name;
    }
  },
  mounted() {
    this.getDataChartSummary();
    this.getDataClientRequest();
  }
};
</script>
<style scoped>
.bar-chart {
  width: 75%;
  height: 450px;
  margin-left: 10%;
}
.line-chart {
  width: 83%;
  height: 450px;
}
.pie-Chart {
  height: 300px;
}
.select {
  max-width: 25%;
  position: absolute;
  right: 25px;
  top: 0px;
}
</style>
