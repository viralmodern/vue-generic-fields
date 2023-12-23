<template>
  <v-select
    :value="filter.value"
    item-text="text"
    :items="dataListLabel"
    multiple
    return-object
    prepend-icon="search"
    @change="changeFilter"
    item-value="id"
    label="Labels filter"
    placeholder="Select to search"
  >
    <template v-slot:selection="{ item, index }">
      <LabelColor v-if="index === 0" :key="item.id" :color="item.color" :text="item.text"/>
      <span v-if="index === 1" class="grey--text text-caption">(+{{ filter.value.length - 1 }} others)</span>
    </template>
    <template slot="item" slot-scope="data">
      <LabelColor
        class="filter-label-custom-active"
        :key="data.item.id"
        :color="data.item.color"
        :text="data.item.text"
      />&nbsp;
      <v-icon style="color:unset">mdi-check</v-icon>
    </template>
  </v-select>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import LabelColor from "../../chips/LabelColor2";

export default {
  components: {
    LabelColor
  },
  props: {
    filter: Object
  },
  computed: {
    ...mapGetters("ht_store/task/detail/labels", ["dataListLabel"])
  },
  methods: {
    ...mapActions("ht_store/task/detail/labels", ["getDataListLabelRequest"]),
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]),
    changeFilter(v) {
      this.updateFilterValue({ filterName: this.filter.name, value: v });
    }
  },
  mounted() {
    this.getDataListLabelRequest();
  }
};
</script>

<style scoped>
.filter-label-custom-active {
  width: 100%;
}
</style>

