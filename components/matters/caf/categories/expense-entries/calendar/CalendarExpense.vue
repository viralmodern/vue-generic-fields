<template>
  <div>
    <QuickViewRowGrid
      :open="uiShowQuickView"
      @close="uiShowQuickView = false"
    />
    <div>
      <v-card>
        <v-card-text>
          <div class="d-flex align-center">
            <DateRange />
            <div class="flex-grow-1"></div>
            <v-btn
              @click="uiShowBreakdown = !uiShowBreakdown"
              small
              style="text-transform: none;"
              depressed
              color="primary"
            >
              <v-icon left>mdi-chart-pie</v-icon>
              {{ uiShowBreakdown ? 'Hide' : 'Breakdown' }}
            </v-btn>
            <v-btn small class="ml-4 text-capitalize" depressed color="primary">
              <v-icon left>mdi-plus</v-icon>
              New transaction
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div v-if="uiShowBreakdown">
      <BreakDownExpense flat />
    </div>
    <div>
      <v-toolbar flat color="white">
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn small outlined color="grey darken-2" v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setToday">
              <v-list-item-title>Today</v-list-item-title>
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
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title class="text-subtitle-2">{{ title }}</v-toolbar-title>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <ChooseItems
          title="Expense category"
          :show-label-header="false"
          multiple
          label-header="Expense code"
        >
          <template v-slot:content="{ selected, on }">
            <v-btn v-on="on" text small>
              <span class="text-subtitle-2 text-caption text-capitalize">
                Expense code
                <sup class="font-weight-bold" v-if="selected.length > 0"
                  >+{{ selected.length }}</sup
                >
              </span>
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
        </ChooseItems>
        <ChooseItems
          title="Expense category"
          :show-label-header="false"
          multiple
          label-header="Expense category"
        >
          <template v-slot:content="{ selected, on }">
            <v-btn v-on="on" text small>
              <span class="text-subtitle-2 text-caption text-capitalize">
                Expense category
                <sup class="font-weight-bold" v-if="selected.length > 0"
                  >+{{ selected.length }}</sup
                >
              </span>
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
        </ChooseItems>
        <ChooseItems
          title="Create by"
          :show-label-header="false"
          multiple
          label-header="Create by"
        >
          <template v-slot:content="{ selected, on }">
            <v-btn v-on="on" text small>
              <span class="text-subtitle-2 text-caption text-capitalize">
                Create by
                <sup class="font-weight-bold" v-if="selected.length > 0"
                  >+{{ selected.length }}</sup
                >
              </span>
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
        </ChooseItems>

        <SearchInput class="ml-4" desen placeholder="Search expends" />
      </v-toolbar>
      <div>
        <v-calendar
          ref="calendar"
          class="custom1"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @click:day="viewDayEvt"
          @change="updateRange"
        >
          <template v-slot:event="{ event, outside, start, end, timed }">
            <div class="pa-2" v-if="start">
              <p>
                <span class="text-subtitle-1">$</span>
                {{ event.expense_amount }}
              </p>
              <p>
                {{ getExpenseCode(event.expense_code).text }} -
                {{ getExpenseCode(event.expense_code).code }}
              </p>
              <AvatarItem
                title="event.created_by.username"
                :src="event.created_by.avatar"
                :title="event.created_by.username"
              />
            </div>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          max-width="350px"
        >
          <v-card flat>
            <v-toolbar :color="selectedEvent.color" dark dense>
              <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                fab
                small
                left
                bottom
                text
                @click="
                  uiShowQuickView = true
                  selectedOpen = false
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn fab small left bottom text @click="selectedOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="px-0 pb-0">
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-timer</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Monday, January 27
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Weekly on Monday at 9:00 am (30 minutes)
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="selectedEvent.expense_description">
                  <v-list-item-icon>
                    <v-icon>mdi-format-align-left</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ selectedEvent.expense_description }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="selectedEvent.paid_status">
                  <v-list-item-icon>
                    <v-icon>mdi-shopping</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <div>
                      <v-chip
                        dark
                        :color="getPaidStatus(selectedEvent.paid_status).color"
                      >
                        {{ getPaidStatus(selectedEvent.paid_status).text }}
                      </v-chip>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '../../../../../utils/SearchInput'
