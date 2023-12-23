<template>
    <v-card-actions cols="12" class="px-0">
      <v-btn @click.stop="addNewFilter" text class="text-capitalize mt-2" color="primary">
        <v-icon small>mdi-plus</v-icon>
        add New
      </v-btn>
    </v-card-actions>
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    name: "FilterBuilderAddNew",
    methods: {
      ...mapActions("cafs/search/filterBuilder",["addNewFilter"]),
    }
  }
</script>

<style scoped>

</style>
