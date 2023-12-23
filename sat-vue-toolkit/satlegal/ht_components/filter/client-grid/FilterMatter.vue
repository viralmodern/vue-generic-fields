<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-select
        :value="filters.value"
        :items="dataMatter"
        item-text="name"
        item-value="id"
        label="Matter filter"
        return-object
        prepend-icon="mdi-magnify"
        placeholder="Matter filter"
        multiple
        @change="change"
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0" class="chip--select-multi" small>
            <span>{{item.title}}</span>
          </v-chip>
          <span
            v-if="index === 1"
            class="grey--text text-caption"
          >(+{{ filters.value.length - 1 }} others)</span>
        </template>
        <template slot="item" slot-scope="{item}">
          <span>{{item.title}}</span>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      filters: {
        value: []
      }
    };
  },
  computed: {
    ...mapGetters("ht_store/matter", ["dataMatter"]) // eslint-disable-line
  },
  methods: {
    change(v) {
      var resultValue = v.length > 0 ? v : null;
      this.$emit("updateFilterValue", {
        filterName: "matter",
        value: resultValue
      });
      this.filters.value = v;
    }
  }
};
</script>
