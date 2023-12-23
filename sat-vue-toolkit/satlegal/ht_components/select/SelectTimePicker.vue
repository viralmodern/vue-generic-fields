<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="date"
    offset-y
    min-width="290px"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-on="on"
        v-model="formatDateDeadline"
        prepend-icon="mdi-calendar"
        readonly
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn color="primary" @click="onChangeDate">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      menu: false,
      date: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    onChangeDate() {
      this.$refs.menu.save(this.date);
      this.$emit("emitChangeDate", this.date);
    }
  },
  computed: {
    formatDateDeadline() {
      return moment(this.date).format("MM/DD/YYYY");
    }
  }
};
</script>

<style scoped>
.v-btn-date-picker {
  margin-top: 0px;
  height: 48px;
  width: 100%;
  margin-left: 0px;
}
</style>
