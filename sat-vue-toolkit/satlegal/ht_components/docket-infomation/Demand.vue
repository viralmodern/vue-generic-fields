<template>
  <div>
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="px-2 white--text text-capitalize"
          rounded
          :color="item.color"
          small
          v-on="on"
          >{{ item.name }}</v-btn
        >
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in listDemand"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="item.color"
            small
            @click="onChange(item.id)"
            >{{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { listDemand } from "../../config";
export default {
  data() {
    return {
      menu: false,
      listDemand
    };
  },
  props: {
    item: Object
  },
  methods: {
    onChange(id) {
      const data = {
        column: "juryDemand",
        value: id
      };
      this.$emit("updateDemand", data);
      this.menu = false;
    }
  }
};
</script>
