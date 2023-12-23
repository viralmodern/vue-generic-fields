<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-select
        :value="filters.value"
        :items="tags"
        item-text="name"
        item-value="id"
        label="Tags filter"
        return-object
        prepend-icon="search"
        placeholder="Tags filter"
        multiple
        @change="change"
      >
        <template v-slot:selection="{ item, index }">
          <v-chip
            v-if="index === 0"
            :color="item.color"
            class="chip--select-multi white--text"
            small
          >{{item.name}}</v-chip>
          <span
            v-if="index === 1"
            class="grey--text caption"
          >(+{{ filters.value.length - 1 }} others)</span>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      filters: {
        value: []
      }
    };
  },
  computed: {
    ...mapGetters("ht_store/project/research/timeline/tag", ["tags"])
  },
  mounted() {
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
  },
  methods: {
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapMutations("ht_store/matter/character/characterProfile/character", [
      "updateFilterValue"
    ]),
    change(v) {
      var resultValue = v.length > 0 ? v : null;
      this.updateFilterValue({ filterName: "tag", value: resultValue });
      this.filters.value = v;
    }
  }
};
</script>
