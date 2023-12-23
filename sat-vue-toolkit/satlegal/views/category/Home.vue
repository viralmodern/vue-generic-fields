<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-tabs show-arrows class="tab-custom">
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          v-for="item in specifiedRange"
          :key="item"
          @change="changeFilterAZ(item)"
          >{{ item }}</v-tab
        >
        <v-tabs-items>
          <v-tab-item v-if="specifiedRange[0]">
            <v-list>
              <Category />
            </v-list>
          </v-tab-item>
          <v-tab-item v-for="item in specifiedRange.splice(1, 26)" :key="item">
            <v-list>
              <AZComponent />
            </v-list>
          </v-tab-item>
          <v-tab-item v-if="specifiedRange[1]">
            <v-list>
              <TabAllCategory />
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-col>
  </v-row>
</template>
<script>
import { mapMutations } from "vuex";
import Category from "./tab-category/Category";
import AZComponent from "./a-z/AZComponent";
import TabAllCategory from "./a-z/TabAllCategory";

export default {
  components: {
    Category,
    AZComponent,
    TabAllCategory
  },
  computed: {
    specifiedRange() {
      var alphabet = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode("A".charCodeAt(0) + i)
      );
      var retuls = ["Cat", ...alphabet, "All"];
      return retuls;
    }
  },
  methods: {
    ...mapMutations("ht_store/matter/category", ["changeFilterAZ"])
  }
};
</script>
<style scoped>
.tab-custom /deep/ .v-tabs__bar .v-tabs__wrapper .v-tabs__container {
  justify-content: space-around;
}
</style>
