<template>
  <div>
    <v-row no-gutters>
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
          @change="$emit('update', $event)"
          no-title
          v-model="date"
          width="290"
          class="elevation-3"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
    </v-row>
  </div>
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
    value: String,
  },
  mounted() {
    this.date = moment(this.value).format("YYYY-MM-DD");
  }
};
</script>
