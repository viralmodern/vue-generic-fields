<template>
  <td
    class="changeSelect"
    :style="{
      backgroundColor: showClassColor(nameConvert.name),
      opacity: dataRow.isStrike === true ? 0.3 : 1
    }"
  >
    <v-menu
      v-if="dataRow.isStrike === false"
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ nameConvert.name }}</span>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in statusDigital"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="showClassColor(item.name)"
            small
            @click="change(item)"
            >{{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
    <span v-else>{{ nameConvert.name }}</span>
  </td>
</template>
<script>
import { statusDigital } from "../../../config";

export default {
  data() {
    return {
      statusDigital,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    nameConvert() {
      return this.statusDigital.find(x => x.id === this.dataRow.status);
    }
  },
  methods: {
    change(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.$emit("updateTask", data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name === "Ignored") {
        return "#F44336";
      } else if (name === "Backlog") {
        return "#E91E63";
      } else if (name === "Evaluate") {
        return "#9C27B0";
      } else {
        return "#00BCD4";
      }
    }
  }
};
</script>
<style scoped>
.showBackground {
  border-radius: 10px;
}
.changeSelect {
  text-align: left;
  color: white;
  border: 3px solid transparent;
  background-clip: padding-box;
}
</style>
