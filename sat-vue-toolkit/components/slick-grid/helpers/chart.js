// import faker from 'faker'
export function $$resultsSunBurst (data, keyName) {
  try {
    let results = data.results.map(result => {
      let temp = { ...result }
      temp["name"] = result.name || result[keyName]
      temp["value"] = Math.floor(Math.random() * 500) + 20
      return temp
    })
    return {
      visualMap: {
        type: "continuous",
        min: 0,
        max: 10,
        inRange: {
          color: ["#2D5F73", "#538EA6", "#F2D1B3", "#F2B8A2", "#F28C8C"]
        }
      },
      series: {
        type: "sunburst",
        data: results,
        radius: [0, "90%"],
        label: {
          rotate: "radial"
        }
      }
    }
  } catch (e) {
    return data
  }
}

export function $$resultsParallel (data, keyName, group_by) {
  try {
    let nodes = [{ name: "Ungroup" }]
    let links = []
    group_by = group_by || "Ungroup"
    data.results.forEach(result => {
      let name = result.name || result[keyName]
      let link = {
        "source": group_by,
        "target": name.toString(),
        "value": Math.floor(Math.random() * 500) + 20
      }
      let node = { name }
      nodes.push(node)
      links.push(link)

    })
    return {
      /*title: {
        text: 'Parallel Diagram'
      },*/
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      series: [
        {
          type: "sankey",
          data: nodes,
          links: links,
          focusNodeAdjacency: true,
          levels: [
            {
              depth: 0,
              itemStyle: {
                color: "#fbb4ae"
              },
              lineStyle: {
                color: "source",
                opacity: 0.6
              }
            }, {
              depth: 1,
              itemStyle: {
                color: "#b3cde3"
              },
              lineStyle: {
                color: "source",
                opacity: 0.6
              }
            }, {
              depth: 2,
              itemStyle: {
                color: "#ccebc5"
              },
              lineStyle: {
                color: "source",
                opacity: 0.6
              }
            }, {
              depth: 3,
              itemStyle: {
                color: "#decbe4"
              },
              lineStyle: {
                color: "source",
                opacity: 0.6
              }
            }
          ],
          lineStyle: {
            curveness: 0.5
          }
        }
      ]
    }
  } catch (e) {
    return data
  }
}

export function $$resultsTreeMap (data, keyName) {
  try {
    let results = data.results.map(result => {
      let temp = { ...result }
      temp["name"] = result.name || result[keyName]
      temp["value"] = Math.floor(Math.random() * 500) + 20
      return temp
    })
    return {
      series: {
        type: "treemap",
        itemStyle: {
          normal: {
            borderColor: "black"
          }
        },
        data: results
      }
    }
  } catch (e) {
    return data
  }
}

const echarts = require("echarts")

function getVirtualData (year) {
  year = year || "2017"
  var date = +echarts.number.parseDate(year + "-01-01")
  var end = +echarts.number.parseDate((+year + 1) + "-01-01")
  var dayTime = 3600 * 24 * 1000
  var data = []
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime("yyyy-MM-dd", time),
      Math.floor(Math.random() * 1000)
    ])
  }
  return data
}

export function $$resultsHeadMap (data, keyName) {
  try {
    console.log("$$resultsHeadMap", getVirtualData(2017))
    return {
      tooltip: {
        position: "top",
        formatter: function (p) {
          let format = echarts.format.formatTime("yyyy-MM-dd", p.data[0])
          return format + ": " + p.data[1]
        }
      },
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        orient: "horizontal",
        left: "center",
        top: "top"
      },

      calendar: [{
        range: "2017",
        cellSize: ["auto", 20]
      },
        {
          top: 260,
          range: "2016",
          cellSize: ["auto", 20]
        },
        {
          top: 450,
          range: "2015",
          cellSize: ["auto", 20],
          right: 5
        }],

      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          data: getVirtualData(2017)
        }, {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 1,
          data: getVirtualData(2016)
        }, {
          type: "heatmap",
          coordinateSystem: 'calendar',
          calendarIndex: 2,
          data: getVirtualData(2015)
        }
      ]
    }
  } catch (e) {
    return data
  }
}
export function $$resultsStackBar (data, keyName) {
  try {
    let moment = require('moment')
    const totalDays = 31
    let m = moment()
    // a._locale._monthsShort
    let monthsShort = m._locale._monthsShort
    console.log("$$resultsStackBar", monthsShort)
    let series = [], source = [], type = 'bar';
    source = monthsShort.map(month => {
      let daysInMonth = moment(month, "MMM").daysInMonth()
      let value = []
      for (let i = 0; i < daysInMonth; i++) {
        let val = Math.floor(Math.random() * 100) + 1
        value.push(val)
      }
      return [month, ...value]
    })
    for (let i = 0; i < totalDays; i++) {
      let day = i + 1
      day = day >= 10 ? day : `0${day}`
      let name = `${day}` // D-MMM
      series.push({ type, name })
    }
    console.log('series', source, series)
    return {
      legend: {
        show: false
      },
      tooltip: {},
      dataset: {
        source: source
      },
      xAxis: {type: 'category'},
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
      }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: series
    }
  } catch (e) {
    return data
  }
}

