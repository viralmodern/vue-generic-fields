<template>
  <div class="overflow-x-hidden">
    <v-card tile flat>
      <v-card-title>
        <div class="w-100 d-flex align-center fill-height">
          <v-btn icon small
                 @click="$refs.calendar.prev()">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <div class="mx-1"/>
          <v-btn icon small
                 @click="$refs.calendar.next()">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <div class="mx-1"></div>
          <ChooseFiledCalendarByFields label="event’s start"
                                       :attributes="combinedFields"
                                       v-model="fieldByFieldStart"/>
          <div class="mx-1"></div>
          <ChooseFiledCalendarByFields label="event’s end"
                                       :attributes="combinedFields"
                                       v-model="fieldByFieldEnd"/>
          <v-spacer/>
          <div class="subtitle-1 ma-0 hide_base" style="display: none">
            {{tt}}
          </div>
          <div class="subtitle-1 ma-0" v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </div>
          <v-spacer/>
          <div class="mx-1"/>
          <ChooseDatePickerEvent v-model="value"/>
          <div class="mx-1"></div>
          <ChooseCalendarTypes :types="types" v-model="type"/>
        </div>
      </v-card-title>
      <v-sheet height="500">
        <v-calendar :short-weekdays="false"
                    ref="calendar"
                    v-model="value"
                    :weekdays="weekday"
                    :type="type"
                    :events="combinedEvents"
                    :event-overlap-mode="mode"
                    :event-overlap-threshold="20"
                    :event-color="getEventColor"
                    :event-end="getEventsFiledBy.eventEnd"
                    :event-start="getEventsFiledBy.eventStart"
                    :event-name="getEventsFiledBy.eventName"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"/>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
  import baseViewProps from "~/sat-vue-toolkit/components/slick-grid/configs/props/baseViewProps"
  import { layoutMixin } from "~/sat-vue-toolkit/components/slick-grid/views/mixins/mxCoreLayout"
  import { layoutCalendarMixin } from "~/sat-vue-toolkit/components/slick-grid/views/mixins/mxCoreLayoutCalendar"
  import ChooseDatePickerEvent from "~/sat-vue-toolkit/components/slick-grid/components/ChooseDatePickerEvent"
  import ChooseCalendarTypes from "~/sat-vue-toolkit/components/slick-grid/components/ChooseCalendarTypes"
  import ChooseFiledCalendarByFields
    from "~/sat-vue-toolkit/components/slick-grid/components/ChooseFiledCalendarByFields"
  export default {
    name: "BaseCalendarView",
    components: { ChooseFiledCalendarByFields, ChooseCalendarTypes, ChooseDatePickerEvent },
    props: {
      ...baseViewProps
    },
    mixins: [layoutMixin, layoutCalendarMixin],
    mounted () {
      this.$refs.calendar.checkChange()
      this.tt = this.$refs.calendar.title
      this.$watch('value', () => {
        console.error('CALENDAR', this.$refs.calendar, this.$refs.calendar.title, this.fieldsConfig)
        this.tt = this.$refs.calendar.title
      })

    },
    data: () => ({
      tt: '',
      fieldByFieldStart: null,
      fieldByFieldEnd: null,
      type: "month",
      types: ["month", "week", "day", "4day"],
      mode: "stack",
      modes: ["stack", "column"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
        { text: "Mon, Wed, Fri", value: [1, 3, 5] }
      ],
      value: new Date().toISOString().substr(0, 10),
      events: [],
      colors: ["blue", "indigo", "deep-purple", "cyan", "green", "orange", "grey darken-1"],
      names: ["Meeting", "Holiday", "PTO", "Travel", "Event", "Birthday", "Conference", "Party"]
    }),
    methods: {
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },


    }
  }
</script>

<style scoped lang="scss">
  .dashboard-table-scroll_body {
    &.base_calendar {
      /*border: solid 1px red;*/
      display: block;
    }
  }
</style>
