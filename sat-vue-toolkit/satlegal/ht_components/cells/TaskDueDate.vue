<template>
  <td>
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
      style="width: 130px"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ date }}</span>
      </template>
      <v-date-picker
        @change="changeDuaDate"
        v-model="date"
        width="290"
        class="elevation-3"
      ></v-date-picker>
    </v-menu>
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
      date: "",
      menu: false
    };
  },
  methods: {
    ...mapActions("ht_store/task/list", ["updateTask"]),
    changeDuaDate(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
      this.menu = false;
    }
  },
  mounted() {
    this.date = moment(this.dataRow.duaDate).format("YYYY-MM-DD");
  }
};
</script>
