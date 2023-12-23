<template>
  <div>
    <v-menu v-model="menu" transition="scale-transition" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ dateFormat | formatMMDDYYYY }}</span>
      </template>
      <v-date-picker
        @change="onChange"
        no-title
        v-model="dateFormat"
        width="290"
        class="elevation-3"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      menu: false,
      dateFormat: ""
    };
  },
  props: {
    item: String
  },
  methods: {
    onChange(value) {
      const data = {
        column: "date",
        value: value
      };
      this.$emit("updateDate", data);
    }
  },
  mounted() {
    this.dateFormat = moment(this.item).format("YYYY-MM-DD");
  }
};
</script>
