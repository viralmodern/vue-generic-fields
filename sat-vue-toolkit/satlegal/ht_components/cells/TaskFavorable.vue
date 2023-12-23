<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(dataRow.favorable.name) }"
  >
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ dataRow.favorable.name }}</span>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in favorables"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="showClassColor(item.name)"
            small
            @click="changeFavorable(item)"
            >{{ item.id }}: {{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { favorables } from "../../config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      favorables,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/task/list", ["updateTask"]),
    changeFavorable(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name == "Plaintiff") {
        return "#8E24AA";
      } else if (name == "Defendant") {
        return "#2196F3";
      } else {
        return "#3E2723";
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
