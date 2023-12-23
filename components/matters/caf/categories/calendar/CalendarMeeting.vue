<template>
  <div>
    <v-sheet height="64">
      <div class="d-flex align-center">
        <v-btn
          class="mr-4"
          fab
          small
          title="Add new meeting"
          color="primary"
          @click="$eventHub.$emit('clickAddMeeting', { evt: $event, data: {} })"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn depressed class="mr-4" @click="setToday">
          Today
        </v-btn>
        <v-btn fab text small @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title class="ml-4">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn depressed v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 days</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-sheet>
    <v-sheet height="70vh">
      <v-calendar
        class="custom1"
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="list"
        :event-color="getEventColor"
        :event-margin-bottom="3"
        :now="today"
        :type="type"
        :event-overlap-threshold="100"
        :event-height="20"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="updateRange"
        @click:day="clickDay($event)"
        @click="openMenu"
        @contextmenu:day="openMenu"
      >
        <template v-slot:interval="day"> </template>
        <template v-slot:day-month="day"> </template>
      </v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
        max-width="300px"
      >
        <v-card color="grey lighten-4" flat>
          <v-toolbar :color="'#' + selectedEvent.color" dark>
            <v-btn icon>
              <v-icon>edit</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite_border</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <div class="d-flex mb-2">
              <v-icon left small class="align-self-start">notes</v-icon>
              <div class="flex-grow-1">
                <contents-markdown
                  class="message-content"
                  :id="selectedEvent.pk"
                  :content="selectedEvent.desc"
                />
              </div>
            </div>
            <div class="d-flex mb-2">
              <v-icon left small class="align-self-start">group</v-icon>
              <div class="flex-grow-1">
                <template v-for="m in selectedEvent.members">
                  <LinkMember
                    :key="'mb-meeting-' + m.pk"
                    v-if="m.pk && findMemberByID(m.pk)"
                    :ID="m.pk"
                    class="no_content font-weight-normal"
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-avatar
                          v-if="m.pk === selectedEvent.creator"
                          v-on="on"
                          class="text-uppercase white--text"
                          style="border: solid 2px yellow; overflow: hidden;"
                          color="yellow"
                          :size="25"
                        >
                          <v-img
                            v-if="findMemberByID(m.pk).user.avatar"
                            :src="findMemberByID(m.pk).user.avatar"
                          ></v-img>
                          <template v-else>{{
                            findMemberByID(m.pk).user.name | $$strName
                          }}</template>
                        </v-avatar>
                        <v-avatar
                          v-else
                          v-on="on"
                          class="text-uppercase white--text"
                          color="primary"
                          :size="25"
                          style="font-size: 75%;"
                        >
                          <v-img
                            v-if="findMemberByID(m.pk).user.avatar"
                            :src="findMemberByID(m.pk).user.avatar"
                          ></v-img>
                          <template v-else>{{
                            findMemberByID(m.pk).user.name | $$strName
                          }}</template>
                        </v-avatar>
                      </template>
                      <span>{{ findMemberByID(m.pk).user.username }}</span>
                    </v-tooltip>
                  </LinkMember>
                </template>
              </div>
            </div>
            <div class="d-flex">
              <v-icon left small class="align-self-start">my_location</v-icon>
              <div class="flex-grow-1">
                {{ selectedEvent.location }}
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { getSESSION } from '../../../../../utils'
import LinkMember from '../../../../utils/LinkMember'
import { $$strName } from '@/sat-vue-toolkit/functions'

