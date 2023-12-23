<template>
  <td>
    <v-chip
      small
      :color="itemStatus.find(x => x.id === dataRow.status).color"
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
          <v-row no-gutters v-for="(item, index) in itemStatus" :key="index">
            <v-btn
              class="white--text text-capitalize"
              rounded
              :color="item.color"
              small
              @click="
                $emit('update', item.id);
                menu = false;
              "
            >
              {{ item.id }}: {{ item.name }}
              <v-icon class="ml-1" small>{{ item.icon }}</v-icon>
            </v-btn>
          </v-row>
        </v-list>
      </v-menu>
      <v-icon class="ml-1" small>{{
        itemStatus.find(x => x.id === dataRow.status).icon
      }}</v-icon>
    </v-chip>
  </td>
</template>
<script>
import { itemStatus } from "../../../config";

export default {
  data() {
    return {
      menu: false,
      itemStatus
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    nameCustom() {
      return this.itemStatus.find(x => x.id === this.dataRow.status);
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
