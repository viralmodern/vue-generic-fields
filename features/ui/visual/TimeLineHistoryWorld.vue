<template>
  <div>
    <div id="xxx"></div>
    <div id="timeline-history" class="svg-history"></div>
    <div class="bar-history"></div>
  </div>
</template>

<script>
// import * as d3 from 'd3'
// import * as d3 from "d3"
import moment from 'moment'

const scripts = {
  d3: 'https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.min.js',
}
// import file from "../timeline/dt"
// 5.16.0
let file =
  'https://static.observableusercontent.com/files/fcc0015cbe24eea265833239de543af33607f288cc9959f9ce4d0e2456b25dbaae5ff62a355704d879441905518bdbbeef0d13496346f63bfed61b07decbd0d3'
const width = 1200
const height = 500
const margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30,
}
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}
console.log(randomDate(new Date(1970, 0, 1), new Date()))

window.moment = moment
async function initChart() {
  let sorting = ''
  let data = await d3.csv(file, (d) => {
    return {
      ...d,
      start: +d.start,
      end: +d.end,
      date: randomDate(new Date(1970, 0, 1), new Date()),
    }
  })
  console.error('DATA', data)
  let formatDate1 = (d) => (d < 0 ? `${-d}BC` : `${d}AD`)
  let formatDate = (d) => {
    // console.error('formatDate', d)
    // d3.timeFormat('%H:%M:%S')
    // return  moment(d.date).format('YYYY-MM-DD')
    return d < 0 ? `${-d}BC` : `${d}AD`
  }

  let dataByTimeline = d3
    .nest()
    .key((d) => d.timeline)
    .entries(data)
  // let dataByTimeline = d3.group(data, d => d.timeline)

  let dataByRegion = d3
    .nest()
    .key((d) => d.region)
    .entries(data)
  // let dataByRegion = d3.group(data, d => d.region)

  let regions = d3
    .nest()
    .key((d) => d.region)
    .entries(data)
    .map((d) => d.key)
  // let regions = [...d3.group(data, d => d.region).keys()]

  let timelines = dataByTimeline.map((d) => d.key)

  let color = d3.scaleOrdinal(d3.schemeSet2).domain(regions)
  let x1 = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.start), d3.max(data, (d) => d.end)])
    .range([0, width - margin.left - margin.right])

  let x2 = d3
    .scaleTime()
    .range([0, width])
    .domain([d3.min(data, (d) => d.date), Date.now()])
  let x = x1
  // let x = x2
  let y = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([0, height - margin.bottom - margin.top])
    .padding(0.2)
  let transform = d3.zoomIdentity
  let zoom = d3
    .zoom()
    .scaleExtent([-width * 2, width * 2])
    .translateExtent([
      [-100, -100],
      [width * 2, height],
    ])
    .on('zoom', zoomed)

  function createTooltip(el) {
    el.style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('top', 0)
      .style('opacity', 0)
      .style('background', 'white')
      .style('border-radius', '5px')
      .style('box-shadow', '0 0 10px rgba(0,0,0,.25)')
      .style('padding', '10px')
      .style('line-height', '1.3')
      .style('font', '11px sans-serif')
  }

  function getRect(d) {
    const el = d3.select(this)
    const sx = x(d.start)
    const w = x(d.end) - x(d.start)
    const isLabelRight = sx > width / 2 ? sx + w < width : sx - w > 0
    el.style('cursor', 'pointer')
    el.append('rect')
      .attr('x', sx)
      .attr('height', y.bandwidth())
      .attr('width', w)
      .attr('fill', d.color)
    /*el
        .append("text")
        .text(d.civilization)
        .attr("x", isLabelRight ? sx - 5 : sx + w + 5)
        .attr("y", 2.5)
        .attr("fill", "black")
        .style("text-anchor", isLabelRight ? "end" : "start")
        .style("dominant-baseline", "hanging")*/
  }

  let axisBottom = d3.axisBottom(x).tickPadding(2).tickFormat(formatDate)
  let axisTop = d3.axisTop(x).tickPadding(2).tickFormat(formatDate)

  function getTooltipContent(d) {
    return `<b>${d.civilization}</b><br/><b style="color:${d.color.darker()}">${
      d.region
    }</b><br/>${formatDate(d.start)} - ${formatDate(d.end)}`
  }

  // create chart
  // function drawChart() {
  let filteredData
  if (sorting !== 'time') {
    filteredData = [].concat.apply(
      [],
      dataByRegion.map((d) => d.values)
    )
  } else {
    filteredData = data.sort((a, b) => a.start - b.start)
  }
  filteredData.forEach((d) => (d.color = d3.color(color(d.region))))
  const SVG = d3
    .select('.svg-history')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(zoom)
  // const svg = d3.select('svg').attr('width', width).attr('height', height);
  console.error('SVG', SVG)
  let parent = this
  if (!parent) {
    console.error('PARENT', this)
    // parent = document.createElement("div")
    parent = document.getElementById('timeline-history')
    // const SVG = d3.select(DOM.svg(width, height));

    const g = SVG.append('g').attr(
      'transform',
      (d, i) => `translate(${margin.left} ${margin.top})`
    )
    const groups = g
      .selectAll('g')
      .data(filteredData)
      .enter()
      .append('g')
      .attr('class', 'civ')

    const tooltip = d3.select(document.createElement('div')).call(createTooltip)

    const line = SVG.append('line')
      .attr('y1', margin.top - 10)
      .attr('y2', height - margin.bottom)
      .attr('stroke', 'rgba(0,0,0,0.2)')
      .style('pointer-events', 'none')

    groups.attr('transform', (d, i) => `translate(0 ${y(i)})`)

    groups
      .each(getRect)
      .on('mouseover', function (d) {
        d3.select(this).select('rect').attr('fill', d.color.darker())

        tooltip.style('opacity', 1).html(getTooltipContent(d))
      })
      .on('mouseleave', function (d) {
        d3.select(this).select('rect').attr('fill', d.color)
        tooltip.style('opacity', 0)
      })

    SVG.append('g')
      .attr(
        'transform',
        (d, i) => `translate(${margin.left} ${margin.top - 10})`
      )
      .call(axisTop)

    SVG.append('g')
      .attr(
        'transform',
        (d, i) => `translate(${margin.left} ${height - margin.bottom})`
      )
      .call(axisBottom)

    SVG.on('mousemove', function (d) {
      let [x, y] = d3.mouse(this)
      line.attr('transform', `translate(${x} 0)`)
      y += 20
      if (x > width / 2) {
        x -= 100
      }

      tooltip.style('left', x + 'px').style('top', y + 'px')
    })
    parent.appendChild(SVG.node())
    parent.appendChild(tooltip.node())
    parent.groups = groups
  } else {
    const civs = d3.selectAll('.civ')
    civs
      .data(filteredData, (d) => d.civilization)
      .transition()
      // .delay((d,i)=>i*10)
      .ease(d3.easeCubic)
      .attr('transform', (d, i) => `translate(0 ${y(i)})`)
  }
  function zoomed() {
    console.error(arguments)
    // view.attr("transform", d3.event.transform);
    // gX.call(axisBottom.scale(d3.event.transform.rescaleX(x)));
    // gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
    transform = d3.event.transform
  }
  return parent
  // }

  // drawChart()
}

export default {
  name: 'TimeLineHistoryWorld',
  async mounted() {
    await this.loadScripts()
    await initChart()
  },
  methods: {
    async loadScripts() {
      await this.$loadScript(scripts.d3)
      return Promise.resolve(1)
    },
  },
}
</script>

<style scoped lang="scss">
.svg-history {
  width: 1200px;
  height: 600px;
  border: solid 1px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
}
</style>
