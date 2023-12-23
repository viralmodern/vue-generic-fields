<template>
  <v-btn color="grey"
         style="min-height: unset; min-width: unset; width: unset; height: unset;"
         text
         icon
         @click="handleClear">
    <v-icon small>mdi-close</v-icon>
  </v-btn>
</template>
<script>
  import {mapActions} from 'vuex';
  export default {
    name: "ClearFilterItemButton",
    props: ["item"],
    methods: {
      ...mapActions("cafs/search/filterBuilder", ["removeFilter"]),
      handleClear() {
        this.removeFilter(this.item);
      }
    }
  }
</script>

<style scoped>

</style>
