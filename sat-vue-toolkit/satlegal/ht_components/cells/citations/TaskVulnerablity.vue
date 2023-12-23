<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(dataRow.vulnerability) }"
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
            backgroundColor: showClassColor(dataRow.vulnerability)
          }"
        >
          {{ getName(dataRow.vulnerability) }}
        </div>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in vulnerabilities"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="showClassColor(item.id)"
            small
            @click="changeVulnerability(item)"
            >{{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { vulnerabilities } from "../../../config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      vulnerabilities,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/matter/citations", ["updateTaskCitation"]),
    changeVulnerability(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTaskCitation(data);
      this.menu = false;
    },
    showClassColor(id) {
      if (id === 1) {
        return "#388E3C";
      } else if (id === 2) {
        return "#FFA000";
      } else if (name === 3) {
        return "#id";
      } else if (id === 4) {
        return "#FF5252";
      } else {
        return "#D32F2F";
      }
    },
    getName(id) {
      return this.vulnerabilities.find(x => x.id === id).name;
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
