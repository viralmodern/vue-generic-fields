<template>
  <v-menu offset-y left>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon small>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="selectFunction(item.id)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  data: () => ({
    items: [
      { id: 1, title: "Edit" },
      { id: 2, title: "Delete" }
    ]
  }),
  methods: {
    selectFunction(id) {
      if (id === 1) {
        this.$emit("editNameTaskboard");
      }
      if (id === 2) {
        this.$emit("deleteItemTaskboard");
      }
    }
  }
};
</script>
