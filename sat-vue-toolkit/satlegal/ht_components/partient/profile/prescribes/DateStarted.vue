<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <span class="font-weight-medium subheading">{{name}}</span>
    </v-col>
    <v-col cols="6" class="custom">
      <DateMonthPicker
        hide-details
        :max="dateStopped"
        :value="dateStarted | formatYYYYMMDD"
        @change="$emit('update', $event)"
      />
    </v-col>
  </v-row>
</template>

<script>
import DateMonthPicker from "../../../menus/DateMonthPicker";

export default {
  components: {
    DateMonthPicker
  },
  props: {
    name: String,
    dateStarted: String,
    dateStopped: String
  }
};
</script>

<style scoped>
.custom /deep/ .v-input__slot::before {
  border-style: unset;
}
.custom /deep/ .v-text-field {
  margin: 0px;
  padding: 0px;
}
</style>

