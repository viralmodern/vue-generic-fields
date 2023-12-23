<template>
  <v-row no-gutters class="align-center">
    <v-col cols="6">
      <span class="font-weight-medium subheading">{{name}}</span>
    </v-col>
    <v-col cols="6">
      <MenuCharacters :value="value" :listCharacters="list" @select="$emit('update', $event)"/>
    </v-col>
  </v-row>
</template>

<script>
import MenuCharacters from "../../../menus/MenuCharacters";

export default {
  components: {
    MenuCharacters
  },
  props: {
    name: String,
    value: Array,
    list: Array
  }
};
</script>
