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
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      date: null,
      menu: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/evidences", ["updateTask"]),
    changeDate(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.menu = false;
      this.updateTask(data);
    }
  },
  mounted() {
    this.date = this.dataRow.originialDate;
  }
};
</script>
