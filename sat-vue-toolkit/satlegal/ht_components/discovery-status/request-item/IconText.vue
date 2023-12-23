<template>
  <v-list-item-title>
    <v-row no-gutters class="align-center">
      <v-icon>{{icon}}</v-icon>
      &nbsp;&nbsp;{{name}}
    </v-row>
  </v-list-item-title>
</template>

<script>
export default {
  props: {
    icon: String,
    name: String
  }
};
</script>
