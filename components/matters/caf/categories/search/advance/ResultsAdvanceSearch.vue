<template>
  <div>
    <v-card-subtitle class="black--text font-weight-black px-0">
      D.Alaska (2 results)
    </v-card-subtitle>
    <table-grid
      :search="search"
      :headers="headers"
      hide-default-footer
      :desserts="desserts"
    >
      <template v-slot:item.status="{ props: { row, item } }">
        <v-chip
          :color="item.upcoming ? 'success' : 'default'"
          disabled
          small
          class="d-block text-center text-uppercase font-weight-bold"
        >
          {{ item.upcoming ? 'upcoming' : 'Past' }}
        </v-chip>
      </template>
      <template v-slot:item.schedule_name="{ props: { row, item } }">
        <div class="text-no-wrap">
          <v-text-field
            v-model="item.schedule_name"
            hide-details
            flat
            dense
            solo
          ></v-text-field>
        </div>
      </template>
      <template v-slot:item.description="{ props: { row, item } }">
        <span class="text-no-wrap">
          {{ item.description }}
        </span>
      </template>
      <template v-slot:item.countdown="{ props: { row, item } }">
        <!--      {{item.date_time}}-->
        <countdown-reminder :deadline="item.date_time"></countdown-reminder>
      </template>
      <template v-slot:item.labels="{ props: { row, item } }">
        <div class="text-no-wrap">
          <template v-for="label in item.labels">
            <chip-type
              :type="label"
              :key="label.pk"
              dark
              class="mx-1"
              :text="label.name"
              :color="label.color"
            />
          </template>
        </div>
      </template>
      <template v-slot:item.date="{ props: { row, item } }">
        <span class="text-no-wrap">
          {{ item.date_time | $$formatDate }}
        </span>
      </template>
      <template v-slot:item.time="{ props: { row, item } }">
        <span class="text-no-wrap">
          {{ item.date_time | $$formatTime }}
        </span>
      </template>
    </table-grid>
  </div>
</template>

<script>
import TableGrid from '../../../../../utils/TableGrid'
import dateTimeFormat from '../../../../../../mixins/mx_dateTime'
import CountdownReminder from '../../reminders/CountdownReminder'
import ChipType from '../../../../../../sat-vue-toolkit/components/ChipType'

export default {
  name: 'ResultsAdvanceSearch',
  components: { ChipType, CountdownReminder, TableGrid },
  mixins: [dateTimeFormat],
  data() {
    return {
      search: '',
      headers: [
        {
          isDrag: true,
          value: 'drag',
        },
        { text: 'Schedule name', value: 'schedule_name' },
        { text: 'Status', value: 'status' },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'Description', value: 'description' },
        { text: 'labels', value: 'labels' },
        { text: 'Countdown', value: 'countdown' },
      ],
      desserts: [
        {
          schedule_name: 'Frozen Yogurt',
          upcoming: true,
          date_time: '2021-11-25 03:07:22.772471+00:00',
          description: 'Frozen Yogurt',
          labels: [
            {
              pk: 1,
              name: 'FRT',
              color: 'ff0000',
            },
            {
              pk: 2,
              name: 'Yogurt',
              color: '675aff',
            },
          ],
        },
        {
          schedule_name: 'Frozen Yogurt1',
          upcoming: false,
          date_time: '2019-11-25 03:07:22.772471+00:00',
          description: 'Frozen Yogurt',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
