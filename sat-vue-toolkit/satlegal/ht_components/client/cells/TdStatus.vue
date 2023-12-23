<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(nameStatus.name) }"
  >
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ nameStatus.name }}</span>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in statusOfClient"
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
import { statusOfClient } from "../../../config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      statusOfClient,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    nameStatus() {
      return this.statusOfClient.find(x => x.id === this.dataRow.user.status);
    }
  },
  methods: {
    ...mapActions("ht_store/workspace/client", ["updateTask"]),
    change(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e.id
      };
      this.updateTask(data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name === "Signed") {
        return "#00BFA5";
      } else {
        return "#FF5252";
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
