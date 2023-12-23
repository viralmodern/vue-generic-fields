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
        :min="dataRow.startDate"
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
    changeDuaDate(data) {
      this.$emit("update", new Date(data).toISOString());
      this.menu = false;
    }
  },
  mounted() {
    this.date = moment(this.dataRow[this.column.name]).format("YYYY-MM-DD");
  }
};
</script>
