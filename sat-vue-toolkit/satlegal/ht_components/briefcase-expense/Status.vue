<template>
  <td>
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
          :color="joinStatus.color"
          small
          v-on="on"
        >{{ joinStatus.name }}</v-btn>
      </template>
      <v-list>
        <v-row no-gutters v-for="(item, index) in statusExpense" :key="index" class="pa-2">
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="item.color"
            small
            @click="onChange(item.id)"
          >{{ item.name }}</v-btn>
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { statusExpense } from "../../config";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      statusExpense,
      menu: false
    };
  },
  methods: {
    onChange(value) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      };
      this.$emit("onChange", data);
      this.menu = false;
    }
  },
  computed: {
    joinStatus() {
      return this.statusExpense.find(x => x.id === this.dataRow.status);
    }
  }
};
</script>

