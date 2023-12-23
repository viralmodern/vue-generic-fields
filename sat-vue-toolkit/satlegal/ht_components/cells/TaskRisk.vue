<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(dataRow.risk.name) }"
  >
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
      style="width: 130px"
    >
      <template v-slot:activator="{ on }">
        <div
          v-on="on"
          class="showBackground px-3 py-1 white--text"
          v-bind:style="{ backgroundColor: showClassColor(dataRow.risk.name) }"
        >
          {{ dataRow.risk.name }}
        </div>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in risks"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="showClassColor(item.name)"
            small
            @click="changeRisk(item)"
            >{{ item.id }}: {{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { risks } from "../../config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      risk: "",
      risks,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/task/list", ["updateTask"]),
    changeRisk(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name == "Very Low") {
        return "#388E3C";
      } else if (name == "Low") {
        return "#FFA000";
      } else if (name == "Medium") {
        return "#F57C00";
      } else if (name == "High") {
        return "#FF5252";
      } else {
        return "#D32F2F";
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
  text-align: center;
  color: white;
  border: 3px solid transparent;
  background-clip: padding-box;
}
</style>
