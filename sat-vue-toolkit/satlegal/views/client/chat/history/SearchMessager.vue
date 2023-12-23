<template>
  <v-row no-gutters>
    <v-text-field
      @input="$emit('search', searchMessage)"
      v-model="searchMessage"
      label="Search on the message..."
      single-line
      outline
    ></v-text-field>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      searchMessage: ""
    };
  }
};
</script>
