<template>
  <td
    class="changeSelect"
    v-bind:style="{ backgroundColor: showClassColor(nameCustom.name) }"
  >
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{ nameCustom.name }}</span>
      </template>
      <v-list>
        <v-row
          no-gutters
          v-for="(item, index) in evidencesLevel"
          :key="index"
          class="ma-2"
        >
          <v-btn
            class="px-2 white--text text-capitalize"
            rounded
            :color="showClassColor(item.name)"
            small
            @click="
              $emit('update', item.id);
              menu = false;
            "
            >{{ item.id }}: {{ item.name }}</v-btn
          >
        </v-row>
      </v-list>
    </v-menu>
  </td>
</template>
<script>
import { evidencesLevel } from "../../../../config";
export default {
  data() {
    return {
      evidencesLevel,
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    nameCustom() {
      return this.evidencesLevel.find(x => x.id === this.dataRow.priority);
    }
  },
  methods: {
    showClassColor(name) {
      if (name === "Very low") {
        return "#512da8";
      } else if (name === "Very high") {
        return "#ff6f00";
      } else if (name === "Low") {
        return "#76ff03";
      } else if (name === "Normal") {
        return "#f50057";
      } else if (name === "High") {
        return "#00c853";
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
