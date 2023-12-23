<template>
  <v-menu offset-x left>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click.prevent small icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="$emit('showViewDetail')">
        <v-list-item-title>View Detail</v-list-item-title>
      </v-list-item>
      <v-list-item @click="$emit('openModalConfirm')">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
