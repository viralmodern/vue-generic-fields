<template>
  <td>
    <v-row no-gutters>
      <v-menu
        v-model="menu"
        transition="scale-transition"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ dataRow.end | formatMMDDYYYY }}</span>
        </template>
        <v-date-picker
          @change="update($event)"
          no-title
          :value="dataRow.end"
          width="290"
          class="elevation-3"
          @input="menu = false"
          :min="dataRow.start | formatYYYYMMDD"
        ></v-date-picker>
      </v-menu>
    </v-row>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    update(time) {
      const timer = new Date(time).toISOString();
      this.$emit("updateDataActivities", timer);
    }
  }
};
</script>
