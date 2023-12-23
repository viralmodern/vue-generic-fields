<template>
  <v-row>
    <v-col cols="2">
      <MatchFilterOptions :item="item"/>
    </v-col>
    <v-col cols="3">
      <TypesFilterOptions :item="item"/>
    </v-col>
    <v-col cols="2">
      <OperationFilterOptions :item="item"/>
    </v-col>
    <v-col cols="4">
      <ValueFilterOptions :item="item"/>
    </v-col>
    <v-col cols="1" class="d-flex align-center">
      <div style="width: 100%">
        <ClearFilterItemButton :item="item"/>
      </div>
    </v-col>
  </v-row>

</template>

<script>
  import ClearFilterItemButton from "./ClearFilterItemButton";
  import MatchFilterOptions from "./MatchFilterOptions";
  import TypesFilterOptions from "./TypesFilterOptions";
  import OperationFilterOptions from "./OperationFilterOptions";
  import ValueFilterOptions from "./ValueFilterOptions";

  export default {
    name: "FilterBuilderItem",
    components: {
      ValueFilterOptions,
      OperationFilterOptions, TypesFilterOptions, MatchFilterOptions, ClearFilterItemButton},
    props: ["item"],

  }
</script>

<style>
  .v-select:not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot > input {
    font-size: 13px;
  }
</style>
