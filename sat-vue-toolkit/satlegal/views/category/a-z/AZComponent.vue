<template>
  <v-row no-gutters>
    <v-col cols="12">
      <span class="text-h1">{{ titleAZ }}</span>
    </v-col>
    <v-col cols="12">
      <v-row v-if="titleAZ" row wrap>
        <v-col cols="3" v-for="(item, index) in newArrAZ" :key="index">
          <MenuCategoryAZ
            class="mt-4"
            :contentCat="item"
            :name="item.clauseName"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import MenuCategoryAZ from "./MenuCategoryAZ";
export default {
  components: {
    MenuCategoryAZ
  },
  computed: {
    ...mapGetters("ht_store/matter/category", ["titleAZ", "dataCategory"]),
    newArrAZ() {
      const arrChildren =
        this.dataCategory && this.dataCategory.map(x => x.children);
      const mergedChildren = [].concat.apply([], arrChildren);
      return mergedChildren.filter(item => {
        return item.clauseName[0] === this.titleAZ;
      });
    }
  }
};
</script>
