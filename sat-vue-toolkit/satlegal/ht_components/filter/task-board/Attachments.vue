<template>
  <v-row no-gutters>
    <v-text-field
      placeholder="Type to search"
      hint="Enter a attachment to search"
      label="Attachment filter "
      prepend-icon="search"
      :value="filter.value"
      @input="changeFilter"
    />
  </v-row>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    filter: Object
  },
  methods: {
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]),
    changeFilter(v) {
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    }
  }
};
</script>
