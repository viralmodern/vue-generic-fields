<template>
  <v-select
    :value="filter.value"
    item-text="name"
    :items="risks"
    chips
    multiple
    return-object
    prepend-icon="search"
    @change="changeRisk"
    label="Risk filter"
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
import { risks } from "../../../config";
export default {
  props: {
    filter: Object
  },
  data() {
    return {
      risks
    };
  },
  methods: {
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]),
    changeRisk(v) {
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    }
  }
};
</script>
