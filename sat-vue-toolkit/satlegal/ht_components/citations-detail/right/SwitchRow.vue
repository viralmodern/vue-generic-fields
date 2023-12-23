<template>
  <v-row no-gutters class="pa-2 align-center">
    <v-col cols="6">
      <span class="subheading font-weight-bold">{{ text }}</span>
    </v-col>
    <v-col cols="6">
      <v-switch
        style="justify-content: center;"
        hide-details
        class="ma-0"
        @change="$emit('update', $event)"
        :input-value="value"
      ></v-switch>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    text: String,
    value: Boolean
  }
};
</script>