import ChooseItems from '../../../../../utils/ChooseItems'
import {
  EXPENSES_CODE,
  getCodeFields,
  PAID_STATUS,
} from '../../../../../../mock/fields'
import AvatarItem from '../../../../../utils/AvatarItem'
import QuickViewRowGrid from '../logs/QuickViewRowGrid'
import DateRange from '../../../../../utils/DateRange'
import BreakDownExpense from './BreakDownExpense'

export default {
  name: 'CalendarExpense',
  components: {
    BreakDownExpense,
    DateRange,
    QuickViewRowGrid,
    AvatarItem,
    ChooseItems,
    SearchInput,
  },
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    today: null,
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [
      {
        name: 'PTO',
        start: '2020-1-1 18:45',
        end: '2020-1-1 19:15',
        color: 'blue',
        expense_amount: 100,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E101',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'Conference',
        start: '2020-1-12 6:0',
        end: '2020-1-12 7:45',
        color: 'deep-purple',

        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'Event',
        start: '2020-1-4',
        end: '2020-1-7',
        color: 'blue',

        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'Meeting',
        start: '2020-1-26 15:45',
        end: '2020-1-26 17:15',
        color: 'indigo',

        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 0,
        action: 'asfdgh',
      },
      {
        name: 'Conference',
        start: '2020-1-19 4:15',
        end: '2020-1-19 5:45',
        color: 'indigo',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'Party',
        start: '2020-1-11 4:30',
        end: '2020-1-11 5:0',
        color: 'grey darken-1',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'Holiday',
        start: '2020-1-6 1:45',
        end: '2020-1-6 3:15',
        color: 'orange',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'Travel',
        start: '2020-1-28 8:0',
        end: '2020-1-28 10:0',
        color: 'indigo',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 0,
        action: 'asfdgh',
      },
      {
        name: 'PTO',
        start: '2020-1-16 9:15',
        end: '2020-1-16 10:30',
        color: 'deep-purple',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'Travel',
        start: '2020-1-12 20:30',
        end: '2020-1-12 21:30',
        color: 'indigo',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'Meeting',
        start: '2020-1-25 2:30',
        end: '2020-1-25 3:45',
        color: 'indigo',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'Event',
        start: '2020-1-4 22:30',
        end: '2020-1-4 23:15',
        color: 'deep-purple',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'Meeting',
        start: '2020-1-16 8:30',
        end: '2020-1-16 9:15',
        color: 'indigo',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'Event',
        start: '2020-1-17 5:15',
        end: '2020-1-17 5:45',
        color: 'deep-purple',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 0,
        action: 'asfdgh',
      },
      {
        name: 'Travel',
        start: '2020-1-25 12:0',
        end: '2020-1-25 12:30',
        color: 'orange',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'Holiday',
        start: '2020-1-2 2:0',
        end: '2020-1-2 2:30',
        color: 'indigo',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'Party',
        start: '2020-1-3 20:15',
        end: '2020-1-3 21:15',
        color: 'grey darken-1',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'PTO',
        start: '2020-1-26',
        end: '2020-1-26',
        color: 'cyan',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 0,
        action: 'asfdgh',
      },
      {
        name: 'Holiday',
        start: '2020-1-17 23:45',
        end: '2020-1-18 0:15',
        color: 'cyan',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'PTO',
        start: '2020-1-3 1:0',
        end: '2020-1-3 2:30',
        color: 'grey darken-1',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'Party',
        start: '2020-1-25 20:30',
        end: '2020-1-25 21:30',
        color: 'blue',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'Event',
        start: '2020-1-18 3:15',
        end: '2020-1-18 4:45',
        color: 'deep-purple',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'Conference',
        start: '2020-1-6 6:30',
        end: '2020-1-6 8:30',
        color: 'blue',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'Travel',
        start: '2020-1-22 7:45',
        end: '2020-1-22 9:15',
        color: 'cyan',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 0,
        action: 'asfdgh',
      },
      {
        name: 'Conference',
        start: '2020-1-17 6:0',
        end: '2020-1-17 7:0',
        color: 'deep-purple',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'Party',
        start: '2020-1-6 18:15',
        end: '2020-1-6 19:45',
        color: 'cyan',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'PTO',
        start: '2020-1-19 10:45',
        end: '2020-1-19 12:15',
        color: 'cyan',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 0,
        action: 'asfdgh',
      },
      {
        name: 'Event',
        start: '2020-1-31 10:30',
        end: '2020-1-31 12:30',
        color: 'grey darken-1',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 1,
        action: 'asfdgh',
      },
      {
        name: 'Meeting',
        start: '2020-1-2 8:0',
        end: '2020-1-2 9:45',
        color: 'orange',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 2,
        action: 'asfdgh',
      },
      {
        name: 'Holiday',
        start: '2020-1-12',
        end: '2020-1-14',
        color: 'deep-purple',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'Party',
        start: '2020-1-8 21:30',
        end: '2020-1-8 22:0',
        color: 'indigo',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'Birthday',
        start: '2020-1-20 16:30',
        end: '2020-1-20 17:30',
        color: 'cyan',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'Meeting',
        start: '2020-1-27',
        end: '2020-1-27',
        color: 'indigo',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
      {
        name: 'PTO',
        start: '2020-1-17',
        end: '2020-1-17',
        color: 'cyan',
        expense_amount: 4000,
        created_by: {
          avatar: null,
          email: 'ducviet@gmail.com',
          username: 'ducviet@gmail.com',
        },
        expense_code: 'E107',

        expense_name: 'Expense Docket',
        expense_description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi officiis praesentium quibusdam quisquam, saepe?\n' +
          'Aliquam aperiam dolor dolore doloribus, enim esse est incidunt iusto labore odio repudiandae rerum voluptatum.',
        source: [
          {
            content_type: 21,
            obj_id: 12,
            name: 'Card log',
          },
          {
            content_type: 21,
            obj_id: 12,
            name: 'Docket',
          },
        ],
        tax_1: '18',
        tax_2: '0',
        total_tax: 15789,
        amount_tax: 8899,
        billable: 3,
        activities_code: 'A1053',
        reference: 'asfdgh',
        paid_status: 3,
        action: 'asfdgh',
      },
    ],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party',
    ],

    category: [],
    uiShowChooseExpenseCode: false,
    uiShowQuickView: false,
    uiShowBreakdown: false,
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
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    viewDayEvt({ nativeEvent, event }) {
      console.log('KHOA_PUB', arguments)
    },
    getEventColor(event) {
      return event.color
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
    showEvent({ nativeEvent, event, outside, start, end, timed }) {
      console.log('showEvent', { ...event, outside, start, end, timed })
      // outside: false
      // start: true
      // end: true
      // timed: false
      const open = () => {
        this.selectedEvent = { ...event, outside, start, end, timed }
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
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        })
      }
      this.start = start
      this.end = end

      // this.events = events
    },
    nth(d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${
            a.getMonth() + 1
          }-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
    },
    eventName(x) {
      console.log('eventName', x.input)
      let expense_code = getCodeFields({
        code: x.input.expense_code,
        list: EXPENSES_CODE,
      })
      return (
        '$ ' +
        x.input.expense_amount +
        ' - ' +
        expense_code.text +
        ' - ' +
        expense_code.code
      )
    },
    getExpenseCode(code) {
      return getCodeFields({ code: code, list: EXPENSES_CODE })
    },
    getPaidStatus(code) {
      return getCodeFields({ code, list: PAID_STATUS })
    },
  },
}
</script>

<style scoped>
.custom1 /deep/ .v-calendar-weekly__week {
  height: unset;
  max-height: unset;
  min-height: unset;
}

.custom1.v-calendar >>> .v-event.v-event-end,
.custom1.v-calendar >>> .v-event.v-event-start {
  white-space: normal;
  overflow: auto;
  max-height: unset !important;
  height: unset !important;
}
</style>
