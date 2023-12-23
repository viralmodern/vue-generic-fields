<template>
  <div>
    <v-card flat>
      <v-card-text>
        <div class="d-flex align-center">
          <div>
            <v-autocomplete
              auto-select-first
              :items="projects"
              hide-details
              small-chips
              dense
              outlined
              label="Projects"
              item-text="name"
              item-value="name"
            />
          </div>
          <div class="px-4">
            <ChooseDateUserWorkLogPicker
              placeholder="Start Date"
              v-model="startDate"
            />
          </div>
          <div class="px-4">
            <ChooseDateUserWorkLogPicker
              placeholder="End Date"
              v-model="endDate"
              :min="startDate"
            />
          </div>
          <div class="px-4">
            <v-autocomplete
              v-model="groupBy"
              :items="groupTypes"
              auto-select-first
              hide-details
              dense
              outlined
              label="Group by"
              item-text="text"
              item-value="value"
            />
          </div>
          <v-btn
            color="primary"
            :loading="pending"
            @click="applyFilter"
            depressed
            class="text-capitalize"
            >Apply</v-btn
          >
        </div>
        <div class="mb-4"></div>
        <div>
          <v-btn
            :input-value="currentTypeDate === item"
            :disabled="pending"
            active-class="primary"
            v-for="(item, index) in ['week', 'year', 'month']"
            @click="applyFilterCurrent(item)"
            :key="index"
            value="week"
            depressed
            class="text-capitalize font-weight-light mr-4"
            >Current {{ item }}</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <div class="mb-4"></div>
    <v-card flat>
      <TimeTrackingUserWorkLogViewGrid
        :type="gridGroupBy"
        :start-date="gridStartDate"
        :end-date="gridEndDate"
      />
    </v-card>
  </div>
</template>

<script>
import faker from 'faker'
import ChooseDateUserWorkLogPicker from './ChooseDateUserWorkLogPicker'
import TimeTrackingUserWorkLogViewGrid from './TimeTrackingUserWorkLogViewGrid'
import dateTime from '../../../../../../../mixins/mx_dateTime'
export default {
  name: 'TimeTrackingUserWorklogViewBase',
  components: { TimeTrackingUserWorkLogViewGrid, ChooseDateUserWorkLogPicker },
  mixins: [dateTime],
  data() {
    return {
      pending: false,
      projects: [
        {
          name: faker.name.findName()
        },
        {
          name: faker.name.findName()
        },
        {
          name: faker.name.findName()
        },
        {
          name: faker.name.findName()
        },
        {
          name: faker.name.findName()
        }
      ],
      groupBy: 'week', // week | month | day
      groupTypes: [
        {
          text: 'Week',
          value: 'week'
        },
        {
          text: 'Month',
          value: 'month'
        },
        {
          text: 'Day',
          value: 'day'
        }
      ],
      startDate: '2019-01-12',
      endDate: '2020-02-12',

      gridStartDate: '2019-01-12',
      gridEndDate: '2020-02-12',
      gridGroupBy: 'week',

      currentTypeDate: '' // week | month | year
    }
  },
  methods: {
    async applyFilter() {
      this.pending = true
      this.currentTypeDate = ''
      await (() => new Promise((resolve) => setTimeout(resolve, 2000)))()
      this.gridStartDate = this.startDate
      this.gridEndDate = this.endDate
      this.gridGroupBy = this.groupBy
      this.pending = false
    },
    async applyFilterCurrent(type) {
      this.pending = true
      await (() => new Promise((resolve) => setTimeout(resolve, 2000)))()
      this.currentTypeDate = type
      this.gridGroupBy = 'day'
      this.groupBy = 'day'

      const { startDate, endDate } = this.$$startEndCurrentTypeDate({ type })

      this.gridStartDate = startDate
      this.startDate = startDate

      this.gridEndDate = endDate
      this.endDate = endDate

      this.gridGroupBy = 'day'
      console.log('$$startEndCurrentTypeDate', startDate, endDate)
      this.pending = false
    }
  }
}
</script>

<style scoped></style>
