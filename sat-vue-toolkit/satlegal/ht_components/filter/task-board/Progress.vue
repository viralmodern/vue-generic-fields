<template>
  <div class="pb-2" style="position: relative">
    <span class="ml-4 pl-1 text-caption top-caption text--secondary">Progress filter</span>
    <v-row  no-gutters>
      <v-icon class="mr-2">mdi-search</v-icon>
      <v-text-field
        readonly
        v-model="progress[0]"
        class="mt-0"
        hide-details
        single-line
        type="number"
        style="width: 60px"
      ></v-text-field>
      <v-col cols="7">
        <v-range-slider v-model="progress" @change="changeProgress" :value="filter.value"></v-range-slider>
      </v-col>
      <v-text-field
        readonly
        v-model="progress[1]"
        class="mt-0 ml-2"
        hide-details
        single-line
        type="number"
        style="width: 65px"
      ></v-text-field>
    </v-row>
    <span class="ml-4 pl-1 text-caption bottom-hint text--secondary">Slide to pick your values</span>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      progress: []
    };
  },
  props: {
    filter: Object
  },
  methods: {
    ...mapMutations("ht_store/project/board/filter", ["updateFilterValue"]), // eslint-disable-line
    changeProgress(v) {
      const data = { start: v[0], end: v[1] };
      this.updateFilterValue({ filterName: this.filter.name, value: data });
    }
  }
};
</script>

<style scoped>
.text-caption {
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
