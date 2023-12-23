<template>
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
      <v-edit-dialog
        persistent
        large
        :return-value.sync="item.description"
        @save="save"
        @cancel="cancel"
        @open="open"
        @close="close"
      >
        <span class="text-no-wrap">
          {{ item.description }}
        </span>
        <template v-slot:input>
          <v-textarea v-model="item.description"></v-textarea>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.countdown="{ props: { row, item } }">
      <!--      {{item.date_time}}-->
      <countdown-reminder :deadline="item.date_time"></countdown-reminder>
    </template>
    <template v-slot:item.labels="{ props: { row, item } }">
      <template v-for="label in labels">
        <chip-type
          :type="label"
          :key="label.pk"
          :text="label.name"
          :color="label.color"
        />
      </template>
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
</template>

<script>
import TableGrid from '../../../../utils/TableGrid'
import dateTimeFormat from '../../../../../mixins/mx_dateTime'
import CountdownReminder from './CountdownReminder'
import { mapGetters } from 'vuex'
import SearchInput from '../../../../utils/SearchInput'
import ChipType from '../../../../../sat-vue-toolkit/components/ChipType'

export default {
  name: 'ListCourtOrder',
  components: { ChipType, SearchInput, CountdownReminder, TableGrid },
  mixins: [dateTimeFormat],
  props: {
    search: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
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
  computed: {
    ...mapGetters({
      currentMatter: 'matters/matterDetail',
    }),
    labels() {
      try {
        return this.currentMatter.types
      } catch (e) {
        console.log(e.message)
        return []
      }
    },
  },
  methods: {
    save() {
      // alert(1)
    },
    cancel() {
      // alert(2)
    },
    open() {
      // alert(3)
    },
    close() {
      // alert(4)
    },
  },
}
</script>

<style scoped></style>
