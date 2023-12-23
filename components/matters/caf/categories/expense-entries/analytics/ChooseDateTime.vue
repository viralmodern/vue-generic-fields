<template>
  <DateRange @change="change">
    <template v-slot:header="{ on, range, dates, month, isMonth }">
      <div class="legal_box_select" v-on="on">
        <div>
          <v-icon small>mdi-calendar</v-icon>
          <template v-if="isMonth">{{ month }}</template>
          <template v-else-if="range">
            {{ dates[0] }}&nbsp;<v-icon small v-if="dates[1]"
              >mdi-arrow-right </v-icon
            >&nbsp;
            {{ dates[1] }}
          </template>
          <template v-else-if="dates">
            {{ dates[0] }}&nbsp;<v-icon small v-if="dates[1]"
              >mdi-arrow-right </v-icon
            >&nbsp;
            {{ dates[1] }}
          </template>
          <template v-else>
            Select date time
          </template>
        </div>
        <v-icon right>mdi-chevron-down</v-icon>
      </div>
    </template>
  </DateRange>
</template>

<script>
import DateRange from '../../../../../utils/DateRange'
export default {
  name: 'ChooseDateTime',
  components: { DateRange },
  methods: {
    change({ month, range, dates }) {
      try {
        // month: false
        // range: false
        // dates
        let _from = '',
          to = ''
        if (month) {
          _from = 1
        }
        // let expense_by = items[0].query
        // this.$router.replace({ query: { from: expense_by } })
      } catch (e) {
        console.log('SelectModeTopBarBudgeting', e.message)
        console.log(arguments)
      }
    }
  }
}
</script>

<style scoped></style>
