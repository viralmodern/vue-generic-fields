<template>
  <td>
    <v-row  no-gutters>
      <v-menu
        v-model="menu"
        transition="scale-transition"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ date | formatMMDDYYYY }}</span>
        </template>
        <v-date-picker
          @change="onChange"
          no-title
          v-model="date"
          width="290"
          class="elevation-3"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
    </v-row>
  </td>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      menu: false,
      date: ""
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    onChange(value) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      };
      this.$emit("onChange", data);
    }
  },
  mounted() {
    this.date = moment(this.dataRow.date).format("YYYY-MM-DD");
  }
};
</script>
