<template>
  <v-menu offset-x transition="slide-x-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" outlined v-on="on">
        <v-icon class="mr-2">compare_arrows</v-icon>
        {{ item[keyText] }}
      </v-btn>
    </template>
    <v-list subheader>
      <v-list-item
        v-for="(item2, index) in list"
        :key="index"
        @click="$emit('click', item2)"
        :to="to"
        :color="item.id === item2.id ? 'primary' : ''"
        class="title"
      >
        <v-list-item-title>{{ item2[keyText] }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    item: Object,
    list: Array,
    to: [Object, String],
    keyText: String
  }
};
</script>
