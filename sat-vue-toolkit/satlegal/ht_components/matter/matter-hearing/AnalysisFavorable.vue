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
import { favorables } from "../../../config";
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    itemAnalysis: Object
  },
  data() {
    return {
      favorables,
      menu: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/hearing/analysis", ["changeItemAnalysis"]),
    changeFavorable(item) {
      const data = {
        type: "Favorable",
        newValue: item,
        dataRow: this.dataRow,
        itemAnalysis: this.itemAnalysis
      };
      this.changeItemAnalysis(data);
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
