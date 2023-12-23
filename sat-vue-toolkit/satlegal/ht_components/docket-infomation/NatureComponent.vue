<template>
  <div>
    <v-menu
      style="width: 130px"
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="px-2 white--text" color="success" small>{{
          getNatureOfSuit.title
        }}</v-btn>
      </template>
      <v-list two-line>
        <template v-for="(val, index) in NatureOfSuit">
          <v-list-item :key="index" avatar @click="onChange(val.id)">
            <v-list-item-title v-if="item == val.id" class="primary--text">{{
              val.title
            }}</v-list-item-title>
            <v-list-item-title v-else>{{ val.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { NatureOfSuit } from "../../config";
export default {
  data() {
    return {
      menu: false,
      NatureOfSuit
    };
  },
  props: {
    item: Number
  },
  methods: {
    onChange(id) {
      const data = {
        column: "natureOfSuit",
        value: id
      };
      this.$emit("updateNature", data);
      this.menu = false;
    }
  },
  computed: {
    getNatureOfSuit() {
      return (this.NatureOfSuit || []).find(x => x.id === this.item) || {};
    }
  }
};
</script>
