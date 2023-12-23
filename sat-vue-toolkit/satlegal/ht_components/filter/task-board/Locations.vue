<template>
  <v-combobox
    :items="locations"
    :search-input.sync="search"
    item-text="name"
    multiple
    @change="changeLocation"
    class="mx-2"
    label="Location filter"
    :value="filter.value"
    prepend-icon="search"
    placeholder="Select to search"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item }}</span>
      </v-chip>
      <span v-if="index === 1" class="grey--text text-caption">(+{{ filter.value.length - 1 }} others)</span>
    </template>
    <template slot="no-data">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            No location matching "
            <strong>{{ search }}</strong>". Press
            <kbd>enter</kbd> to create a new one
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>
<script>
import { locations } from "../../../config";
import { mapMutations } from "vuex";
export default {
  props: {
    filter: Object
  },
  data() {
    return {
      search: null,
      locations
    };
  },
  methods: {
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]),
    changeLocation(v) {
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    }
  }
};
</script>

