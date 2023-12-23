<template>
  <v-menu offset-y left>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ma-0 custom" :disabled="isDisabled" small icon>
        <v-icon small class="text--secondary">more_vert</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="edit">
        <v-list-item-title class="text-body-2">Edit</v-list-item-title>
      </v-list-item>
      <v-list-item @click="remove">
        <v-list-item-title class="text-body-2">Remove</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props:{
    isDisabled: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    showDetail() {},
    remove() {
      this.$emit("remove");
    },
    edit() {
      this.$emit("edit");
    }
  }
};
</script>
