<template>
  <v-card>
    <v-card-title>
      <v-btn icon small color="grey darken-2" @click="prev" title="Prev">
        <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon small color="grey darken-2" @click="next" title="Next">
        <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
      <div class="mx-2">
        <v-btn small depressed @click="" title="Next">
          Today
        </v-btn>
      </div>

      <v-spacer />
      <span class="text-body-1">{{ today }}</span>
      <v-spacer />
      <v-menu bottom right>
        <template v-slot:activator="{ on }">
          <v-btn small outlined color="grey darken-2" v-on="on">
            <span>{{ typeToLabel[type] }}</span>
            <!--            <span>{{ typeToLabel }}</span>-->
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="type">
            <v-list-item value="day">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item value="week">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item value="month">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
            <v-list-item value="custom-weekly">
              <v-list-item-title>Timeline Week</v-list-item-title>
            </v-list-item>
            <v-list-item value="custom-daily">
              <v-list-item-title>Timeline Day</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <v-list-item>
            <v-list-item-title>Timeline Day</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Timeline Year</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn class="ml-4" small icon depressed @click="" title="Setting">
        <!--        <v-icon small>mdi-settings</v-icon>-->
        <img width="20" src="~/assets/img/icons8-settings.svg" />
      </v-btn>
    </v-card-title>
    <v-sheet height="400">
      <v-calendar
        ref="calendar"
        v-model="focus"
        :now="today"
        :value="today"
        :events="events"
        :min-weeks="2"
        :max-days="100"
        color="primary"
        :type="type"
      ></v-calendar>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: 'CalendarEvents',
  data: () => ({
    today: '2019-01-08',
    events: [
      {
        name: 'Weekly Meeting',
        start: '2019-01-07 09:00',
        end: '2019-01-07 10:00',
      },
      {
        name: "Thomas' Birthday",
        start: '2019-01-10',
      },
      {
        name: 'Mash Potatoes',
        start: '2019-01-09 12:30',
        end: '2019-01-09 15:30',
      },
    ],
    type: 'month',
    focus: '',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      'custom-daily': 'Timeline Day',
      'custom-weekly': 'Timeline Week',
      'timeline-year': 'Timeline Year',
      'list-week': 'List Week',
    },
  }),
  mounted() {
    this.$refs.calendar.scrollToTime('08:00')
  },
  methods: {
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    setToday() {},
  },
}
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
