<template>
  <v-row no-gutters class="align-center">
    <v-chip class="ml-0" small v-for="item in tags" :key="item.id">{{
      item.name
    }}</v-chip>
    <v-menu
      v-model="menu"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon class="ma-0" v-on="on">
          <v-icon>mdi-add_circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <AddInline
          class="pa-2"
          @add="$emit('submit', $event)"
          @close="menu = false"
          hint="Enter to add new tag"
        />
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
import AddInline from "../inputs/AddInline";

export default {
  components: {
    AddInline
  },
  props: {
    tags: Array
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>
