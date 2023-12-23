<template>
  <v-select
    :value="filter.value"
    item-text="name"
    :items="treatments"
    chips
    multiple
    return-object
    prepend-icon="search"
    @change="changeTreatment"
    label="Treatment filter"
    placeholder="Select to search"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item.name }}</span>
      </v-chip>
      <span v-if="index === 1" class="grey--text caption">(+{{ filter.value.length - 1 }} others)</span>
    </template>
  </v-select>
</template>
<script>
import { mapMutations } from "vuex";
import { treatments } from "../../../config";
export default {
  props: {
    filter: Object
  },
  data() {
    return {
      treatments
    };
  },
  methods: {
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]),
    changeTreatment(v) {
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    }
  }
};
</script>
