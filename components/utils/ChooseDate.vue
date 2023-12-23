<template>
  <v-menu
    :return-value="showMenu"
    style="z-index: 999;"
    :close-on-content-click="false"
    offset-y
    max-width="290"
  >
    <template v-slot:activator="{ on }">
      <slot
        name="activator_date"
        title="Select Date"
        :on="on"
        :min="min"
        :max="max"
        :date="date"
      >
        <v-chip small v-on="on" title="Select Date" label>
          {{ date ? date : 'YYY - MM - DD' }}
          <v-icon small right>mdi-calendar</v-icon>
        </v-chip>
      </slot>
    </template>
    <v-date-picker
      no-title
      scrollable
      v-model="date"
      @change="change"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ChooseDate',
  data: () => ({
    min: 0,
    max: 0,
    date: moment(new Date()).format('YYYY-MM-DD')
    // date: this.value
  }),
  props: {
    showMenu: {
      type: Boolean,
      default: () => false
    },
    value: {
      default: () => moment(new Date()).format('YYYY-MM-DD')
    }
  },
  methods: {
    change(date) {
      try {
        // this.$emit('changeDate', { date })
        this.$emit('input', date)
      } catch (e) {
        console.log('datepick', e.message)
        // this.$emit("update", date)
      }
    }
  },
  watch: {
    showMenu(n) {
      if (n === false) {
        // this.date = moment(new Date()).format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style scoped></style>
