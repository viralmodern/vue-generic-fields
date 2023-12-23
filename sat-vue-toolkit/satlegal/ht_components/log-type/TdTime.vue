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
          <span v-on="on">{{ time }}</span>
        </template>
        <v-time-picker v-if="menu" v-model="time">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="onChange">OK</v-btn>
        </v-time-picker>
      </v-menu>
    </v-row>
  </td>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      time: ""
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
      this.cancel();
    },
    cancel() {
      this.menu = false;
    }
  },
  mounted() {
    this.time = this.dataRow.time;
  }
};
</script>
