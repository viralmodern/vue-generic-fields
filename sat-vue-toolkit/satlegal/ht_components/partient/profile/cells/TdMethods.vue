<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(option.name) }"
  >
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on" class="white--text">{{ option.name }}</span>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in methodsOption"
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
  </td>
</template>
<script>
import { methodsOption } from "../../../../config";
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      methodsOption,
      menu: false
    };
  },
  computed: {
    option() {
      return this.methodsOption.find(x => x.id === this.dataRow.methods);
    }
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail/communication", [
      "updateTask"
    ]),
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
      switch (name) {
        case "Email":
          return "green";
        case "Phone":
          return "orange";
        case "Text":
          return "red";
        case "Letter":
          return "yellow";
        case "In person":
          return "purple";
      }
    }
  }
};
</script>
