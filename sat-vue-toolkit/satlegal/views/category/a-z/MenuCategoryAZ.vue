<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
    <template v-slot:activator="{ on }">
      <span class="text-body-2" v-on="on">{{name}}</span>
    </template>
    <v-card>
      <CardCategoryAZ
        v-if="menu === true"
        :dataCategory="dataCategory"
        :contentCat="contentCat"
        @changeItemCategory="data => $emit('changeItemCategory', data)"
        @save="menu=false"
      />
    </v-card>
  </v-menu>
</template>
<script>
import CardCategoryAZ from "../../../ht_components/cards/CardCategoryAZ";
export default {
  components: {
    CardCategoryAZ
  },
  props: {
    name: String,
    contentCat: Object,
    dataCategory: Array
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>
