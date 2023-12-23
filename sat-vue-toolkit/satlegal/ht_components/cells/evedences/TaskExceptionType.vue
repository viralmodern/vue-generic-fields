<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: exceptionType.color }"
  >
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <span v-if="exceptionType.name">{{ exceptionType.name }}</span>
          <span v-else class="black--text">N/A</span>
        </div>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in listExceptionType"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            small
            @click="changeExceptionType(item)"
            :color="item.color"
          >
            {{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { listExceptionType } from "../../../config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      listExceptionType,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    exceptionType() {
      return (
        this.listExceptionType.find(x => x.id === this.dataRow.exceptionType) ||
        {}
      );
    }
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/evidences", ["updateTask"]),
    changeExceptionType(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e.id,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        groupType: this.$route.params.groupType
      };
      this.updateTask(data);
      this.menu = false;
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
