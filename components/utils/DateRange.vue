<template>
  <v-menu
    v-model="menu1"
    max-width="590px"
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <slot
        name="header"
        :on="on"
        :month="month_value"
        :isMonth="month"
        :range="customDay"
        :dates="dates"
      >
        <v-text-field
          solo
          outlined
          style="max-width: 250px;"
          flat
          dense
          v-model="dateRangeText"
          hide-details
          append-icon="mdi-calendar"
          v-on="on"
        ></v-text-field>
      </slot>
    </template>
    <v-card>
      <v-row>
        <v-col>
          <v-list dense>
            <v-list-item
              link
              exact
              :input-value="selected === item.value && !month && !customDay"
              v-for="item in items"
              :key="item.title"
              @click="clickListItem(item.value)"
            >
              {{ item.title }} &nbsp;<span
                class="text-caption grey--text text--darken-2"
                >({{ item.value.join(' - ') }})</span
              >
            </v-list-item>
            <v-divider />
            <v-list-item :input-value="customDay" link @click="clickCustomDay"
              >Select day
            </v-list-item>
            <v-list-item :input-value="month" link @click="clickCustomMonth"
              >Select month
            </v-list-item>
          </v-list>
        </v-col>
        <v-col v-if="customDay || month">
          <v-date-picker
            v-show="customDay"
            range
            light
            style="box-shadow: none;"
            no-title
            v-model="dates"
            @change="change"
          ></v-date-picker>
          <v-date-picker
            v-show="month"
            light
            style="box-shadow: none;"
            no-title
            type="month"
            v-model="month_value"
            @change="change"
          ></v-date-picker>
        </v-col>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'DateRange',
  data: () => ({
    dates: ['2019-09-10', '2019-09-20'],
    selected: '',
    menu1: false,
    month: false,
    month_value: '2019-10',
    customDay: false,
  }),
  props: {
    customDate: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [
        {
          title: 'Today',
          value: ['26-12-2019'],
        },
        {
          title: 'Yesterday',
          value: ['25-12-2019'],
        },
        {
          title: 'This month',
          value: ['26-11-2019', '29-12-2019'],
        },
        {
          title: 'This week',
          value: ['23-12-2019', '29-12-2019'],
        },
        {
          title: 'last 7 days',
          value: ['19-12-2019', '26-12-2019'],
        },
      ],
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
  methods: {
    clickCustomDay() {
      try {
        this.customDay = true
        this.month = false
      } catch (e) {
        console.log('XXX', e.message)
      }
    },
    clickCustomMonth() {
      this.month = true
      this.month_value = '2020-07'
      this.customDay = false
    },
    clickListItem(val) {
      this.selected = val
      this.month = false
      this.customDay = false
      this.dates = val
      this.$emit('change', {
        month: this.month_value,
        range: this.customDay,
        dates: this.dates,
      })
    },
    change() {
      this.menu1 = false
      this.$emit('change', {
        month: this.month_value,
        range: this.customDay,
        dates: this.dates,
      })
    },
  },
}
</script>

<style></style>
