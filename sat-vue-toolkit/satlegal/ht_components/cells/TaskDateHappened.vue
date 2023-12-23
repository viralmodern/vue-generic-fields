<template>
  <td>
    <v-row no-gutters>
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
    ...mapActions("ht_store/task/list", ["updateTask"]),
    changeDate(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          type: "date",
          date: e
        }
      };
      this.menu = false;
      this.updateTask(data);
    },
    saveTime(time) {
      var resultTime = time + ":" + moment().format("ss");
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: {
          type: "time",
          time: resultTime
        }
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
    this.date = new Date(this.dataRow.limitaion.date)
      .toISOString()
      .substr(0, 10);
    this.time = this.dataRow.limitaion.time;
  }
};
</script>
