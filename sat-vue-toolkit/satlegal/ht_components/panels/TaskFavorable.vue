<template>
  <v-row no-gutters>
    <v-col md5 cols="12">
      <v-autocomplete
        v-if="taskDetail.selects"
        :value="taskDetail.selects.favorable"
        item-text="name"
        item-value="id"
        :items="dataSelect.favorable"
        label="Favorable"
        return-object
        @input="changeFavorables"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {$$STORE_PREFIX} from "../../utils";
export default {
  methods: {
    changeFavorables(val) {
      this.changeFavorable(val);
    },
    ...mapActions("ht_store/task/detail/description", ["getDataTaskDetailRequest"]),
    ...mapActions("ht_store/task/detail", ["getDataSelectRequest"]),
    ...mapMutations("ht_store/task/detail/description", ["changeFavorable"])
  },
  computed: {
    ...mapGetters("ht_store/task/detail/description", ["taskDetail"]),
    ...mapGetters("ht_store/task/detail", ["dataSelect"])
  },
  mounted() {
    this.getDataSelectRequest();
    this.getDataTaskDetailRequest();
  }
};
</script>
