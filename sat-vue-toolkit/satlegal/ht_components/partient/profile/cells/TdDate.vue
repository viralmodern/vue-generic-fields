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
        no-title
        @change="changeDate"
        v-model="date"
        width="290"
        class="elevation-3"
      ></v-date-picker>
    </v-menu>
  </td>
</template>
<script>
import moment from "moment";
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
    changeDate(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.$emit("updateTask", data);
      this.menu = false;
    }
  },
  mounted() {
    this.date = moment(this.dataRow.date).format("YYYY-MM-DD");
  }
};
</script>
