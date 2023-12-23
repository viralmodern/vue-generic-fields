<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    open-on-hover
    bottom
    right
    offset-x
    transition="slide-x-transition"
  >
    <template v-slot:activator="{ on }">
      <v-list-item>
        <v-list-item-action>
          <v-icon v-on="on">folder</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
    <v-list dense>
      <p class="px-3 mb-0 pb-2 subheading font-weight-bold">Project</p>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-action>
          <v-icon>account_circle</v-icon>
        </v-list-item-action>
        <v-list-item-title>
          Satproj.io
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>account_circle</v-icon>
        </v-list-item-action>
        <v-list-item-title>
          Sathr.io
        </v-list-item-title>
      </v-list-item>

    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: "MenuSub",
    data() {
      return {
        menu: false,
        message: true,
      }
    }
  }
</script>

<style scoped>

</style>
