<template>
  <v-container fluid>
    <v-card flat>
      <v-card-text>
        <div class="d-flex align-start flex-wrap">
          <div style="max-width: 300px;" class="px-2">
            <v-autocomplete
              multiple
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
          <div style="max-width: 300px;" class="px-2">
            <v-autocomplete
              multiple
              auto-select-first
              :items="projects"
              hide-details
              small-chips
              dense
              outlined
              label="Groups"
              item-text="name"
              item-value="name"
            />
          </div>
          <div style="max-width: 300px;" class="px-2">
            <v-autocomplete
              multiple
              auto-select-first
              :items="projects"
              hide-details
              small-chips
              dense
              outlined
              label="Users"
              item-text="name"
              item-value="name"
            />
          </div>
          <div style="max-width: 300px;" class="px-2">
            <v-autocomplete
              multiple
              auto-select-first
              :items="projects"
              hide-details
              small-chips
              dense
              outlined
              label="Filters"
              item-text="name"
              item-value="name"
            />
          </div>
        </div>
        <div class="mb-4"></div>

        <div class="d-flex">
          <div class="px-2">
            <v-autocomplete
              v-model="groupBy"
              :items="groupTypes"
              hide-details
              dense
              outlined
              label="Date by"
              item-text="text"
              item-value="value"
            />
          </div>
          <div class="px-2">
            <ChooseDateUserWorkLogPicker
              placeholder="From"
              v-model="startDate"
            />
          </div>
          <div class="px-2">
            <ChooseDateUserWorkLogPicker placeholder="To" v-model="endDate" />
          </div>
          <div class="px-2">
            <v-autocomplete
              v-model="groupBy"
              :items="groupTypes"
              hide-details
              dense
              outlined
              label="Display by"
              item-text="text"
              item-value="value"
            />
          </div>
          <div class="px-2">
            <v-text-field
              type="number"
              label="Working Hours"
              hide-details
              outlined
              dense
            />
          </div>
          <div class="px-2">
            <v-btn
              color="primary"
              :loading="pending"
              @click="applyFilter"
              depressed
              class="text-capitalize"
            >
              Generate TimeSheet
            </v-btn>
          </div>
          <!--<div class="px-2">
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
            >Current {{ item }}
            </v-btn>
          </div>-->
        </div>
      </v-card-text>
    </v-card>
    <div class="mb-4"></div>
  </v-container>
</template>

<script>
import faker from 'faker'
import dateTime from '../../../../../../../mixins/mx_dateTime'
import ChooseDateUserWorkLogPicker from '../user-worklog/ChooseDateUserWorkLogPicker'

export default {
  name: 'TimeTrackingAdminMode',
  components: { ChooseDateUserWorkLogPicker },
  mixins: [dateTime],
  data() {
    return {
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
      startDate: '2019-01-12',
      endDate: '2020-02-12',
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
      gridStartDate: '2019-01-12',
      gridEndDate: '2020-02-12',
      gridGroupBy: 'week',
      pending: false,
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
