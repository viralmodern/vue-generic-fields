<template>
  <v-menu offset-y left>
    <template v-slot:activator="{ on }">
      <v-btn class="ma-0 custom" icon v-on="on">
        <v-icon class="text--secondary">more_vert</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="$emit('remove')">
        <v-list-item-title>Remove</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
