<template>
  <div>
    <div class="mb-4"></div>
    <!--    <TreeTableTaskBoardWorkLog :headers="headersItem" :desserts="desserts" />-->
    <GanttGridTaskBoard />
  </div>
</template>

<script>
import dateTime from '../../../../../../../mixins/mx_dateTime'
import _ from 'lodash'
import faker from 'faker'
import TreeTableTaskBoardWorkLog from './TreeTableTaskBoardWorkLog'
import GanttGridTaskBoard from './GanttGridTaskBoard'

let dummyData = 5
export default {
  name: 'TimeTrackingTaskBoardWorkLogViewGrid',
  components: { GanttGridTaskBoard, TreeTableTaskBoardWorkLog },
  mixins: [dateTime],
  data() {
    return {}
  },
  props: {
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    type: {
      type: String,
      default: 'week' // month | day | week
    }
  },
  computed: {
    headersItem() {
      return [
        {
          label: 'Taskboard',
          prop: 'name',
          width: '200px'
        },
        {
          label: 'Project/Completion Percentage',
          prop: 'summary_percent',
          width: '200px',
          type: 'template',
          template: 'summary_percent'
        },
        {
          label: 'Total',
          prop: 'summary_total',
          type: 'template',
          template: 'summary_total'
        },
        ...this.uniqTimes()
      ]
    },
    desserts() {
      return this.genericDesserts()
    },
    entries() {
      return [1, 2, 3, 4, 5].map((i) => ({
        text: faker.lorem.slug(),
        word: faker.lorem.word(),
        words: faker.lorem.words(),
        sentence: faker.lorem.sentence(),
        url: faker.internet.url(),
        hours: faker.random.number()
      }))
    }
  },
  methods: {
    uniqTimes() {
      return _.uniqBy(
        this.$$enumerateDaysBetweenDates({
          startDate: this.startDate,
          endDate: this.endDate
        }).map((i) => {
          // headersItem
          let _val = this.strHead(i)
          return {
            text: _val,
            label: _val,
            value: _val,
            prop: _val,
            minWidth: '150px'
            // type: "template",
            // template: `cell-${_val}`,
          }
        })
      )
    },
    strHead(objDate) {
      switch (this.type) {
        case 'week':
          try {
            // return `week ${objDate.week}, ${objDate.year}`
            return `week ${objDate.date.format('w, YYYY')}`
          } catch (e) {
            throw e.message
          }
        case 'day':
          try {
            return `${objDate.date.format('dd, DD MMMM, YYYY')}`
          } catch (e) {
            throw e.message
          }
        default:
          try {
            // MMMM
            return `${objDate.date.format('MMMM, YYYY')}`
          } catch (e) {
            throw e.message
          }
      }
    },
    genericDesserts() {
      let data = [],
        data2 = []
      for (let i = 0; i < dummyData; i++) {
        let taskboard = {},
          taskboard2 = {}
        this.uniqTimes().forEach((i, k) => {
          taskboard['summary_percent'] = Math.floor(Math.random() * 100)
          taskboard2['summary_percent'] = Math.floor(Math.random() * 100)
          taskboard['summary_total'] = faker.random.number()
          taskboard2['summary_total'] = faker.random.number()
          taskboard['name'] = faker.name.findName()
          taskboard2['name'] = faker.name.findName()
          taskboard['leaf'] = true
          taskboard2['leaf'] = true
          taskboard[i.value] = faker.random.number()
          taskboard2[i.value] = faker.random.number()
        })
        data.push(taskboard)
        data2.push(taskboard2)
      }
      return [
        {
          name: '# ' + faker.name.findName(),
          summary_percent: 'Troubled Art',
          summary_total: 100,
          children: [
            {
              name: {
                text: '# ' + faker.name.findName()
              },
              // summary_percent: "Enterprise Resource Planning",
              children: [...data]
            }
          ]
        },
        {
          name: '# ' + faker.name.findName(),
          summary_percent: 'Enterprise Resource Planning',
          summary_total: 100,
          children: [
            {
              name: {
                text: '# ' + faker.name.findName()
              },
              // summary_percent: "Enterprise Resource Planning",
              children: [...data2]
            }
          ]
        }
      ]
    },
    clickCellItem() {
      console.log(1)
    }
  }
}
</script>

<style scoped></style>
