<template>
  <v-row class="pa-2 align-center" no-gutters>
    <v-col cols="6">
      <span class="subheading font-weight-bold">Disputes</span>
    </v-col>
    <v-col cols="6">
      <v-switch
        style="justify-content: center;"
        hide-details
        class="ma-0"
        @change="$emit('update', $event)"
        :value="disputed"
      ></v-switch>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    disputed: Boolean
  }
};
</script>
