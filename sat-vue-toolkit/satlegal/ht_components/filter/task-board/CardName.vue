<template>
  <v-row no-gutters>
    <v-text-field
      label="Card name filter "
      placeholder="Type to search"
      hint="Enter a card name to search"
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
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]), // eslint-disable-line
    changeFilter(v) {
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    }
  }
};
</script>
