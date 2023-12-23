<template>
  <td>
    <v-row  no-gutters>
      <v-menu
        v-model="menu"
        transition="scale-transition"
        offset-y
        :close-on-content-click="false"
        style="width: 100px; display: flex;"
      >
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ date | formatMMDDYYYY }}</span>
        </template>
        <v-date-picker
          @change="changeDate"
          no-title
          v-model="date"
          width="290"
          class="elevation-3"
        ></v-date-picker>
      </v-menu>

      <v-menu
        ref="menuTimePicker"
        v-model="menuTimePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        class="pa-1"
        max-width="290px"
        style="width: 100px"
      >
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ changeTime }}</span>
        </template>
        <v-time-picker
          v-if="menuTimePicker"
          v-model="time"
          @click:minute="saveTime(time)"
        ></v-time-picker>
      </v-menu>
    </v-row>
  </td>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      date: null,
      menu: false,
      menuTimePicker: false,
      time: null
    };
  },
  methods: {
    ...mapActions("ht_store/matter/character/characterProfile", ["updateTask"]),
    changeDate(e) {
      const data = {
        type: "date",
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.menu = false;
      this.updateTask(data);
    },
    saveTime(time) {
      var resultTime = time + ":" + moment().format("ss");
      const data = {
        type: "time",
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: resultTime
      };
      this.updateTask(data);
      this.$refs.menuTimePicker.save(resultTime);
    }
  },
  computed: {
    changeTime() {
      return this.time ? this.time : "00:00:00";
    }
  },
  mounted() {
    this.date = this.dataRow.dateTime.from.substr(0, 10);
    this.time = moment(this.dataRow.dateTime.from).format("HH:mm:ss");
  }
};
</script>