export default {
  name: 'CalendarMeeting',
  components: { LinkMember },
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    // today: moment().format('YYYY-MM-DD'),
    // today: moment().format('YYYY-MM-DD'),
    today: moment().format('YYYY-MM-DD'),
    focus: moment().format('YYYY-MM-DD'),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [
      {
        name: 'Project 1',
        details: 'Going to the beach!',
        start: '2018-12-29',
        end: '2019-01-01',
        color: 'blue',
      },
      {
        name: 'Project 2',
        details: 'Spending time on how we do not have enough time',
        start: '2019-01-07 09:00',
        end: '2019-01-07 09:30',
        color: 'indigo',
      },
      {
        name: 'Project 3',
        details:
          'This starts in the middle of an event and spans over multiple events',
        start: '2018-12-31',
        end: '2019-01-04',
        color: 'deep-purple',
      },
      {
        name: 'Project 4',
        details: 'Testing',
        start: '2019-01-03',
        end: '2019-01-07',
        color: 'cyan',
      },
      {
        name: 'Project 5',
        details: 'A very important meeting about nothing',
        start: '2019-01-07 08:00',
        end: '2019-01-07 11:30',
        color: 'red',
      },
      {
        name: 'Project 6',
        details: 'Another important meeting about nothing',
        start: '2019-01-07 10:00',
        end: '2019-01-07 13:30',
        color: 'brown',
      },
      {
        name: 'Project 7',
        start: '2019-01-07',
        end: '2019-01-08',
        color: 'blue',
      },
      {
        name: 'Project 8',
        details: 'Time to feed',
        start: '2019-01-07 12:00',
        end: '2019-01-07 15:00',
        color: 'deep-orange',
      },
      {
        name: 'Project 9',
        details: 'Celebrate responsibly',
        start: '2019-01-03',
        color: 'teal',
      },
      {
        name: 'Project 10',
        details: 'Eat chocolate until you pass out',
        start: '2019-01-01',
        end: '2019-01-02',
        color: 'green',
      },
      {
        name: 'Project 11',
        details: 'The best time of my life',
        start: '2019-01-21',
        end: '2019-01-28',
        color: 'grey darken-1',
      },
      {
        name: 'Project 12',
        details: 'Code like there is no tommorrow',
        start: '2019-01-30 23:00',
        end: '2019-02-01 08:00',
        color: 'black',
      },
      {
        name: 'Project 114',
        start: '2019-01-14 18:00',
        end: '2019-01-14 19:00',
        color: 'red',
      },
      {
        name: 'Project 13',
        start: '2019-01-14 18:00',
        end: '2019-01-14 19:00',
        color: '#4285F4',
      },
      {
        name: 'Project 14',
        start: '2019-01-14 18:00',
        end: '2019-01-14 19:00',
        color: '#4285F4',
      },

      {
        name: 'Project 15',
        start: '2019-01-14 18:00',
        end: '2019-01-14 19:00',
        color: '#4285F4',
      },
      {
        name: 'Project 16',
        start: '2019-01-14 18:30',
        end: '2019-01-14 20:30',
        color: '#4285F4',
      },
      {
        name: 'Project 17',
        start: '2019-01-14 19:00',
        end: '2019-01-14 20:00',
        color: '#4285F4',
      },
      {
        name: 'Project 18',
        start: '2019-01-14 21:00',
        end: '2019-01-14 23:00',
        color: '#4285F4',
      },
      {
        name: 'Project 19',
        start: '2019-01-14 22:00',
        end: '2019-01-14 23:00',
        color: '#4285F4',
      },
      {
        pk: 66,
        // "start": "2019-08-05T00:00:00Z",
        // "end": "2019-08-27T00:00:00Z",
        start: '2019-08-05 00:00',
        end: '2019-08-27 05:00',
        name: 'Khoa cave',
        description: '',
        color: '#ff0000',
        workspace: 'sat-prj',
        visibility: 1,
        workflow: { pk: 17, name: 'Wiki', project: 66, creator: 1 },
        contacts: [
          {
            pk: 772,
            role: 2,
            first_name: 'xyasd',
            last_name: 'ádfas',
            avatar: null,
            email: 'abc@gmail.com',
            phone_number: '+84949533435',
            key_contact: true,
            created: '2019-10-04T09:00:13.639263Z',
            creator: 1,
          },
        ],
        progress: 4.634760705289673,
        members: [
          { pk: 1, role: 2 },
          { pk: 8, role: 3 },
          { pk: 13, role: 3 },
          {
            pk: 12,
            role: 3,
          },
        ],
        pending_members: [],
      },
    ],
    isAssign: getSESSION('isAssign') || false,
  }),
  computed: {
    title() {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long',
      })
    },

    ...mapGetters({
      findMemberByID: 'workspace/findMemberByID',
    }),
    list: {
      get() {
        try {
          if (this.isAssign) return this.filterMeetingByCreator(this.creator) // assigned to me
          return this.filterMeetingNotByCreator(this.creator) // managed to me
        } catch (e) {
          return []
        }
      },
      set() {},
    },
    creator() {
      try {
        return this.authUser.pk
      } catch (e) {
        return null
      }
    },
  },
  mounted() {
    let _self = this
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },

    getEventColor(event) {
      return '#' + event.color
      // return
    },
    setToday() {
      this.focus = this.today
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
    },
    nth(d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },

    // new
    clickDay(event) {
      console.log(arguments)
    },
    openMenu({ nativeEvent, e }) {
      // alert(1)
      // e.preventDefault()
      console.log('nativeEvent', e, nativeEvent)
      this.showMenu = false
      /*this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
          this.showMenu = true
      })*/
    },
  },
  filters: {
    $$strName,
  },
}
</script>

<style scoped>
.custom1 /deep/ .v-calendar-weekly__week {
  height: unset;
  max-height: unset;
  min-height: unset;
}
</style>
