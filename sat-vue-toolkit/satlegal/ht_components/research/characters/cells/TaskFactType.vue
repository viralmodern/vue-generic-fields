<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(dataRow.factType.name) }"
  >
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ dataRow.factType.name }}</span>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in characterTypeFact"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="showClassColor(item.name)"
            small
            @click="change(item)"
            >{{ item.id }}: {{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>

<script>
import { mapActions } from "vuex";
import { characterTypeFact } from "../../../../config";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      menu: false,
      characterTypeFact
    };
  },
  methods: {
    ...mapActions("ht_store/matter/character/characterProfile", ["updateTask"]),
    change(item) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: item
      };
      this.updateTask(data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name == "TARP") {
        return "#FF5370";
      } else if (name == "Recently Added") {
        return "#85EA2D";
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
