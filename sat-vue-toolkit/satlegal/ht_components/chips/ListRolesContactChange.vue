<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-y
    :close-on-content-click="false"
    style="width: 130px"
  >
    <template v-slot:activator="{ on }">
      <v-chip
        v-on="on"
        small
        class="white--text"
        :color="showClassColor(name)"
        >{{ name }}</v-chip
      >
    </template>
    <v-list>
      <v-row
        no-gutters
        v-for="(item, index) in roleContacts"
        :key="index"
        class="ma-2"
      >
        <v-btn
          class="px-2 white--text text-capitalize"
          rounded
          :color="showClassColor(item.name)"
          small
          @click="changeRole(item)"
          >{{ item.name }}</v-btn
        >
      </v-row>
    </v-list>
  </v-menu>
</template>
<script>
import { roleContacts } from "../../config.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      menu: false,
      roleContacts
    };
  },
  props: {
    name: String,
    item: Object
  },
  methods: {
    ...mapMutations("ht_store/project/contacts", ["changeRoleContact"]),
    changeRole(e) {
      const data = {
        id: this.item.id,
        role: e
      };
      this.changeRoleContact(data);
      this.menu = false;
    },
    showClassColor(name) {
      if (name == "Project lead") {
        return "#388E3C";
      } else if (name == "Team member") {
        return "#FFA000";
      } else if (name == "Contact person") {
        return "#D500F9";
      } else {
        return "#BCAAA4";
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
