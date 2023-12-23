<template>
  <v-row no-gutters>
    <v-textarea :label="label" v-model="description"></v-textarea>
  </v-row>
</template>
<script>
export default {
  props: {
    label: String
  },
  data() {
    return {
      description: ""
    };
  }
};
</script>