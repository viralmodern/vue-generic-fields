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
          v-for="(item, index) in resultDigital"
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
import { resultDigital } from "../../../config";

export default {
  data() {
    return {
      resultDigital,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    nameConvert() {
      return this.resultDigital.find(x => x.id === this.dataRow.results);
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
      if (name === "N/A") {
        return "black";
      } else if (name === "Pass") {
        return "green";
      } else {
        return "red";
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
