<template>
  <v-menu left close-on-content-click bottom
          :offset-y="true">
    <template v-slot:activator="{ on }">
      <v-btn
        dark
        icon
        v-on="on"
      >
        <v-icon color="black">{{icon ? icon : 'more_vert'}}</v-icon>
      </v-btn>
    </template>

    <v-list>
      <slot/>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: false
      }
    },
    name: "StageMenuControl"
  }
</script>

<style scoped>

</style>
