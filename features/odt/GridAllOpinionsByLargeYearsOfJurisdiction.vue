<template>
  <div>
    <SlickGrid
      :items="items"
      no-query-params
      disabled-add-new-row
      :height="height"
      disabled-add-new-column
      disabled-bookmark-row
      :attributes="reduceAttributes"
      no-link-detail
    >
      <template v-slot:right-header> </template>
    </SlickGrid>
  </div>
</template>

<script>
import SlickGrid from '@/sat-vue-toolkit/components/slick-grid/SlickGrid.vue'
import { ATTRIBUTE_FIELDS } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'
import moment from 'moment'
import { ROUTES } from '@/features/odt/helpers/odt.json'
// window.moment = moment
const generatorYears = (total = 1, isBeforeYear = false) => {
  const years = [],
    currentYear = new Date().getFullYear()
  let i = 0
  while (i <= total) {
    let year = currentYear - i
    years.push(year)
    i++
  }
  let before_year = isBeforeYear && `Before ${currentYear - i + 1}`
  return (isBeforeYear && [...years, before_year]) || years
}

const generatorMonths = (total = 12) => {
  let m = [],
    monthsShort = moment()._locale._monthsShort
  if (total < 0 || total > monthsShort.length) {
    total = monthsShort.length
  } else if (total === 0) {
    total = 1
  }
  for (let i = 0; i < total; i++) {
    let month = monthsShort[i]
    let t = {
      type: ATTRIBUTE_FIELDS.HEATMAP.TYPE,
      name: `month_${i}`,
      label: month,
      width: 90,
      enabledTrendValue: false,
    }
    m.push(t)
  }
  return m
}
const colorsRange = [
  '64B5F6',
  '42A5F5',
  '1E88E5',
  '1976D2',
  '1565C0',
  '0D47A1',
  '82B1FF',
  '448AFF',
  '2979FF',
  '2962FF',
]
const getColorsRange = (range) => {
  let r1 = range > 0 && range <= 10
  let r2 = range > 10 && range <= 20
  let r3 = range > 20 && range <= 30
  let r4 = range > 30 && range <= 40
  let r5 = range > 40 && range <= 50
  let r6 = range > 50 && range <= 60
  let r7 = range > 60 && range <= 70
  let r8 = range > 70 && range <= 80
  let r9 = range > 80 && range <= 90
  let r = r1
    ? 0
    : r2
    ? 1
    : r3
    ? 2
    : r4
    ? 3
    : r5
    ? 4
    : r6
    ? 5
    : r7
    ? 6
    : r8
    ? 7
    : r9
    ? 8
    : 9
  return colorsRange[r]
}
let {
  AnnualDocketLoads,
  AnnualDocketTrends,
  AnnualOpinionLoads,
  AnnualOpinionTrends,
} = ROUTES.LawSchool
let { JurisdictionDetailMonthlyTrends } = ROUTES.Jurisdiction
function isTrendsValue(_by) {
  let trends = [
    JurisdictionDetailMonthlyTrends.path,
    AnnualOpinionTrends.path,
    AnnualDocketTrends.path,
  ]
  return trends.includes(_by)
}
export default {
  name: 'GridAllOpinionsByLargeYearsOfJurisdiction',
  components: { SlickGrid },
  props: {
    height: {
      type: String,
      default: () => `${80}vh`,
    },
    showByMonth: {
      type: Boolean,
      default: () => false,
    },
    rootPathLink: {
      type: String,
      default: () => ``,
    },
  },
  computed: {
    items() {
      let years = [...generatorYears(5, true)]
      let months = [...generatorMonths()]
      let rows = years.map((year) => {
        let row = {}
        row['year'] = year
        months.forEach((m, index) => {
          let v = Math.floor(Math.random() * 100) + 1
          let color = getColorsRange(v)
          row[m.name] = {
            color: color,
            label: v,
            percent: v,
            title: v,
          }
        })
        return row
      })
      return {
        '': {
          count: rows.length,
          results: [...rows],
        },
      }
    },
    columnsMonth() {
      return [...generatorMonths()]
    },
    rootOpinionsByJurisdiction() {
      let {
        $route: {
          params: { jurisdiction },
        },
        rootPathLink,
      } = this
      if (rootPathLink) return rootPathLink
      return `/odt/jurisdiction/${jurisdiction}/opinions/year`
    },
    attributes() {
      let { columnsMonth, rootOpinionsByJurisdiction } = this

      return [
        {
          name: 'year',
          type: ATTRIBUTE_FIELDS.LINK_TEXT.TYPE,
          pathLink: function () {
            let typeMm = this.year
            return `${rootOpinionsByJurisdiction}/${typeMm}`
          },
        },
        {
          name: 'trendline',
          type: ATTRIBUTE_FIELDS.SPARK_LINE.TYPE,
          width: 250,
        },
        ...columnsMonth,
      ]
    },
    reduceAttributes() {
      let {
        attributes,
        $route: { query },
      } = this

      let t = [...attributes]
      let _by = query['by'],
        enabledTrendValue = isTrendsValue(_by)
      t = [
        ...t.map((attribute) => {
          let temp = { ...attribute }
          temp['enabledTrendValue'] = enabledTrendValue
          return temp
        }),
      ]
      return t
    },
  },
}
</script>

<style scoped></style>
