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
      <span>{{ changeTime }}</span>
      <!-- <v-menu
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
          <span>{{ changeTime }}</span>
        </template>
        <v-time-picker
          v-if="menuTimePicker"
          v-model="time"
          @click:minute="saveTime(time)"
        ></v-time-picker>
      </v-menu>-->
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
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    changeDate(e) {
      const data = {
        type: "date",
        taskId: this.dataRow.id,
        body: {
          time: new Date(e).toISOString()
        },
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      this.menu = false;
      this.updateTask(data);
    }
    // saveTime(time) {
    //   var resultTime = time + ":" + moment().format("ss");
    //   const data = {
    //     type: "time",
    //     taskId: this.dataRow.id,
    //     columnName: this.column.name,
    //     newValue: resultTime,
    //     matterId: this.$route.params.matter || this.$route.params.projectId,
    //     itemUpdate: {
    //       ...this.dataRow,
    //       time: new Date(time).toISOString()
    //     }
    //   };
    //   this.updateTask(data);
    //   this.$refs.menuTimePicker.save(resultTime);
    // }
  },
  computed: {
    changeTime() {
      return this.time ? this.time : "00:00:00";
    }
  },
  mounted() {
    this.date = moment(this.dataRow.dateTime.from).format("YYYY-MM-DD");
    this.time = moment(this.dataRow.dateTime.from).format("HH:mm:ss");
  }
};
</script>
