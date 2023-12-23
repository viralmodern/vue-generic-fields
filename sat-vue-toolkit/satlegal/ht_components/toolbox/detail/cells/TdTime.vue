<template>
  <td>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      max-width="290px"
      style="width: 100px"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ dataRow.time }}</span>
      </template>
      <v-time-picker
        v-if="menu"
        :value="dataRow.time"
        
        @change="
          $emit('update', $event);
          menu = false;
        "
      ></v-time-picker>
    </v-menu>
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
    saveTime() {}
  }
};
</script>
