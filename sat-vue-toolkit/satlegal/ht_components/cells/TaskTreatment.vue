<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(dataRow.treatment.name) }"
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
          v-bind:style="{
            backgroundColor: showClassColor(dataRow.treatment.name)
          }"
        >
          {{ dataRow.treatment.name }}
        </div>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in treatments"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="showClassColor(item.name)"
            small
            @click="changeTreatment(item)"
            >{{ item.id }}: {{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { treatments } from "../../config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      treatments,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/task/list", ["updateTask"]),
    changeTreatment(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name == "Overruled") {
        return "#388E3C";
      } else if (name == "Questioned") {
        return "#FFA000";
      } else if (name == "Cautioned") {
        return "#F57C00";
      } else if (name == "Distinguished") {
        return "#FF5252";
      } else if (name == "Explained") {
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
