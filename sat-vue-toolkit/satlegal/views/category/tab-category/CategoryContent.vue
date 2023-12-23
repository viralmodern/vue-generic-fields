<template>
  <v-row no-gutters>
    <CardCategoryAZ
      v-if="contentCat"
      :contentCat="contentCat"
      :dataCategory="dataCategory"
      :itemCategory="itemCategory"
      @changeItemCategory="data => $emit('changeItemCategory', data)"
    />
    <span class="title" v-else>No data !</span>
  </v-row>
</template>
<script>
import CardCategoryAZ from "../../../ht_components/cards/CardCategoryAZ";
export default {
  components: {
    CardCategoryAZ
  },
  props: {
    contentCat: Object,
    dataCategory: Array,
    itemCategory: Object
  }
};
</script>
