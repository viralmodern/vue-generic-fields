<template>
  <v-select
    :value="filter.value"
    item-text="name"
    :items="favorables"
    chips
    multiple
    return-object
    prepend-icon="search"
    @change="changeFavorable"
    label="Favorable filter"
    placeholder="Select to search"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item.name }}</span>
      </v-chip>
      <span v-if="index === 1" class="grey--text text-caption">(+{{ filter.value.length - 1 }} others)</span>
    </template>
  </v-select>
</template>
<script>
import { mapMutations } from "vuex";
import { favorables } from "../../../config";
export default {
  props: {
    filter: Object
  },
  data() {
    return {
      favorables
    };
  },
  methods: {
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]), // eslint-disable-line
    changeFavorable(v) {
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    }
  }
};
</script>
