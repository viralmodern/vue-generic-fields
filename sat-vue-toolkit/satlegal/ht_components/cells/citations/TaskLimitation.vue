<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(nameFavorable.name) }"
  >
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ nameFavorable.name }}</span>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in limitation"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="showClassColor(item.name)"
            small
            @click="changeFavorable(item)"
            >{{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { limitation } from "../../../config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      limitation,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    nameFavorable() {
      return this.limitation.find(x => x.id === this.dataRow.limitation);
    }
  },
  methods: {
    ...mapActions("ht_store/matter/citations", ["updateTaskCitation"]),
    changeFavorable(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTaskCitation(data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name === "Reversed") {
        return "#3F51B5";
      } else if (name === "Criticized") {
        return "#00897B";
      } else {
        return "#00C853";
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
