<template>
  <v-row no-gutters>
    <v-menu offset-x left>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" small icon>
          <v-icon>more_horiz</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="actionHistory(item.id)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [{ id: 1, title: "Delete" }]
    };
  },
  methods: {
    actionHistory(id) {
      if (id === 1) {
        this.$emit("deleteCard");
      }
    }
  }
};
</script>
