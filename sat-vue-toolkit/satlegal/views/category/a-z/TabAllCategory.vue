<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters v-for="(alp, index) in alphabet" :key="index">
        <div class="text-h1">{{ alp }}</div>
        <v-row no-gutters class="pa-3">
          <v-col
            cols="3"
            v-for="(item, index) in newArrAZ.filter(
              x => x.clauseName[0] === alp
            )"
            :key="index"
          >
            <MenuCategoryAZ
              class="mt-4"
              :contentCat="item"
              :dataCategory="dataCategory"
              :name="item.clauseName"
              @changeItemCategory="data => $emit('changeItemCategory', data)"
            />
          </v-col>
        </v-row>
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
  data() {
    return {
      listAlphabetGroup: []
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/category", ["dataCategory"]),
    newArrAZ() {
      const arrChildren =
        this.dataCategory && this.dataCategory.map(x => x.children);
      const mergedChildren = [].concat.apply([], arrChildren);
      return mergedChildren;
    },
    alphabet() {
      return Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode("A".charCodeAt(0) + i)
      );
    }
  }
};
</script>
