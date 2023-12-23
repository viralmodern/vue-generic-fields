<template>
  <div class="pb-2" style="position: relative">
    <span class="ml-4 pl-1 caption top-caption text--secondary">Estimation filter</span>
    <v-row  no-gutters>
      <v-icon class="mr-2">mdi-search</v-icon>
      <v-text-field
        readonly
        v-model="estimation[0]"
        class="mt-0"
        hide-details
        single-line
        type="number"
        style="width: 60px"
      ></v-text-field>

      <v-col cols="7">
        <v-range-slider
          :max="9999"
          v-model="estimation"
          @change="changeEstimation"
          :value="filter.value"
        ></v-range-slider>
      </v-col>

      <v-text-field
        readonly
        v-model="estimation[1]"
        class="mt-0 ml-2"
        hide-details
        single-line
        type="number"
        style="width: 65px"
      ></v-text-field>
    </v-row>
    <span class="ml-4 pl-1 caption bottom-hint text--secondary">Slide to pick your values</span>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      estimation: []
    };
  },
  props: {
    filter: Object
  },
  methods: {
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]),
    changeEstimation(v) {
      const data = { start: v[0], end: v[1] };
      this.updateFilterValue({ filterName: this.filter.name, value: data });
    }
  }
};
</script>

<style scoped>
.caption {
  font-size: 13px !important;
}
.top-caption {
  position: absolute;
  top: -2px;
}
.bottom-hint {
  position: absolute;
  bottom: 3px;
}
</style>
