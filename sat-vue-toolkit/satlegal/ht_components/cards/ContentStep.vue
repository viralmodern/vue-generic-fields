<template>
  <v-row no-gutters class="justify-center align-center">
    <v-col class="my-2">
      <v-btn fab dark small color="primary">
        <v-icon dark>mdi-check</v-icon>
      </v-btn>
    </v-col>
    <v-col>
      <span class="subheading font-weight-bold">{{ title }}</span>
    </v-col>
    <v-col class="my-2">
      <span class="text--secondary" v-html="content"></span>
    </v-col>
    <v-col class="my-1">
      <v-btn color="primary" outlined>Mark complete</v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    title: String,
    content: String
  }
};
</script>
