<template>
  <v-list>
    <v-row no-gutters>
      <v-col
        cols="3"
        class="title-checklist header align-center justify-center d-flex"
        align="center"
        justify="center"
      >
        <v-icon size="30">check_circle_outline</v-icon>
        <span class="title font-wight-bold">Check List</span>
      </v-col>
      <v-col cols="9" class="search d-flex header align-center justify-center">
        <v-text-field
          class="custom-text-field pa-3 mt-3"
          placeholder="Search task in the check list..."
          prepend-icon="mdi-magnify"
          v-model="searchText"
          @change="$emit('pagingFilters', { name: 'title', req: $event })"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      searchText: ""
    };
  }
};
</script>
<style scoped>
.header {
  height: 50px;
}
.title-checklist {
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #c1c1c1;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #c1c1c1;
}
.search {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #c1c1c1;
}
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
