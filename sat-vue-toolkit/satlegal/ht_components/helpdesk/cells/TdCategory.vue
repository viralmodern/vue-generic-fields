<template>
  <td>
    <v-chip
      small
      :color="`#` + category.find(x => x.id === dataRow.category).color"
      text-color="white"
    >
      <v-menu
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
            v-for="(item, index) in category"
            :key="index"
            class="ma-2"
          >
            <v-btn
              class="px-2 white--text text-capitalize"
              rounded
              :color="`#` + item.color"
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
    </v-chip>
  </td>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    nameCustom() {
      return this.category.find(x => x.id === this.dataRow.category);
    },
    ...mapGetters("ht_store/matter/helpDesk/category", ["category"])
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
